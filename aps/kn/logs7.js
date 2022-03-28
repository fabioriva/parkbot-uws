const net = require('net')
const pino = require('pino')()
const { getHistoryLog, insertLog } = require('../../lib/history')
const { getPlcDateTime } = require('../../lib/utils7')
const { sendMail } = require('../../lib/mailer')
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

function server (db, def, obj01, plc01, obj02, plc02) {
  const { PORT, HOST } = def
  const server = net.createServer(function (socket) {
    const client = socket.remoteAddress + ':' + socket.remotePort
    socket.on('error', function (e) {
      pino.error('%s socket error %s', client, e)
    })
    socket.on('close', function () {
      pino.info('%s socket close', client)
    })
    socket.on('end', function () {
      pino.info('%s socket end', client)
    })
    socket.on('data', async function (data) {
      const buffer = Buffer.alloc(LOG_LEN, data)
      if (buffer.length === LOG_LEN) {
        const s7log = new S7Log(buffer)

        switch (s7log.operation) {
          case 1: // alarm in
          case 2: // alarm out
            if (s7log.device >= 1 && s7log.device <= 15) {
              plc01.alarms(def, obj01, { device: s7log.device })
            }
            if (s7log.device >= 16 && s7log.device <= 30) {
              plc02.alarms(def, obj02, { device: (s7log.device - 15) })
            }
            break
          // case 4:
          //   plc01.cards(def, obj01)
          //   break
          case 5: // in
          case 6: // out
          case 7: // shuffle in
          case 8: // shuffle out
          case 9: // reserve stall
            plc01.map(def, obj01)
            plc02.map(def, obj02)
            break
        }

        const res = await insertLog(db, s7log)
        const doc = await getHistoryLog(db, res.insertedId)

        if (s7log.device >= 1 && s7log.device <= 15) {
          plc01.publish('/info', { notification: doc })
        }
        if (s7log.device >= 16 && s7log.device <= 30) {
          plc02.publish('/info', { notification: doc })
        }

        pino.info(doc, 'Log saved')
        if (s7log.operation === 1) {
          // and email notificatio is true
          const mesg = await sendMail(db, def.APS, doc)
          pino.info(mesg, 'Mailer')
        }
      }
    })
  })
  server.listen(PORT, HOST, () =>
    pino.info('Server listening at tcp://' + HOST + ':' + PORT)
  )
}

module.exports = server
