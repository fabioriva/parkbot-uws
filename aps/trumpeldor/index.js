require('dotenv').config()
const MongoClient = require('mongodb').MongoClient
const uWS = require('uWebSockets.js')
const def = require('./def')
const obj = require('./obj')
const PLC = require('../../lib/Plc')
const log = require('../../lib/log_')
const routes = require('../../lib/routes')
const websocket = require('../../lib/websocket')

const format = require('date-fns/format')
const querystring = require('querystring')
const {
  getHistory_,
  getOperations_,
  getRecentActivity_
} = require('../../lib/history')
const { sendJson } = require('../../lib/json')

const prefix = '/aps/trumpeldor'

const client = new MongoClient(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

const start = async () => {
  try {
    await client.connect()
    const db = client.db('trumpeldor')
    const app = uWS.App().listen(def.HTTP, token => {
      if (token) {
        console.log('Listening to port ' + def.HTTP, token)
      } else {
        console.log('Failed to listen to port ' + def.HTTP)
      }
    })

    app.get(prefix + '/dashboard', async (res, req) => {
      res.onAborted(() => {
        res.aborted = true
      })
      const activity = await getRecentActivity_(db, 6)
      const statistics = await getOperations_(db, {
        dateString: format(new Date(), 'yyyy-MM-dd')
      })
      sendJson(res, {
        activity: activity,
        // cards: obj.cards.length,
        occupancy: obj.map.occupancy,
        operations: statistics,
        system: obj.overview
      })
    })

    app.get(prefix + '/history', async (res, req) => {
      res.onAborted(() => {
        res.aborted = true
      })
      const query = querystring.parse(req.getQuery())
      const docs = await getHistory_(db, query)
      sendJson(res, docs)
    })

    app.get(prefix + '/statistics', async (res, req) => {
      res.onAborted(() => {
        res.aborted = true
      })
      const query = querystring.parse(req.getQuery())
      const docs = await getOperations_(db, query)
      sendJson(res, docs)
    })

    const plc01 = new PLC(def.PLC)
    plc01.main(def, obj)
    plc01.on('pub', ({ channel, data }) => app.publish(channel, data))
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
