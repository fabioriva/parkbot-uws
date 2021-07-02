const querystring = require('querystring')

function routes (app, def, obj, plc, options) {
  const { prefix } = options

  /**
   * @api {get} /carExit/
   * @apiParam {Number} id
   */
  app.get(prefix + '/carExit', (res, req) => {
    const query = querystring.parse(req.getQuery())
    const id = parseInt(query.id)
    if (id >= 1 && id <= def.CARDS) {
      const stall = obj.stalls.find(stall => stall.status === id)
      if (stall === undefined) {
        sendJson(res, { message: 'Card not found' })
      } else {
        const buffer = Buffer.allocUnsafe(2)
        buffer.writeUInt16BE(id, 0)
        // const response = await plc.write(def.REQ_0, buffer)
        const response = Boolean(1)
        sendJson(res, {
          message: response ? 'Written' : 'Write error!'
        })
      }
    } else {
      sendJson(res, { message: 'Card not valid' })
    }
  })
  /**
   * @api {get} /carIsCharging?id=123
   */
  app.get(prefix + '/carIsCharging', (res, req) => {
    const query = querystring.parse(req.getQuery())
    const id = parseInt(query.id)
    if (id >= 1 && id <= def.CARDS) {
      const stall = obj.stalls.find(stall => stall.status === id)
      if (stall === undefined) {
        sendJson(res, { message: 'Card not found' })
      } else {
        // plc.write
        sendJson(res, { stall })
      }
    } else {
      sendJson(res, { message: 'Card not valid' })
    }
  })
  /**
   * @api {get} /carIsParked?id=123
   */
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
  /**
   * @api {get} /map
   */
  app.get(prefix + '/map', (res, req) => {
    sendJson(res, obj.stalls)
  })
  /**
   * @api {post} /carExit/
   * @apiParam {Number} id
   */
  app.post(prefix + '/carExit', (res, req) => {
    readJson(
      res,
      async json => {
        const id = parseInt(json.id)
        if (id >= 1 && id <= def.CARDS) {
          const stall = obj.stalls.find(stall => stall.status === id)
          if (stall === undefined) {
            sendJson(res, { message: 'Card not found' })
          } else {
            const buffer = Buffer.allocUnsafe(2)
            buffer.writeUInt16BE(id, 0)
            // const response = await plc.write(def.REQ_0, buffer)
            const response = Boolean(1)
            sendJson(res, {
              message: response ? 'Written' : 'Write error!'
            })
          }
        } else {
          sendJson(res, { message: 'Card not valid' })
        }
      },
      () => {
        sendJson(res, {
          type: 'error',
          info: 'Invalid JSON!'
        })
      }
    )
  })
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
