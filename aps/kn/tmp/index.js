require('dotenv').config()
const MongoClient = require('mongodb').MongoClient
const uWS = require('uWebSockets.js')
const def = require('./def')
const obj01 = require('./left/obj')
const obj02 = require('./right/obj')
const PLC = require('./Plc')
const log = require('./logs7')
const routes = require('./routes')
const websocket = require('./websocket')

const prefix = '/aps/kn'

const client = new MongoClient(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

const start = async () => {
  try {
    await client.connect()
    const db = client.db('kn')
    const app = uWS.App().listen(def.HTTP, (token) => {
      if (token) {
        console.log('Listening to port ' + def.HTTP, token)
      } else {
        console.log('Failed to listen to port ' + def.HTTP)
      }
    })
    // Left
    const plc01 = new PLC(def.PLC_L)
    plc01.main(def, obj01, '/left')
    plc01.on('pub', ({ channel, data }) => app.publish(channel, data))
    websocket(app, obj01, { prefix, side: '/left' })
    // Right
    const plc02 = new PLC(def.PLC_R)
    plc02.main(def, obj02, '/right')
    plc02.on('pub', ({ channel, data }) => app.publish(channel, data))
    websocket(app, obj02, { prefix, side: '/right' })
    // Common
    log(db, def, obj01, plc01, obj02, plc02)
    routes(app, db, def, obj01, plc01, obj02, plc02, { prefix })
  } catch (err) {
    console.error(new Error(err))
    process.exit(1)
  }
}

start()
