// const mongo = require('mongodb')
const format = require('date-fns/format')
const parseISO = require('date-fns/parseISO')
const util = require('util')

const COLLECTION = 'logs'

class Log {
  constructor (s7log) {
    this.alarm = s7log.alarm
    this.card = s7log.card
    this.date = new Date(format(s7log.date, "yyyy-MM-dd'T'HH:mm:ss.SSS'z'"))
    this.dateStr = format(s7log.date, 'yyyy-MM-dd HH:mm:ss')
    this.device = s7log.device
    this.mode = s7log.mode
    this.operation = s7log.operation
    this.size = s7log.size
    this.stall = s7log.stall
  }
}

exports.getHistory_ = util.promisify((db, query, callback) => {
  const { dateFrom, dateTo } = query
  const pipeline = [
    {
      $match: {
        date: {
          $gte: new Date(dateFrom),
          $lt: new Date(dateTo)
        }
        // device: { $gte: 3 }
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
    { $unwind: '$alarm' },
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
    // { $unwind: { path: '$operation', preserveNullAndEmptyArrays: true } },
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
    // { $sort: { mode: -1 } }

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
    // .limit(10)
    .toArray(function (err, docs) {
      if (err) callback(err)
      // console.log('count:', docs.length)
      // callback(null, docs)
      callback(null, {
        count: docs.length,
        dateFrom: format(parseISO(dateFrom), 'yyyy-MM-dd HH:mm'),
        dateTo: format(parseISO(dateTo), 'yyyy-MM-dd HH:mm'),
        query: docs
      })
    })
})

exports.insertLog_ = util.promisify((db, s7log, callback) => {
  const log = new Log(s7log)
  db.collection(COLLECTION).insertOne(log, function (err, result) {
    if (err) callback(err)
    callback(null, log)
    // callback(null, result)
  })
})