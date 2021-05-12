const format = require('date-fns/format')
const querystring = require('querystring')
const { getHistory, getOperations, getRecentActivity } = require('./db')

function routes (app, db, obj, options) {
  const { prefix } = options

  app.get(prefix + '/alarms', (res, req) => {
    const active = obj.alarms.map(item => item._active)
    res.writeHeader('Content-Type', 'application/json')
    res.end(JSON.stringify(active))
  })

  app.get(prefix + '/cards', (res, req) => {
    res.writeHeader('Content-Type', 'application/json')
    res.end(JSON.stringify(obj.cards))
  })

  app.get(prefix + '/dashboard', async (res, req) => {
    res.onAborted(() => {
      res.aborted = true
    })
    /* Awaiting will yield and effectively return to C++, so you need to have called onAborted */
    const activity = await getRecentActivity(db, 5)
    const statistics = await getOperations(db, {
      dateString: format(new Date(), 'yyyy-MM-dd')
    })
    /* If we were aborted, you cannot respond */
    if (!res.aborted) {
      res.writeHeader('Content-Type', 'application/json')
      res.end(
        JSON.stringify({
          activity: activity,
          cards: obj.cards.length,
          occupancy: obj.map.occupancy,
          operations: statistics,
          system: obj.overview
        })
      )
    }
  })

  app.get(prefix + '/history', async (res, req) => {
    res.onAborted(() => {
      res.aborted = true
    })
    /* Awaiting will yield and effectively return to C++, so you need to have called onAborted */
    const query = querystring.parse(req.getQuery())
    const docs = await getHistory(db, query)
    /* If we were aborted, you cannot respond */
    if (!res.aborted) {
      res.writeHeader('Content-Type', 'application/json')
      res.end(JSON.stringify(docs))
    }
  })

  app.get(prefix + '/map', (res, req) => {
    res.writeHeader('Content-Type', 'application/json')
    res.end(JSON.stringify(obj.map))
  })

  app.get(prefix + '/overview', (res, req) => {
    res.writeHeader('Content-Type', 'application/json')
    res.end(JSON.stringify(obj.overview))
  })

  app.get(prefix + '/racks', (res, req) => {
    res.writeHeader('Content-Type', 'application/json')
    res.end(JSON.stringify(obj.racks))
  })

  app.get(prefix + '/rack/:id', (res, req) => {
    res.writeHeader('Content-Type', 'application/json')
    res.end(JSON.stringify(obj.racks[req.getParameter(0)]))
  })

  app.get(prefix + '/stalls', (res, req) => {
    res.writeHeader('Content-Type', 'application/json')
    res.end(JSON.stringify(obj.stalls))
  })

  app.get(prefix + '/statistics', async (res, req) => {
    res.onAborted(() => {
      res.aborted = true
    })
    /* Awaiting will yield and effectively return to C++, so you need to have called onAborted */
    const query = querystring.parse(req.getQuery())
    const docs = await getOperations(db, query)
    /* If we were aborted, you cannot respond */
    if (!res.aborted) {
      res.writeHeader('Content-Type', 'application/json')
      res.end(JSON.stringify(docs))
    }
  })
}

module.exports = routes
