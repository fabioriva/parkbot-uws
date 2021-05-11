const format = require('date-fns/format')
const parseISO = require('date-fns/parseISO')
const endOfDay = require('date-fns/endOfDay')
const endOfWeek = require('date-fns/endOfWeek')
const endOfMonth = require('date-fns/endOfMonth')
const endOfYear = require('date-fns/endOfYear')
const startOfDay = require('date-fns/startOfDay')
const startOfWeek = require('date-fns/startOfWeek')
const startOfMonth = require('date-fns/startOfMonth')
const startOfYear = require('date-fns/startOfYear')
const subWeeks = require('date-fns/subWeeks')
const subMonths = require('date-fns/subMonths')
const subYears = require('date-fns/subYears')
const util = require('util')

// add zero: 2013-02-08  # A calendar date part
const addZero = n => (n <= 9 ? '0' + n.toString() : n.toString())

exports.daily = util.promisify((daystr, history, callback) => {
  const day = parseISO(daystr)
  const start = startOfDay(day)
  const end = endOfDay(day)

  const pipeline = [
    {
      $match: {
        $and: [
          { date: { $gte: start, $lt: end } },
          { $or: [{ 'operation.id': 5 }, { 'operation.id': 6 }] }
        ]
      }
    },
    {
      $group: {
        _id: {
          year: { $year: '$date' },
          month: { $month: '$date' },
          day: { $dayOfMonth: '$date' },
          hour: { $hour: '$date' }
        },
        total: { $sum: 1 },
        entries: { $sum: { $cond: [{ $eq: ['$operation.id', 5] }, 1, 0] } },
        exits: { $sum: { $cond: [{ $eq: ['$operation.id', 6] }, 1, 0] } }
      }
    },
    { $sort: { _id: 1 } } // order by date ascending
  ]
  history.aggregate(pipeline).toArray(function (err, docs) {
    if (err) callback(err)
    const statistics = docs.map(e => {
      const date = addZero(e._id.hour)
      return {
        name: date,
        entries: e.entries,
        exits: e.exits,
        total: e.total
      }
    })
    const operations = {
      data: statistics,
      label: daystr,
      title: 'Daily operations'
    }
    callback(null, operations)
  })
})

exports.weekly = util.promisify((daystr, history, callback) => {
  const day = parseISO(daystr)
  const start = startOfWeek(subWeeks(day, 1), { weekStartsOn: 1 })
  const end = endOfWeek(subWeeks(day, 1), { weekStartsOn: 1 })

  const pipeline = [
    {
      $match: {
        $and: [
          { date: { $gte: start, $lt: end } },
          { $or: [{ 'operation.id': 5 }, { 'operation.id': 6 }] }
        ]
      }
    },
    {
      $group: {
        _id: {
          year: { $year: '$date' },
          month: { $month: '$date' },
          day: { $dayOfMonth: '$date' }
        },
        total: { $sum: 1 },
        entries: { $sum: { $cond: [{ $eq: ['$operation.id', 5] }, 1, 0] } },
        exits: { $sum: { $cond: [{ $eq: ['$operation.id', 6] }, 1, 0] } }
      }
    },
    { $sort: { _id: 1 } }
  ]
  history.aggregate(pipeline).toArray(function (err, docs) {
    if (err) return callback(err)
    const statistics = docs.map(e => {
      const date = addZero(e._id.day)
      return {
        name: date,
        entries: e.entries,
        exits: e.exits,
        total: e.total
      }
    })
    const operations = {
      data: statistics,
      label: format(start, 'yyyy-MM-dd') + ' ' + format(end, 'yyyy-MM-dd'),
      title: 'Weekly operations'
    }
    callback(null, operations)
  })
})

exports.monthly = util.promisify((daystr, history, callback) => {
  const day = parseISO(daystr)
  const start = startOfMonth(subMonths(day, 1))
  const end = endOfMonth(subMonths(day, 1))

  const pipeline = [
    {
      $match: {
        $and: [
          { date: { $gte: start, $lt: end } },
          { $or: [{ 'operation.id': 5 }, { 'operation.id': 6 }] }
        ]
      }
    },
    {
      $group: {
        _id: {
          year: { $year: '$date' },
          month: { $month: '$date' },
          day: { $dayOfMonth: '$date' }
        },
        total: { $sum: 1 },
        entries: { $sum: { $cond: [{ $eq: ['$operation.id', 5] }, 1, 0] } },
        exits: { $sum: { $cond: [{ $eq: ['$operation.id', 6] }, 1, 0] } }
      }
    },
    { $sort: { _id: 1 } } // order by date ascending
  ]
  history.aggregate(pipeline).toArray(function (err, docs) {
    if (err) return callback(err)
    const statistics = docs.map(e => {
      return {
        name: addZero(e._id.day),
        entries: e.entries,
        exits: e.exits,
        total: e.total
      }
    })
    const operations = {
      data: statistics,
      label:
        format(startOfDay(start), 'yyyy-MM-dd') +
        ' ' +
        format(endOfDay(end), 'yyyy-MM-dd'),
      title: 'Monthly operations'
    }
    callback(null, operations)
  })
})

exports.yearly = util.promisify((daystr, history, callback) => {
  const day = parseISO(daystr)
  const start = startOfYear(subYears(day, 1))
  const end = endOfYear(subYears(day, 1))

  const pipeline = [
    {
      $match: {
        $and: [
          { date: { $gte: start, $lt: end } },
          { $or: [{ 'operation.id': 5 }, { 'operation.id': 6 }] }
        ]
      }
    },
    {
      $group: {
        _id: {
          year: { $year: '$date' },
          month: { $month: '$date' }
        },
        total: { $sum: 1 },
        entries: { $sum: { $cond: [{ $eq: ['$operation.id', 5] }, 1, 0] } },
        exits: { $sum: { $cond: [{ $eq: ['$operation.id', 6] }, 1, 0] } }
      }
    },
    { $sort: { _id: 1 } }
  ]
  history.aggregate(pipeline).toArray(function (err, docs) {
    if (err) return callback(err)
    const statistics = docs.map(e => {
      return {
        name: addZero(e._id.month),
        entries: e.entries,
        exits: e.exits,
        total: e.total
      }
    })
    const operations = {
      data: statistics,
      label:
        format(startOfDay(start), 'yyyy-MM-dd') +
        ' ' +
        format(endOfDay(end), 'yyyy-MM-dd'),
      title: 'Yearly operations'
    }
    callback(null, operations)
  })
})
