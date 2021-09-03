require('dotenv').config()
const MongoClient = require('mongodb').MongoClient
const util = require('util')
const obj = require('./aps/spire/obj')

const DATABASE = 'wallstreet'
const COLLECTION = 'history'
// const MONGODB_URI = 'mongodb://127.0.0.1:27017/'

const client = new MongoClient(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

const start = async () => {
  try {
    await client.connect()
    const db = client.db(DATABASE)

    // updateAlarms(db, 1, 1, obj)
    for (let i = 1; i <= 64; i++) {
      updateAlarms(db, 1, i, obj)
    }
  } catch (err) {
    console.error(new Error(err))
    process.exit(1)
  }
}

start()

const updateAlarms = util.promisify(async (db, device, alarm, obj) => {
  console.log(device, alarm, obj.alarms[device - 1].alarms[alarm - 1])
  const filter = {
    $and: [
      { 'device.id': device },
      { 'alarm.id': alarm },
      { $or: [{ 'operation.id': 1 }, { 'operation.id': 2 }] }
    ]
  }
  console.log(filter)
  // const cursor = await db.collection(COLLECTION).find(filter)
  // print a message if no documents were found
  // if ((await cursor.count()) === 0) {
  //   console.log('No documents found!')
  // }
  // // replace console.dir with your callback to access individual elements
  // await cursor.forEach(console.dir)
  const updateDoc = {
    $set: {
      alarm: obj.alarms[device - 1].alarms[alarm - 1]
    }
  }
  const result = await db.collection(COLLECTION).updateMany(filter, updateDoc)
  console.log(result)
  // return result
})
