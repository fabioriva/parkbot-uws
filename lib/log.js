const net = require('net')
const { insertLog } = require('./db')
const { getPlcDateTime } = require('./utils7')
const pino = require('pino')()

const LOG_LEN = 32

class S7Log {
  constructor (buffer) {
    this.stx = buffer.readInt16BE(0)
    this.system = buffer.readInt16BE(2)
    this.device = buffer.readInt16BE(4)
    this.mode = buffer.readInt16BE(6)
    this.operation = buffer.readInt16BE(8)
    this.stall = buffer.readInt16BE(10)
    this.card = buffer.readInt16BE(12)
    this.size = buffer.readInt16BE(14)
    this.alarm = buffer.readInt16BE(16)
    this.event = buffer.readInt16BE(18)
    this.date = getPlcDateTime(buffer.readInt16BE(20), buffer.readInt32BE(22))
    this.elapsed = buffer.readInt32BE(26)
    this.etx = buffer.readInt16BE(30)
  }
}

function server (db, def, obj, plc) {
  const { PORT, HOST } = def
  const server = net.createServer(function (socket) {
    const client = socket.remoteAddress + ':' + socket.remotePort
    socket.on('error', function (e) {
      // console.error('%s socket error %s', client, e)
      pino.error('%s socket error %s', client, e)
    })
    socket.on('close', function () {
      // console.log('%s socket close', client)
      pino.info('%s socket close', client)
    })
    socket.on('end', function () {
      // console.log('%s socket end', client)
      pino.info('%s socket end', client)
    })
    socket.on('data', async function (data) {
      const buffer = Buffer.alloc(LOG_LEN, data)
      if (buffer.length === LOG_LEN) {
        const s7log = new S7Log(buffer)
        switch (s7log.operation) {
          case 1: // alarm in
          case 2: // alarm out
            plc.alarms(def, obj, { device: s7log.device })
            break
          case 4:
            plc.cards(def, obj)
            break
          case 5: // in
          case 6: // out
          case 7: // shuffle in
          case 8: // shuffle out
          case 9: // reserve stall
            plc.map(def, obj)
            break
        }
        const result = await insertLog(db, obj, s7log)
        // plc.publish('aps/info', { notification: result.ops.shift() })
        pino.info(result, 'saved')
        plc.publish('aps/info', { notification: result })
      }
    })
  })
  server.listen(PORT, HOST, () =>
    // console.info('Server listening at tcp://' + HOST + ':' + PORT)
    pino.info('Server listening at tcp://' + HOST + ':' + PORT)
  )
}

module.exports = server
