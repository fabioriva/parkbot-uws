const EventEmitter = require('events')
const logger = require('pino')()
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
    this.online = !this.client.Disconnect()
    logger.error('[S7 comm error] %s', this.client.ErrorText(error))
  }

  async connect () {
    this.online = await comm.connectTo(this.client, this.plc)
    logger.info('PLC %s is online', this.plc.ip)
  }

  async alarms (def, obj) {
    if (def.DBS_ALARM.length !== 0) {
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
  }

  async cards (def, obj) {
    if (def.CARD_READ !== undefined) {
      try {
        const buffer = await this.read(def.CARD_READ)
        const cards = await updateCards(0, buffer, def.CARD_LEN, obj.cards)
        this.publish('aps/cards', cards)
      } catch (error) {
        this.error(error)
      }
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
      obj.racks.forEach((rack, key) => this.publish('aps/racks/' + key, rack))
    }
  }

  async diag (def, obj) {
    if (def.DIAG_READ !== undefined) {
      try {
        const buffer = await this.read(def.DIAG_READ)
        await Promise.all([
          updateMotors(def.DB_DIAG_INIT_MOT, buffer, 2, obj.motors),
          updateInverters(def.DB_DIAG_INIT_VFD, buffer, 10, obj.inverters),
          updateMotors(def.DB_DIAG_INIT_SIL, buffer, 2, obj.silomats)
        ])
      } catch (error) {
        this.error(error)
      } finally {
        const diagnostic = obj.diagnostic.map((item, key) => ({
          device: obj.overview.devices[key],
          inverters: item.inverters,
          motors: item.motors.map(m => m.json),
          silomat: item.silomat.json
        }))
        diagnostic.forEach(
          (element, key) => this.publish('aps/diagnostic/' + key, element) // diagnostic[key])
        )
      }
    }
  }

  async map (def, obj) {
    try {
      const buffer = await this.read(def.MAP_READ)
      const stalls = await updateStalls(0, buffer, def.STALL_LEN, obj.stalls)
      // const stalls = await updateStalls_(1, def.STALLS, buffer, def.STALL_LEN, obj.stalls)
      const data = occupancy(0, stalls, def.STALL_STATUS)
      obj.map.occupancy = data
      this.publish('aps/map', obj.map)
    } catch (error) {
      this.error(error)
    }
  }

  async stall (def, obj, stall) {
    try {
      if (stall < 1 || stall > def.STALLS) return
      const buffer = await this.read({
        area: 0x84,
        dbNumber: 510,
        start: stall === 1 ? 0 : (stall - 1) * def.STALL_LEN,
        amount: def.STALL_LEN,
        wordLen: 0x02
      })
      obj.stalls[stall - 1].update(buffer)
      console.log(buffer, stall, obj.stalls[stall - 1])
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
    // const hrstart = process.hrtime()
    setTimeout(async () => {
      if (this.online) {
        this.data(def, obj)
        this.diag(def, obj)
      } else {
        this.online = this.client.Connect()
        logger.info('re-connecting... %s', this.online)
      }
      // const hrend = process.hrtime(hrstart)
      // console.info('Execution time (hr):', hrend)
      this.publish('aps/info', {
        comm: this.online,
        diag: countAlarms(obj.alarms),
        map: obj.map.occupancy,
        expired: obj.merkers.find(m => m.addr === 'M7.7').status
      })
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
