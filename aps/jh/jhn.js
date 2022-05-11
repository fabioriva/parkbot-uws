require('dotenv').config()
const MongoClient = require('mongodb').MongoClient
const uWS = require('uWebSockets.js')
const def = require('./defn')
const obj = require('./obj')
const PLC = require('../../lib/Plc')
const log = require('../../lib/logs7')
const routes = require('../../lib/routes')
const websocket = require('../../lib/websocket')

const PLC_SH = require('./Plc')

const prefix = '/aps/jhn'

const client = new MongoClient(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

const start = async () => {
  try {
    await client.connect()
    const db = client.db('jh')
    const app = uWS.App().listen(def.HTTP, token => {
      if (token) {
        console.log('Listening to port ' + def.HTTP, token)
      } else {
        console.log('Failed to listen to port ' + def.HTTP)
      }
    })
    // PLC EL
    const plc01 = new PLC(def.PLC)
    plc01.main(def, obj)
    plc01.on('pub', ({ channel, data }) => app.publish(channel, data))
    // PLC SH
    const plc02 = new PLC_SH(def.PLC_SH)
    plc02.main(def, obj)
    // plc02.on('pub', ({ channel, data }) => app.publish(channel, data))

    log(db, def, obj, plc01)
    routes(app, db, def, obj, plc01, { prefix })
    websocket(app, obj, {
      compression: uWS.SHARED_COMPRESSOR,
      maxPayloadLength: 16 * 1024 * 1024,
      idleTimeout: 16,
      prefix
    })
  } catch (err) {
    console.error(new Error(err))
    process.exit(1)
  }
}

start()
