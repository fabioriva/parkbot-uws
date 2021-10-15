const util = require('util')
const {
  format,
  endOfDay,
  endOfMonth,
  endOfWeek,
  endOfYear,
  startOfDay,
  startOfMonth,
  startOfWeek,
  startOfYear,
  subMonths,
  subWeeks,
  subYears
} = require('date-fns')

exports.daily = util.promisify((date, history, callback) => {
  const pipeline = [
    {
      $match: {
        date: { $gte: startOfDay(date), $lt: endOfDay(date) },
        $or: [{ operation: 5 }, { operation: 6 }]
      }
    },
    {
      $group: {
        _id: {
          hour: { $hour: '$date' }
        },
        total: { $sum: 1 },
        entries: { $sum: { $cond: [{ $eq: ['$operation', 5] }, 1, 0] } },
        exits: { $sum: { $cond: [{ $eq: ['$operation', 6] }, 1, 0] } }
      }
    },
    { $sort: { _id: 1 } }
  ]
  history.aggregate(pipeline).toArray(function (err, docs) {
    if (err) callback(err)
    callback(null, {
      data: docs.map(e => {
        const hour = e._id.hour % 12 || 12
        const name =
          e._id.hour < 12 || e._id.hour === 24 ? hour + ' am' : hour + ' pm'
        return {
          name,
          entries: e.entries,
          exits: e.exits,
          total: e.total
        }
      }),
      key: 'daily',
      query: format(date, 'yyyy-MM-dd')
    })
  })
})

exports.weekly = util.promisify((date, history, callback) => {
  const pipeline = [
    {
      $match: {
        date: {
          $gte: startOfWeek(subWeeks(date, 1), { weekStartsOn: 1 }),
          $lt: endOfWeek(subWeeks(date, 1), { weekStartsOn: 1 })
        },
        $or: [{ operation: 5 }, { operation: 6 }]
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
        entries: { $sum: { $cond: [{ $eq: ['$operation', 5] }, 1, 0] } },
        exits: { $sum: { $cond: [{ $eq: ['$operation', 6] }, 1, 0] } }
      }
    },
    { $sort: { _id: 1 } }
  ]
  history.aggregate(pipeline).toArray(function (err, docs) {
    if (err) callback(err)
    callback(null, {
      data: docs.map(e => {
        // const hour = e._id.hour % 12 || 12
        // const name =
        //   e._id.hour < 12 || e._id.hour === 24 ? hour + ' am' : hour + ' pm'
        return {
          name: e._id.month + '-' + e._id.day,
          entries: e.entries,
          exits: e.exits,
          total: e.total
        }
      }),
      key: 'weekly',
      query: format(date, 'yyyy-MM-dd')
    })
  })
})

exports.monthly = util.promisify((date, history, callback) => {
  const pipeline = [
    {
      $match: {
        date: {
          $gte: startOfMonth(subMonths(date, 1)),
          $lt: endOfMonth(subMonths(date, 1))
        },
        $or: [{ operation: 5 }, { operation: 6 }]
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
        entries: { $sum: { $cond: [{ $eq: ['$operation', 5] }, 1, 0] } },
        exits: { $sum: { $cond: [{ $eq: ['$operation', 6] }, 1, 0] } }
      }
    },
    { $sort: { _id: 1 } }
  ]
  history.aggregate(pipeline).toArray(function (err, docs) {
    if (err) callback(err)
    callback(null, {
      data: docs.map(e => {
        // const hour = e._id.hour % 12 || 12
        // const name =
        //   e._id.hour < 12 || e._id.hour === 24 ? hour + ' am' : hour + ' pm'
        return {
          name: e._id.month + '-' + e._id.day,
          entries: e.entries,
          exits: e.exits,
          total: e.total
        }
      }),
      key: 'monthly',
      query: format(date, 'yyyy-MM-dd')
    })
  })
})

exports.yearly = util.promisify((date, history, callback) => {
  const pipeline = [
    {
      $match: {
        date: {
          $gte: startOfYear(subYears(date, 1)),
          $lt: endOfYear(subYears(date, 1))
        },
        $or: [{ operation: 5 }, { operation: 6 }]
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
        entries: { $sum: { $cond: [{ $eq: ['$operation', 5] }, 1, 0] } },
        exits: { $sum: { $cond: [{ $eq: ['$operation', 6] }, 1, 0] } }
      }
    },
    { $sort: { _id: 1 } }
  ]
  history.aggregate(pipeline).toArray(function (err, docs) {
    if (err) callback(err)
    callback(null, {
      data: docs.map(e => {
        // const hour = e._id.hour % 12 || 12
        // const name =
        //   e._id.hour < 12 || e._id.hour === 24 ? hour + ' am' : hour + ' pm'
        return {
          name: e._id.year + '-' + e._id.month,
          entries: e.entries,
          exits: e.exits,
          total: e.total
        }
      }),
      key: 'yearly',
      query: format(date, 'yyyy-MM-dd')
    })
  })
})
