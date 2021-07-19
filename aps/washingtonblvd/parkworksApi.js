const querystring = require('querystring')
const { readJson, sendJson } = require('../../lib/json')

const ERR_0 = { id: 0, message: 'PLC write error' }
const ERR_1 = { id: 1, message: 'Card not found' }
const ERR_2 = { id: 2, message: 'Card id not valid' }

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
      sendJson(res, { message: 'Card number not valid' })
    }
  })
  /**
   * @api {get} /carIsCharging?id=123&status=1
   * @apiParam {Number} id
   * @apiParam {Number} status
   */
  app.get(prefix + '/carIsCharging', (res, req) => {
    const query = querystring.parse(req.getQuery())
    const id = parseInt(query.id)
    const status = parseInt(query.status)
    if (id >= 1 && id <= def.STALLS && (status === 0 || status === 1)) {
      const buffer = Buffer.alloc(4)
      buffer.writeUInt16BE(id, 0)
      buffer.writeUInt16BE(status, 2)
      // const response = await plc.write(def.REQ_0, buffer)
      const response = Boolean(1)
      sendJson(res, {
        message: response ? 'Written' : 'Write error!'
      })
    } else {
      sendJson(res, { message: 'Invalid parameters' })
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
   * @api {get} /exitIsEnabled/
   * @apiParam {Number} id
   * @apiParam {Number} slot
   */
  app.get(prefix + '/exitIsEnabled', (res, req) => {
    const query = querystring.parse(req.getQuery())
    const id = parseInt(query.id)
    const slot = parseInt(query.slot)
    if (id >= 1 && id <= def.CARDS) {
      const stall = obj.stalls.find(stall => stall.status === id)
      if (stall === undefined) {
        sendJson(res, sendError(ERR_1))
      } else {
        const buffer = Buffer.allocUnsafe(2)
        buffer.writeUInt16BE(id, 0)
        // const response = await plc.write(def.REQ_0, buffer)
        const response = Boolean(1)
        sendJson(
          res,
          response
            ? {
                id,
                slot,
                stall: stall.nr,
                busy: 0
              }
            : sendError(ERR_0)
        )
      }
    } else {
      sendJson(res, sendError(ERR_2))
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

function sendError (err) {
  return { error: err }
}
