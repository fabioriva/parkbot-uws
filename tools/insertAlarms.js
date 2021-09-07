require('dotenv').config()
const MongoClient = require('mongodb').MongoClient
const util = require('util')
const obj = require('../aps/spire/obj')

const DATABASE = 'wallstreet'
const COLLECTION = 'alarms'
// const MONGODB_URI = 'mongodb://127.0.0.1:27017/'

const client = new MongoClient(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

const start = async () => {
  try {
    await client.connect()
    const db = client.db(DATABASE)
    await insertAlarms(db, obj.alarms[0].alarms) //
    await client.close()
    process.exit(1)
  } catch (err) {
    console.error(new Error(err))
    process.exit(1)
  }
}

start()

const insertAlarms = util.promisify((db, alarms, callback) => {
  db.collection(COLLECTION).insertMany(alarms, function (err, result) {
    if (err) callback(err)
    callback(null, result)
  })
})
