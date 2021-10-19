// const mongo = require('mongodb')
// const format = require('date-fns/format')
// const parseISO = require('date-fns/parseISO')
const { parseISO } = require('date-fns')
const { format, utcToZonedTime } = require('date-fns-tz')
const util = require('util')
const { daily, weekly, monthly, yearly } = require('./statistics')

const COLLECTION = 'history'

class Log {
  constructor (s7log) {
    // console.log('timestamp:', typeof s7log.date, s7log.date)
    this.alarm = s7log.alarm // s7log.event
    this.card = s7log.card
    this.date = new Date(format(s7log.date, "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'"))
    this.device = s7log.device
    this.mode = s7log.mode
    this.operation = s7log.operation
    this.size = s7log.size
    this.stall = s7log.stall
  }
}

exports.getHistory_ = util.promisify((db, query, callback) => {
  // const { dateFrom, dateTo } = query
  // console.log(typeof dateFrom, dateFrom)
  // const parsed = parseISO(dateFrom)
  // console.log(parsed)
  // console.log(
  //   format(utcToZonedTime(parsed, 'UTC'), 'yyyy-MM-dd HH:mm', {
  //     timeZone: 'UTC'
  //   })
  // )
  const dateFrom = parseISO(query.dateFrom)
  const dateTo = parseISO(query.dateTo)

  const pipeline = [
    {
      $match: {
        card: { $gte: 0 }
        // date: {
        //   $gte: dateFrom, // + 'Z'), // new Date(dateFrom),
        //   $lt: dateTo // + 'Z') // new Date(dateTo)
        // }
      }
    },
    {
      $lookup: {
        from: 'alarms',
        localField: 'alarm',
        foreignField: 'id',
        as: 'alarm'
      }
    },
    // { $unwind: '$alarm' },
    { $unwind: { path: '$alarm', preserveNullAndEmptyArrays: true } },
    {
      $lookup: {
        from: 'devices',
        localField: 'device',
        foreignField: 'id',
        as: 'device'
      }
    },
    { $unwind: '$device' },
    {
      $lookup: {
        from: 'modes',
        localField: 'mode',
        foreignField: 'id',
        as: 'mode'
      }
    },
    { $unwind: '$mode' },
    {
      $lookup: {
        from: 'operations',
        localField: 'operation',
        foreignField: 'id',
        as: 'operation'
      }
    },
    { $unwind: '$operation' },
    // {
    //   $set: {
    //     // 'alarm.id': '$alarm.id',
    //     // 'alarm.info': '$alarm.i18n',
    //     // 'device.id': '$device.id',
    //     // 'device.info': '$device.i18n',
    //     mode: '$mode.id',
    //     modeLocale: '$mode.i18n'
    //   }
    // },
    { $unset: ['_id', 'alarm._id', 'device._id', 'mode._id', 'operation._id'] },
    { $sort: { date: -1 } }

    // {
    //   $project: {
    //     _id: 0, // suppress _id field
    //     alarm: 1,
    //     logged: 1,
    //     tmp: { $arrayElemAt: [obj.alarms, '$device.id'] },
    //     // al_: { $arrayElemAt: ['$ttmp', 3] },
    //     // al_: { $arrayElemAt: [obj.alarms[0].alarms, 3] },
    //     device: 1,
    //     // device: { $arrayElemAt: [obj.devices, '$device.id'] }
    //     // bar: '$card',
    //     // mode: { $arrayElemAt: [obj.modes, '$mode.id'] },
    //     // info: { $arrayElemAt: [obj.operations, '$operation.id'] },
    //     card: 1,
    //     stall: 1,
    //     size: 1
    //     // foo: obj.modes.find(e => e.id === '$mode.id')
    //     // tex: { $eq: '$card' },
    //     // foo: obj.modes.find(e => e.id === 2)
    //     // bar: { $toUpper: obj.devices.find(e => e.id === 1).name }
    //   }
    // }
    // { $unset: ['tmp'] }
  ]
  db.collection(COLLECTION)
    .aggregate(pipeline)
    // .sort({ date: -1 })
    .toArray(function (err, docs) {
      if (err) callback(err)
      callback(null, {
        count: docs.length,
        // dateFrom: format(parseISO(dateFrom), 'yyyy-MM-dd HH:mm'),
        // dateTo: format(parseISO(dateTo), 'yyyy-MM-dd HH:mm'),
        // dateFrom: format(utcToZonedTime(dateFrom, 'UTC'), 'yyyy-MM-dd HH:mm', {
        //   timeZone: 'UTC'
        // }),
        // dateTo: format(utcToZonedTime(dateTo, 'UTC'), 'yyyy-MM-dd HH:mm', {
        //   timeZone: 'UTC'
        // }),
        query: docs
      })
    })
})

exports.getHistoryLog_ = util.promisify((db, id, callback) => {
  const pipeline = [
    {
      // $match: { _id: new mongo.ObjectID(id) }
      $match: { _id: id }
    },
    {
      $lookup: {
        from: 'alarms',
        localField: 'alarm',
        foreignField: 'id',
        as: 'alarm'
      }
    },
    { $unwind: { path: '$alarm', preserveNullAndEmptyArrays: true } },
    {
      $lookup: {
        from: 'devices',
        localField: 'device',
        foreignField: 'id',
        as: 'device'
      }
    },
    { $unwind: '$device' },
    {
      $lookup: {
        from: 'modes',
        localField: 'mode',
        foreignField: 'id',
        as: 'mode'
      }
    },
    { $unwind: '$mode' },
    {
      $lookup: {
        from: 'operations',
        localField: 'operation',
        foreignField: 'id',
        as: 'operation'
      }
    },
    { $unwind: '$operation' },
    { $unset: ['_id', 'alarm._id', 'device._id', 'mode._id', 'operation._id'] }
  ]
  db.collection(COLLECTION)
    // .aggregate(pipeline, function (err, results) {
    .aggregate(pipeline)
    .toArray(function (err, results) {
      if (err) callback(err)
      callback(null, results[0])
    })
})

exports.getOperations_ = util.promisify(async (db, query, callback) => {
  // console.log(query.dateString)
  try {
    const date_ = parseISO(query.dateString)
    console.log(date_)
    const date = new Date(query.dateString)
    console.log(date)
    const history = db.collection(COLLECTION)
    const operations = await Promise.all([
      daily(date, history),
      weekly(date, history),
      monthly(date, history),
      yearly(date, history)
    ])
    callback(null, operations)
  } catch (err) {
    callback(err)
  }
})

exports.getRecentActivity_ = util.promisify((db, limit, callback) => {
  const pipeline = [
    // {
    //   $match: {
    //     date: {
    //       $gte: new Date(dateFrom),
    //       $lt: new Date(dateTo)
    //     }
    //   }
    // },
    {
      $lookup: {
        from: 'alarms',
        localField: 'alarm',
        foreignField: 'id',
        as: 'alarm'
      }
    },
    { $unwind: { path: '$alarm', preserveNullAndEmptyArrays: true } },
    {
      $lookup: {
        from: 'devices',
        localField: 'device',
        foreignField: 'id',
        as: 'device'
      }
    },
    { $unwind: '$device' },
    {
      $lookup: {
        from: 'modes',
        localField: 'mode',
        foreignField: 'id',
        as: 'mode'
      }
    },
    { $unwind: '$mode' },
    {
      $lookup: {
        from: 'operations',
        localField: 'operation',
        foreignField: 'id',
        as: 'operation'
      }
    },
    { $unwind: '$operation' },
    { $unset: ['_id', 'alarm._id', 'device._id', 'mode._id', 'operation._id'] },
    { $sort: { date: -1 } }
  ]
  db.collection(COLLECTION)
    .aggregate(pipeline)
    .limit(limit)
    .toArray(function (err, docs) {
      if (err) callback(err)
      callback(null, {
        count: docs.length,
        documents: docs
      })
    })
})

exports.insertLog_ = util.promisify((db, s7log, callback) => {
  const log = new Log(s7log)
  db.collection(COLLECTION).insertOne(log, function (err, result) {
    if (err) callback(err)
    // console.log(result)
    callback(null, result)
    // callback(null, result)
  })
})
