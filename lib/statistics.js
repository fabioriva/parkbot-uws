const util = require('util')
const {
  format,
  endOfDay,
  endOfMonth,
  endOfWeek,
  endOfYear,
  // parseISO,
  startOfDay,
  startOfMonth,
  startOfWeek,
  startOfYear,
  subMonths,
  subWeeks,
  subYears
} = require('date-fns')
// const { en } = require('date-fns/locale')

exports.daily = util.promisify((date, history, callback) => {
  // const date = parseISO(dateStr)
  // console.log(typeof date, date, format(date, 'yyyy-MM-dd'))
  const start = startOfDay(date)
  const end = endOfDay(date)
  const pipeline = [
    {
      $match: {
        date: { $gte: start, $lt: end },
        device: { $ne: 0 },
        $or: [{ operation: 5 }, { operation: 6 }]
        // $and: [
        //   { date: { $gte: startOfDay(date), $lt: endOfDay(date) } },
        //   { device: { $ne: 0 } },
        //   { $or: [{ operation: 5 }, { operation: 6 }] }
        // ]
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
      // key: 'daily',
      // query: format(date, 'yyyy-MM-dd')
      label: format(date, 'yyyy-MM-dd'),
      title: 'Daily operations'
    })
  })
})

exports.weekly = util.promisify((date, history, callback) => {
  // const date = parseISO(dateStr)
  const start = startOfWeek(subWeeks(date, 1), { weekStartsOn: 1 })
  const end = endOfWeek(subWeeks(date, 1), { weekStartsOn: 1 })
  const pipeline = [
    {
      $match: {
        date: { $gte: start, $lt: end },
        device: { $ne: 0 },
        $or: [{ operation: 5 }, { operation: 6 }]
        // $and: [
        //   { date: { $gte: start, $lt: end } },
        //   { $or: [{ operation: 5 }, { operation: 6 }] }
        // ]
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
        return {
          name: e._id.month + '-' + e._id.day,
          entries: e.entries,
          exits: e.exits,
          total: e.total
        }
      }),
      // key: 'weekly',
      // query: 'i18nQuery' // format(date, 'yyyy-MM-dd')
      label: format(start, 'yyyy-MM-dd') + ' ' + format(end, 'yyyy-MM-dd'),
      title: 'Weekly operations'
    })
  })
})

exports.monthly = util.promisify((date, history, callback) => {
  // const date = parseISO(dateStr)
  const start = startOfMonth(subMonths(date, 1))
  const end = endOfMonth(subMonths(date, 1))
  const pipeline = [
    {
      $match: {
        date: { $gte: start, $lt: end },
        device: { $ne: 0 },
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
        return {
          name: e._id.month + '-' + e._id.day,
          entries: e.entries,
          exits: e.exits,
          total: e.total
        }
      }),
      // key: 'monthly',
      // query: 'i18nQuery' // format(date, 'yyyy-MM-dd')
      label: format(start, 'yyyy-MM-dd') + ' ' + format(end, 'yyyy-MM-dd'),
      title: 'Montly operations'
    })
  })
})

exports.yearly = util.promisify((date, history, callback) => {
  // const date = parseISO(dateStr)
  const start = startOfYear(subYears(date, 1))
  const end = endOfYear(subYears(date, 1))
  const pipeline = [
    {
      $match: {
        date: { $gte: start, $lt: end },
        device: { $ne: 0 },
        $or: [{ operation: 5 }, { operation: 6 }]
      }
    },
    {
      $group: {
        _id: {
          year: { $year: '$date' },
          month: { $month: '$date' }
          // day: { $dayOfMonth: '$date' }
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
        return {
          name: format(new Date().setMonth(e._id.month - 1), 'MMM'),
          entries: e.entries,
          exits: e.exits,
          total: e.total
        }
      }),
      // key: 'yearly',
      // query: format(date, 'yyyy-MM-dd')
      label: format(start, 'yyyy-MM-dd') + ' ' + format(end, 'yyyy-MM-dd'),
      title: 'Yearly operations'
    })
  })
})
