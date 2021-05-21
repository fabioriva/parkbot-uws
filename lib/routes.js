const format = require('date-fns/format')
const querystring = require('querystring')
const { getHistory, getOperations, getRecentActivity } = require('./db')

function routes (app, db, def, obj, plc, options) {
  const { prefix } = options

  app.get(prefix + '/alarms', (res, req) => {
    const active = obj.alarms.map(item => item._active)
    sendJson(res, active)
  })

  app.get(prefix + '/cards', (res, req) => {
    sendJson(res, obj.cards)
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
    sendJson(res, {
      activity: activity,
      cards: obj.cards.length,
      occupancy: obj.map.occupancy,
      operations: statistics,
      system: obj.overview
    })
  })

  app.get(prefix + '/device/:id', (res, req) => {
    // sendJson(res, obj.diagnostic[req.getParameter(0)])
    const diagnostic = obj.diagnostic.map((item, key) => ({
      device: obj.overview.devices[key],
      inverters: item.inverters,
      motors: item.motors.map(m => m.json)
    }))
    sendJson(res, diagnostic[req.getParameter(0)])
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
    sendJson(res, obj.overview)
  })

  app.get(prefix + '/racks', (res, req) => {
    sendJson(res, obj.racks)
  })

  app.get(prefix + '/rack/:id', (res, req) => {
    sendJson(res, obj.racks[req.getParameter(0)])
  })

  app.get(prefix + '/stalls', (res, req) => {
    sendJson(res, obj.stalls)
  })

  app.get(prefix + '/statistics', async (res, req) => {
    res.onAborted(() => {
      res.aborted = true
    })
    /* Awaiting will yield and effectively return to C++, so you need to have called onAborted */
    const query = querystring.parse(req.getQuery())
    const docs = await getOperations(db, query)
    sendJson(res, docs)
  })

  app.post(prefix + '/card/edit', (res, req) => {
    readJson(
      res,
      async json => {
        const { card, code } = json
        const regexp = /^[a-fA-F0-9]{3}$/ // new RegExp('^[a-fA-F0-9]{3}$')
        if (regexp.test(code)) {
          const buffer = Buffer.alloc(4)
          buffer.writeUInt16BE(card, 0)
          buffer.writeUInt16BE(parseInt(code, 16), 2) // string to hex
          const response = await plc.write(def.CARD_EDIT, buffer)
          sendJson(res, {
            type: response ? 'success' : 'error',
            info: response ? 'Written' : 'Write error!'
          })
        } else {
          sendJson(res, {
            type: 'warning',
            info: 'code regexp is not valid!'
          })
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

  app.post(prefix + '/map/edit', (res, req) => {
    readJson(
      res,
      async json => {
        const { card, stall } = json
        if (card >= 1 && card <= def.cards) {
          if (obj.stalls.find(stall => stall.status === card)) {
            sendJson(res, {
              type: 'warning',
              info: 'card in use!'
            })
          }
        }
        const buffer = Buffer.alloc(4)
        buffer.writeUInt16BE(stall, 0)
        buffer.writeUInt16BE(card, 2)
        const response = await plc.write(def.MAP_EDIT, buffer)
        sendJson(res, {
          type: response ? 'success' : 'error',
          info: response ? 'Written' : 'Write error!'
        })
      },
      () => {
        sendJson(res, {
          type: 'error',
          info: 'Invalid JSON!'
        })
      }
    )
  })

  app.post(prefix + '/system/operation', (res, req) => {
    readJson(
      res,
      async json => {
        const { operation, value } = json
        if (value < 1 || value > def.CARDS) {
          sendJson(res, {
            type: 'warning',
            info: 'card out of range'
          })
        }
        console.log('??????????????????')
        const card = obj.stalls.find(stall => stall.status === value)
        if (operation === 0 && card === undefined) {
          sendJson(res, {
            type: 'warning',
            info: 'card not present'
          })
        }
        console.log('!!!!!!!!!!!!!!!!!!!!')
        if (operation !== 0 && card) {
          sendJson(res, {
            type: 'warning',
            info: 'card in use'
          })
        }
        const buffer = Buffer.allocUnsafe(2)
        buffer.writeUInt16BE(value, 0)
        const response = await plc.write(def.REQ_0, buffer)
        sendJson(res, {
          type: response ? 'success' : 'error',
          info: response ? 'Written' : 'Write error!'
        })
      },
      () => {
        sendJson(res, {
          type: 'error',
          info: 'Invalid JSON!'
        })
      }
    )
  })

  app.post(prefix + '/system/queue/delete', (res, req) => {
    readJson(
      res,
      async json => {
        const { card, index } = json
        const buffer = Buffer.alloc(def.QUEUE_DELETE.amount).fill(0)
        buffer.writeUInt16BE(index, 0)
        buffer.writeUInt16BE(card, 2)
        const response = await plc.write(def.QUEUE_DELETE, buffer)
        sendJson(res, {
          type: response ? 'success' : 'error',
          info: response ? 'Written' : 'Write error!'
        })
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

module.exports = routes
