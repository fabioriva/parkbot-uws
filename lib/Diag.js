const EventEmitter = require('events')
const snap7 = require('node-snap7')
const comm = require('./comm')
const { updateMotors } = require('../models/motors')

class Diag extends EventEmitter {
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

  async data (def, obj) {
    try {
      const buffer = await this.read(def.DIAG_READ)
      await Promise.all([updateMotors(def.DB_DIAG_INIT_MOT, buffer, 2, obj)])
    } catch (error) {
      this.error(error)
    } finally {
      this.publish('aps/diagnostic', obj)
    }
  }

  async main (def, obj) {
    try {
      await this.connect()
      const this_ = this
      setTimeout(function forever () {
        const hrstart = process.hrtime()
        // this_.publish('aps/info', {
        //   comm: this_.online
        // })
        if (this_.online) {
          this_.data(def, obj)
        } else {
          this_.online = this_.client.Connect()
          console.log('re-connecting...', this_.online)
        }
        const hrend = process.hrtime(hrstart)
        console.info(
          'PLC 02 Execution time (hr):',
          hrend[0] * 1000000 + hrend[1] / 1000,
          'ms'
        )
        setTimeout(forever, this_.plc.polling_time)
      }, this_.plc.polling_time)
    } catch (err) {
      this.error(err)
    }
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

module.exports = Diag
