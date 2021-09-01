const mongo = require('mongodb')
const format = require('date-fns/format')
const parseISO = require('date-fns/parseISO')
const util = require('util')
const { daily, weekly, monthly, yearly } = require('./operations')

class Log {
  constructor (obj, s7log) {
    this.alarm = this.alarm(s7log, obj)
    this.card = s7log.card
    this.date = new Date(format(s7log.date, "yyyy-MM-dd'T'HH:mm:ss.SSS'z'"))
    this.device = this.device(s7log, obj)
    this.event = s7log.event
    this.logged = format(s7log.date, 'yyyy-MM-dd HH:mm:ss')
    this.mode = obj.modes.find(item => item.id === s7log.mode)
    this.operation = obj.operations.find(item => item.id === s7log.operation)
    this.size = s7log.size
    this.stall = s7log.stall
    this.system = s7log.system
  }

  // alarm (log, obj) {
  //   return log.alarm === 0
  //     ? {}
  //     : obj.alarms[log.device - 1].alarms.find(a => a.id === log.alarm)
  // }

  alarm (log, obj) {
    return {
      id: log.alarm,
      info:
        log.alarm === 0
          ? 'ready'
          : obj.alarms[log.device - 1].alarms.find(a => a.id === log.alarm)
              .label // .info
    }
  }

  device (log, obj) {
    return {
      id: log.device,
      name:
        log.device === 0
          ? 'operator'
          : obj.devices.find(d => d.id === log.device).name
    }
  }
}

// exports.getHistory = util.promisify((db, query, callback) => {
//   let params = {}
//   const { dateFrom, dateTo, filter, number } = query
//   params = {
//     date: {
//       $gte: new Date(dateFrom),
//       $lt: new Date(dateTo)
//     },
//     // 'alarm.id': filter === 'e' ? { $eq: number } : { $gte: 0 },
//     // 'device.id': device === undefined ? { $ne: 0 } : device !== '0' ? { $eq: device } : { $gte: 0 },
//     'operation.id': filter === 'b' ? { $gte: 1, $lte: 2 } : { $ne: 0 },
//     card: filter === 'c' ? { $eq: number } : { $gte: 0 },
//     stall: filter === 'd' ? { $eq: number } : { $gte: 0 }
//   }
//   db.collection('history')
//     .find(params)
//     .sort({ date: -1 })
//     .toArray(function (err, docs) {
//       if (err) callback(err)
//       callback(null, {
//         count: docs.length,
//         dateFrom: format(parseISO(dateFrom), 'yyyy-MM-dd HH:mm'),
//         dateTo: format(parseISO(dateTo), 'yyyy-MM-dd HH:mm'),
//         query: docs
//       })
//     })
// })

// async function each (cursor) {
//   await cursor.forEach(function (item) {
//     console.log(item)
//     if (item == null) {
//       console.log(item)
//     }
//   })
//   await cursor.rewind()
// }

exports.getHistory = util.promisify((db, obj, query, callback) => {
  // console.log(obj.alarms[0]?.alarms[47])
  let params = {}
  const { dateFrom, dateTo, filter, number } = query
  params = {
    date: {
      $gte: new Date(dateFrom),
      $lt: new Date(dateTo)
    },
    // 'alarm.id': filter === 'e' ? { $eq: number } : { $gte: 0 },
    // 'device.id': device === undefined ? { $ne: 0 } : device !== '0' ? { $eq: device } : { $gte: 0 },
    'operation.id': filter === 'b' ? { $gte: 1, $lte: 2 } : { $ne: 0 },
    card: filter === 'c' ? { $eq: number } : { $gte: 0 },
    stall: filter === 'd' ? { $eq: number } : { $gte: 0 }
  }
  db.collection('history')
    .find(params)
    .sort({ date: -1 })
    .toArray(function (err, items) {
      if (err) callback(err)
      items.forEach((item, index, array) => {
        // console.log(item.device.id - 1, item.alarm.id - 1)
        item.alarm = obj.alarms[item.device.id - 1].alarms[item.alarm.id - 1]
        item.mode = obj.modes.find(m => m.id === item.mode.id)
        // console.log(index, item.alarm)
        if (index === array.length - 1) {
          callback(null, {
            count: items.length,
            dateFrom: format(parseISO(dateFrom), 'yyyy-MM-dd HH:mm'),
            dateTo: format(parseISO(dateTo), 'yyyy-MM-dd HH:mm'),
            query: items
          })
        }
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

exports.insertLog = util.promisify((db, obj, s7log, callback) => {
  const log = new Log(obj, s7log)
  db.collection('history').insertOne(log, function (err, result) {
    if (err) callback(err)
    callback(null, log)
    // callback(null, result)
  })
})
