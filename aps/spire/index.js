require('dotenv').config()
const MongoClient = require('mongodb').MongoClient
const uWS = require('uWebSockets.js')
const def = require('./def')
const obj = require('./obj')
const PLC = require('../../lib/Plc')
const routes = require('../../lib/routes')
const websocket = require('../../lib/websocket')

const plc = {
  ip: '192.168.200.55',
  rack: 0,
  slot: 1,
  polling_time: 350
}
const port = 9001
const prefix = '/aps/wallstreet'

const start = async () => {
  try {
    const client = await MongoClient.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    const db = client.db('wallstreet')
    const app = uWS.App().listen(port, token => {
      if (token) {
        console.log('Listening to port ' + port, token)
      } else {
        console.log('Failed to listen to port ' + port)
      }
    })
    routes(app, db, obj, { prefix })
    websocket(app, obj, {
      compression: uWS.SHARED_COMPRESSOR,
      maxPayloadLength: 16 * 1024 * 1024,
      idleTimeout: 16,
      prefix
    })
    const plc01 = new PLC(app, plc)
    await plc01.main(def, obj)
  } catch (err) {
    console.error(new Error(err))
    process.exit(1)
  }
}

start()
