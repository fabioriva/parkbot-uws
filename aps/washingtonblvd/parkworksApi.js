const querystring = require('querystring')

function routes (app, db, def, obj, plc, options) {
  const { prefix } = options
  // GET /map
  app.get(prefix + '/map', (res, req) => {
    sendJson(res, obj.stalls)
  })
  // GET /carIsParked?id=123
  app.get(prefix + '/carIsParked', (res, req) => {
    const query = querystring.parse(req.getQuery())
    const id = parseInt(query.id)
    if (id >= 1 && id <= def.CARDS) {
      const stall = obj.stalls.find(stall => stall.status === id)
      if (stall === undefined) {
        sendJson(res, { message: 'Card not found' })
      } else {
        sendJson(res, { stall })
      }
    } else {
      sendJson(res, { message: 'Card not valid' })
    }
  })
  // POST /charging

  // POST /notCharging
}

module.exports = routes

function readJson (res, cb, err) {
  let buffer
  /* Register data cb */
  res.onData((ab, isLast) => {
    const chunk = Buffer.from(ab)
    if (isLast) {
      let json
      if (buffer) {
        try {
          json = JSON.parse(Buffer.concat([buffer, chunk]))
        } catch (e) {
          /* res.close calls onAborted */
          res.close()
          return
        }
        cb(json)
      } else {
        try {
          json = JSON.parse(chunk)
        } catch (e) {
          /* res.close calls onAborted */
          res.close()
          return
        }
        cb(json)
      }
    } else {
      if (buffer) {
        buffer = Buffer.concat([buffer, chunk])
      } else {
        buffer = Buffer.concat([chunk])
      }
    }
  })
  /* Register error cb */
  res.onAborted(err)
}

function sendJson (res, data) {
  /* If we were aborted, you cannot respond */
  if (!res.aborted) {
    res.writeHeader('Content-Type', 'application/json')
    res.end(JSON.stringify(data))
  }
}
