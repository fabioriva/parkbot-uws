const util = require('util')
const { format, endOfDay, startOfDay } = require('date-fns')

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
