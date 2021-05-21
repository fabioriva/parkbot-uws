const EventEmitter = require('events')
const snap7 = require('node-snap7')
const comm = require('./comm')
const { countAlarms, updateAlarms } = require('../models/alarms')
const { updateBits } = require('../models/bits')
const { updateCards } = require('../models/cards')
const { updateDevices } = require('../models/devices')
const { updateInverters } = require('../models/inverters')
const { updateMotors } = require('../models/motors')
const { updatePositions } = require('../models/positions')
const { updateQueue } = require('../models/queue')
const { updateStalls, occupancy } = require('../models/stalls')

class PLC extends EventEmitter {
  constructor (plc) {
    super()
    this.client = new snap7.S7Client()
    this.online = false
    this.plc = plc
  }

  error (error) {
    this.online = comm.s7Error(this.client, error)
  }

  async connect () {
    this.online = await comm.connectTo(this.client, this.plc)
  }

  async alarms (def, obj) {
    try {
      await Promise.all(
        obj.alarms.map(async (item, index) => {
          const buffer = await comm.readArea(
            this.client,
            0x84,
            def.DBS_ALARM[index],
            def.DB_ALARM_INIT,
            def.DB_ALARM_LEN,
            0x02
          )
          const alarms = await updateAlarms(
            0,
            buffer,
            def.ALARM_LEN,
            item.alarms
          )
          item._active = alarms
          obj.overview.devices[index].alarms = item._active
        })
      )
    } catch (error) {
      this.error(error)
    } finally {
      this.publish('aps/alarms', obj.alarms)
    }
  }

  async cards (def, obj) {
    try {
      const buffer = await this.read(def.CARD_READ)
      const cards = await updateCards(0, buffer, def.CARD_LEN, obj.cards)
      this.publish('aps/cards', cards)
    } catch (error) {
      this.error(error)
    }
  }

  async data (def, obj) {
    try {
      const buffer = await this.read(def.DATA_READ)
      await Promise.all([
        updateBits(def.DB_DATA_INIT_AB, buffer, obj.ab),
        updateBits(def.DB_DATA_INIT_EB, buffer, obj.eb),
        updateBits(def.DB_DATA_INIT_MB, buffer, obj.mb),
        updateDevices(
          def.DB_DATA_INIT_DEVICE,
          buffer,
          16,
          obj.devices,
          obj.modes
        ),
        updatePositions(def.DB_DATA_INIT_POS, buffer, 4, obj.positions),
        updateQueue(def.DB_DATA_INIT_QUEUE, buffer, 4, obj.queue)
      ])
    } catch (error) {
      this.error(error)
    } finally {
      this.publish('aps/overview', obj.overview)
      // this.publish('aps/racks', obj.racks)
      obj.racks.forEach((element, key) =>
        this.publish('aps/racks/' + key, obj.racks[key])
      )
    }
  }

  async diag (def, obj) {
    try {
      const buffer = await this.read(def.DIAG_READ)
      await Promise.all([
        updateMotors(def.DB_DIAG_INIT_MOT, buffer, 2, obj.motors),
        updateInverters(def.DB_DIAG_INIT_VFD, buffer, 10, obj.inverters)
      ])
    } catch (error) {
      this.error(error)
    } finally {
      const diagnostic = obj.diagnostic.map(item => ({
        inverters: item.inverters,
        motors: item.motors.map(m => m.json)
      }))
      // this.publish('aps/diagnostic', diagnostic)
      diagnostic.forEach((element, key) =>
        this.publish('aps/diagnostic/' + key, diagnostic[key])
      )
    }
  }

  async map (def, obj) {
    try {
      const buffer = await this.read(def.MAP_READ)
      const stalls = await updateStalls(0, buffer, def.STALL_LEN, obj.stalls)
      const data = occupancy(0, stalls, def.STALL_STATUS)
      obj.map.occupancy = data
      this.publish('aps/map', obj.map)
    } catch (error) {
      this.error(error)
    }
  }

  async main (def, obj) {
    try {
      await this.connect()
      await this.alarms(def, obj)
      await this.cards(def, obj)
      await this.map(def, obj)
      // recursive
      this.forever(def, obj)
    } catch (err) {
      this.error(err)
    }
  }

  forever (def, obj) {
    const hrstart = process.hrtime()
    setTimeout(() => {
      this.publish('aps/info', {
        comm: this.online,
        diag: countAlarms(obj.alarms),
        map: obj.map.occupancy
      })
      if (this.online) {
        this.data(def, obj)
        this.diag(def, obj)
      } else {
        this.online = this.client.Connect()
        console.log('re-connecting...', this.online)
      }
      const hrend = process.hrtime(hrstart)
      console.info('Execution time (hr):', hrend)
      this.forever(def, obj)
    }, this.plc.polling_time)
  }

  publish (channel, data) {
    this.emit('pub', { channel, data: JSON.stringify(data) })
  }

  async read (conn) {
    try {
      const buffer = await comm.readArea(
        this.client,
        conn.area,
        conn.dbNumber,
        conn.start,
        conn.amount,
        conn.wordLen
      )
      return buffer
    } catch (error) {
      this.error(error)
    }
  }

  async write (conn, buffer) {
    try {
      const response = await comm.writeArea(
        this.client,
        conn.area,
        conn.dbNumber,
        conn.start,
        conn.amount,
        conn.wordLen,
        buffer
      )
      return response // return true on success
    } catch (error) {
      this.error(error)
    }
  }
}

module.exports = PLC
