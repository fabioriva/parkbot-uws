require('dotenv').config()
const MongoClient = require('mongodb').MongoClient
const uWS = require('uWebSockets.js')
const def = require('./def')
const obj = require('./obj')
const PLC = require('../../lib/Plc')
const log = require('../../lib/log')
const routes = require('../../lib/routes')
const websocket = require('../../lib/websocket')

const plc = {
  ip: '192.168.67.2',
  rack: 0,
  slot: 1,
  polling_time: 1000
}
const port = 9001
const prefix = '/aps/wallstreet'

const client = new MongoClient(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

const start = async () => {
  try {
    await client.connect()
    const db = client.db('wallstreet')
    const app = uWS.App().listen(port, token => {
      if (token) {
        console.log('Listening to port ' + port, token)
      } else {
        console.log('Failed to listen to port ' + port)
      }
    })
    const plc01 = new PLC(plc)
    plc01.main(def, obj)
    plc01.on('pub', ({ channel, data }) => app.publish(channel, data))
    log(db, def, obj, plc01)
    routes(app, db, def, obj, plc01, { prefix })
    websocket(app, {
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
