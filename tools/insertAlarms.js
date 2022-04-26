require('dotenv').config()
const MongoClient = require('mongodb').MongoClient
const util = require('util')
const obj = require('../aps/spire/obj')

const DATABASE = 'wallstreet'
const COLLECTION = 'logs'

const client = new MongoClient(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

const start = async () => {
  try {
    await client.connect()
    const db = client.db(DATABASE)
    // await insertAlarms(db, obj.alarms[0].alarms) //
    await insertAlarms(db, [
      { alarm: 1, device: 1, mode: 1, operation: 1 },
      { alarm: 2, device: 2, mode: 2, operation: 2 },
      { alarm: 3, device: 3, mode: 3, operation: 3 },
      { alarm: 4, device: 4, mode: 4, operation: 4 },
      { alarm: 5, device: 5, mode: 5, operation: 5 },
      { alarm: 6, device: 6, mode: 6, operation: 6 },
      { alarm: 7, device: 7, mode: 7, operation: 7 },
      { alarm: 8, device: 8, mode: 8, operation: 8 }
    ])
    // for (let i = 1; i <= 64; i++) {
    //   await insert(db, 'alarms', { id: i, i18n: 'alarm-' + i })
    // }
    // for (let i = 1; i <= 8; i++) {
    //   await insert(db, 'devices', { id: i, i18n: 'device-' + i })
    // }
    // for (let i = 1; i <= 8; i++) {
    //   await insert(db, 'modes', { id: i, i18n: 'mode-' + i })
    // }
    // for (let i = 1; i <= 16; i++) {
    //   await insert(db, 'operations', { id: i, i18n: 'operation-' + i })
    // }
    await client.close()
    process.exit(1)
  } catch (err) {
    console.error(new Error(err))
    process.exit(1)
  }
}

start()

const insert = util.promisify((db, collection, item, callback) => {
  db.collection(collection).insertOne(item, function (err, result) {
    if (err) callback(err)
    callback(null, result)
  })
})

const insertAlarms = util.promisify((db, alarms, callback) => {
  db.collection(COLLECTION).insertMany(alarms, function (err, result) {
    if (err) callback(err)
    callback(null, result)
  })
})
