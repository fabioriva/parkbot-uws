const snap7 = require('node-snap7')
const comm = require('./comm')
const { countAlarms, updateAlarms } = require('../models/alarms')
const { updateBits } = require('../models/bits')
const { updateCards } = require('../models/cards')
const { updateDevices } = require('../models/devices')
const { updatePositions } = require('../models/positions')
const { updateQueue } = require('../models/queue')
const { updateStalls, occupancy } = require('../models/stalls')

class PLC {
  constructor (app, plc) {
    this.client = new snap7.S7Client()
    this.online = false
    this.app = app
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
      this.app.publish('aps/alarms', JSON.stringify(obj.alarms))
    }
  }

  async cards (def, obj) {
    try {
      const buffer = await this.read(def.CARD_READ)
      const json = await updateCards(0, buffer, def.CARD_LEN, obj.cards)
      this.app.publish('aps/cards', JSON.stringify(json))
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
          def.MODES
        ),
        updatePositions(def.DB_DATA_INIT_POS, buffer, 4, obj.positions),
        updateQueue(def.DB_DATA_INIT_QUEUE, buffer, 4, obj.queue)
      ])
    } catch (error) {
      this.error(error)
    } finally {
      this.app.publish('aps/overview', JSON.stringify(obj.overview))
      this.app.publish('aps/racks', JSON.stringify(obj.racks))
    }
  }

  async map (def, obj) {
    try {
      const buffer = await this.read(def.MAP_READ)
      const stalls = await updateStalls(0, buffer, def.STALL_LEN, obj.stalls)
      const data = occupancy(0, stalls, def.STALL_STATUS)
      obj.map.occupancy = data
      this.app.publish('aps/map', JSON.stringify(obj.map))
    } catch (error) {
      this.error(error)
    }
  }

  async main (def, obj) {
    try {
      await this.connect()
      this.alarms(def, obj)
      this.cards(def, obj)
      this.map(def, obj)
      const this_ = this
      const interval = setInterval(function forever () {
        const info = {
          comm: this_.online,
          diag: countAlarms(obj.alarms),
          map: obj.map.occupancy
        }
        if (this_.online) {
          this_.app.publish('aps/info', JSON.stringify(info))
          this_.data(def, obj)
        } else {
          this_.online = this_.client.Connect()
          this_.app.publish('aps/info', JSON.stringify(info))
        }
      }, this_.plc.polling_time)
      clearInterval(interval)
    } catch (err) {
      this.error(err)
    }
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
