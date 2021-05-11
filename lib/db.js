const mongo = require('mongodb')
const format = require('date-fns/format')
const parseISO = require('date-fns/parseISO')
const util = require('util')
const { daily, weekly, monthly, yearly } = require('./operations')

exports.getHistory = util.promisify((db, query, callback) => {
  let params = {}
  const { dateFrom, dateTo, filter, number } = query
  params = {
    date: {
      $gte: new Date(dateFrom),
      $lt: new Date(dateTo)
    },
    'alarm.id': filter === 'e' ? { $eq: number } : { $gte: 0 },
    // 'device.id': device === undefined ? { $ne: 0 } : device !== '0' ? { $eq: device } : { $gte: 0 },
    'operation.id': filter === 'b' ? { $gte: 1, $lte: 2 } : { $ne: 0 },
    card: filter === 'c' ? { $eq: number } : { $gte: 0 },
    stall: filter === 'd' ? { $eq: number } : { $gte: 0 }
  }
  db.collection('history')
    .find(params)
    .sort({ date: -1 })
    .toArray(function (err, docs) {
      if (err) callback(err)
      callback(null, {
        count: docs.length,
        dateFrom: format(parseISO(dateFrom), 'yyyy-MM-dd HH:mm'),
        dateTo: format(parseISO(dateTo), 'yyyy-MM-dd HH:mm'),
        query: docs
      })
    })
})

exports.getHistoryLog = util.promisify((db, id, callback) => {
  db.collection('history').findOne({ _id: new mongo.ObjectID(id) }, function (
    err,
    log
  ) {
    // .toArray(function (err, docs) {
    if (err) callback(err)
    callback(null, log)
  })
})

exports.getRecentActivity = util.promisify((db, limit, callback) => {
  db.collection('history')
    .find()
    .sort({ $natural: -1 })
    .limit(limit)
    .toArray(function (err, docs) {
      if (err) callback(err)
      callback(null, {
        count: docs.length,
        documents: docs
      })
    })
})

// exports.insertLog = util.promisify((db, s7log, s7obj, callback) => {
//   const log = new Log(s7log, s7obj)
//   db.collection('history').insertOne(log, function (err, result) {
//     if (err) callback(err)
//     callback(null, result)
//   })
// })

exports.getOperations = util.promisify(async (db, query, callback) => {
  try {
    const day = query.dateString
    const history = db.collection('history')
    const operations = await Promise.all([
      daily(day, history),
      weekly(day, history),
      monthly(day, history),
      yearly(day, history)
    ])
    callback(null, operations)
  } catch (err) {
    callback(err)
  }
})
