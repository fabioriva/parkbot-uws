require('dotenv').config()
const MongoClient = require('mongodb').MongoClient
const util = require('util')

/** Edit APS */
const DATABASE = 'ironbank'
const { ALARMS, DEVICES, MODES, OPERATIONS } = require('../aps/ironbank/str')
/** End */

const client = new MongoClient(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

const dropCollection = util.promisify((db, collection, callback) => {
  db.collection(collection).drop(function (err, result) {
    if (err) callback(err)
    callback(null, result)
  })
})

const insertMany = util.promisify((db, collection, data, callback) => {
  db.collection(collection).insertMany(data, function (err, result) {
    if (err) callback(err)
    callback(null, result)
  })
})

const start = async () => {
  try {
    await client.connect()
    const db = client.db(DATABASE)
    // Drop collections
    // await dropCollection(db, 'alarms')
    // await dropCollection(db, 'devices')
    // await dropCollection(db, 'modes')
    // await dropCollection(db, 'operations')
    // Insert data
    await insertMany(db, 'alarms', ALARMS)
    await insertMany(db, 'devices', DEVICES)
    await insertMany(db, 'modes', MODES)
    await insertMany(db, 'operations', OPERATIONS)
    await client.close()
    process.exit(1)
  } catch (err) {
    console.error(new Error(err))
    process.exit(1)
  }
}

start()
