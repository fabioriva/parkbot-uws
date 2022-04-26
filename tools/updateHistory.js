require('dotenv').config()
const MongoClient = require('mongodb').MongoClient
const util = require('util')
const obj = require('../aps/spire/obj')

const DATABASE = 'wallstreet'
const COLLECTION = 'history'

const client = new MongoClient(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

const start = async () => {
  try {
    await client.connect()
    const db = client.db(DATABASE)
    console.log(process.env.MONGODB_URI)

    // await updateAlarms(db, 2, 2, obj.alarms[0].alarms)

    for (let i = 1; i <= 64; i++) {
      await updateAlarms(db, 1, i, obj.alarms[0].alarms)
      await updateAlarms(db, 2, i, obj.alarms[1].alarms)
      await updateAlarms(db, 3, i, obj.alarms[2].alarms)
      await updateAlarms(db, 4, i, obj.alarms[3].alarms)
      await updateAlarms(db, 5, i, obj.alarms[4].alarms)
      await updateAlarms(db, 6, i, obj.alarms[5].alarms)
    }
    // for (let i = 0; i <= 15; i++) {
    //   updateOperations(db, i, obj)
    // }
    // for (let i = 0; i <= 8; i++) {
    //   updateModes(db, i, obj)
    // }

    await client.close()
    process.exit(1)
  } catch (err) {
    console.error(new Error(err))
    process.exit(1)
  }
}

start()

const updateAlarms = util.promisify((db, device, alarm, alarms, callback) => {
  const filter = {
    $and: [
      { 'device.id': device },
      { 'alarm.id': alarm },
      { $or: [{ 'operation.id': 1 }, { 'operation.id': 2 }] }
    ]
  }
  // console.log(filter)
  db.collection(COLLECTION).updateMany(
    filter,
    {
      $set: { alarm: alarms[alarm - 1] }
    },
    function (err, res) {
      if (err) callback(err)
      console.log(res)
      callback(null, res)
    }
  )

  // const cursor = await db.collection(COLLECTION).find(filter)
  // print a message if no documents were found
  // if ((await cursor.count()) === 0) {
  //   console.log('No documents found!')
  // }
  // // replace console.dir with your callback to access individual elements
  // await cursor.forEach(console.dir)
  // const updateDoc = {
  //   $set: {
  //     alarm: obj.alarms[device - 1].alarms[alarm - 1]
  //   }
  // }
  // const result = await db.collection(COLLECTION).updateOne(filter, updateDoc)
  // console.log(result)
  // return result
  // const res = await db
  //   .collection('history')
  //   .find(filter)
  //   .toArray()
  // console.log(res)
  // return res

  // db.collection(COLLECTION)
  //   .find(filter)
  //   .toArray(function (err, docs) {
  //     if (err) callback(err)
  //     console.log(docs, docs.length)
  //     callback(null, docs)
  //   })
})

const updateOperations = util.promisify(async (db, id, obj) => {
  const filter = {
    'operation.id': id
  }
  console.log(filter)
  const cursor = await db.collection(COLLECTION).find(filter)
  // print a message if no documents were found
  if ((await cursor.count()) === 0) {
    console.log('No documents found!')
  }
  // replace console.dir with your callback to access individual elements
  await cursor.forEach(console.dir)
  const updateDoc = {
    $set: {
      operation: obj.operations[id]
    }
  }
  const result = await db.collection(COLLECTION).updateMany(filter, updateDoc)
  console.log(result)
  // return result
})

const updateModes = util.promisify(async (db, id, obj) => {
  const filter = {
    'mode.id': id
  }
  console.log(filter)
  const cursor = await db.collection(COLLECTION).find(filter)
  // print a message if no documents were found
  if ((await cursor.count()) === 0) {
    console.log('No documents found!')
  }
  // replace console.dir with your callback to access individual elements
  await cursor.forEach(console.dir)
  const updateDoc = {
    $set: {
      mode: obj.modes[id]
    }
  }
  const result = await db.collection(COLLECTION).updateMany(filter, updateDoc)
  console.log(result)
  // return result
})
