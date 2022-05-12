const EventEmitter = require('events')
const logger = require('pino')()
const snap7 = require('node-snap7')
const comm = require('../../lib/comm')
const { updateBits } = require('../../models/bits')

class PLC extends EventEmitter {
  constructor (plc) {
    super()
    this.client = new snap7.S7Client()
    this.online = false
    this.plc = plc
  }

  error (error) {
    logger.error('[error] %s', error)
  }

  errorS7 (error) {
    this.online = !this.client.Disconnect()
    logger.error('[error S7] %s', this.client.ErrorText(error))
  }

  async connect () {
    this.online = await comm.connectTo(this.client, this.plc)
    logger.info('PLC %s is online', this.plc.ip)
  }

  publish (channel, data) {
    this.emit('pub', { channel, data: JSON.stringify(data) })
  }

  async data (def, obj) {
    try {
      const buffer = await this.read(def.DATA_READ_SH)
      await Promise.all([
        updateBits(def.DB_DATA_INIT_AB_SH, buffer, obj.abSH),
        updateBits(def.DB_DATA_INIT_EB_SH, buffer, obj.ebSH)
        // updateBits(def.DB_DATA_INIT_MB_SH, buffer, obj.mb)
      ])
    } catch (error) {
      this.error(error)
    } finally {
      // this.publish('aps/overview', obj.overview)
      // this.publish('aps/racks', obj.racks)
      // obj.racks.forEach((rack, key) => this.publish('aps/racks/' + key, rack))
    }
  }

  async main (def, obj) {
    try {
      await this.connect()
      // recursive
      this.forever(def, obj)
    } catch (err) {
      this.error(err)
    }
  }

  forever (def, obj) {
    setTimeout(async () => {
      if (this.online) {
        this.data(def, obj)
      } else {
        this.online = this.client.Connect()
        this.online ? logger.info('Connected to PLC %s', this.plc.ip) : logger.info('Connecting to PLC %s ...', this.plc.ip)
      }
      this.forever(def, obj)
    }, this.plc.polling_time)
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
      this.errorS7(error)
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
      this.errorS7(error)
    }
  }
}

module.exports = PLC
