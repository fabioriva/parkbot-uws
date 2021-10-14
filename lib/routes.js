const fetch = require('node-fetch')
const format = require('date-fns/format')
// const logger = require('pino')()
const querystring = require('querystring')
const {
  getHistory,
  getHistoryLog,
  getOperations,
  getRecentActivity
} = require('./db')
const { readJson, sendJson } = require('./json')

function routes (app, db, def, obj, plc, options) {
  const { prefix } = options

  // logger.info({
  //   'user-agent': req.getHeader('user-agent'),
  //   method: req.getMethod(),
  //   url: req.getUrl()
  // })

  app.get(prefix + '/ssr', (res, req) => {
    const authorization = req.getHeader('authorization')
    console.log(authorization)
    checkAuth(res, authorization, async (err, user) => {
      if (err) {
        console.log('Auth error:', err)
        res
          // .writeStatus('401')
          // .writeHeader('WWW-Authenticate', 'Bearer realm="ParkBot"')
          .writeStatus(err.statusCode.toString())
          .end(err.message)
      } else {
        // if (user.roles.includes('cards')) {
        sendJson(res, obj.cards)
        // } else {
        // res.writeStatus('403').end('Forbidden')
        // }
      }
    })
    // sendJson(res, obj.cards)
  })

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
      motors: item.motors.map(m => m.json),
      silomat: item.silomat.json
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
    sendJson(res, docs)
  })

  app.get(prefix + '/history/:id', async (res, req) => {
    res.onAborted(() => {
      res.aborted = true
    })
    const docs = await getHistoryLog(db, req.getParameter(0))
    sendJson(res, docs)
  })

  app.get(prefix + '/map', (res, req) => {
    sendJson(res, obj.map)
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
    const authorization = req.getHeader('authorization')
    console.log(authorization)
    readJson(
      res,
      async json => {
        console.log(json)

        checkAuth(res, authorization, async (err, user) => {
          if (err) {
            console.log(err)
            res.writeStatus(err.statusCode.toString()).end(err.message)
          } else {
            console.log(user)
            const { card, code } = json
            const regexp = /^[a-fA-F0-9]{3}$/
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
          }
        })

        // const { card, code } = json
        // const regexp = /^[a-fA-F0-9]{3}$/
        // if (regexp.test(code)) {
        //   const buffer = Buffer.alloc(4)
        //   buffer.writeUInt16BE(card, 0)
        //   buffer.writeUInt16BE(parseInt(code, 16), 2) // string to hex
        //   const response = await plc.write(def.CARD_EDIT, buffer)
        //   sendJson(res, {
        //     type: response ? 'success' : 'error',
        //     info: response ? 'Written' : 'Write error!'
        //   })
        // } else {
        //   sendJson(res, {
        //     type: 'warning',
        //     info: 'code regexp is not valid!'
        //   })
        // }
      },
      () => {
        sendJson(res, {
          type: 'error',
          info: 'Invalid JSON!'
        })
      }
    )
  })

  // app.post(prefix + '/map/edit', (res, req) => {
  //   // const authorization = req.getHeader('authorization')
  //   readJson(
  //     res,
  //     async json => {
  //       const { card, stall } = json
  //       if (card >= 1 && card <= def.cards) {
  //         if (obj.stalls.find(stall => stall.status === card)) {
  //           sendJson(res, {
  //             type: 'warning',
  //             info: 'card in use!'
  //           })
  //         }
  //       }
  //       const buffer = Buffer.alloc(4)
  //       buffer.writeUInt16BE(stall, 0)
  //       buffer.writeUInt16BE(card, 2)
  //       const response = await plc.write(def.MAP_EDIT, buffer)
  //       sendJson(res, {
  //         type: response ? 'success' : 'error',
  //         info: response ? 'Written' : 'Write error!'
  //       })
  //     },
  //     () => {
  //       sendJson(res, {
  //         type: 'error',
  //         info: 'Invalid JSON!'
  //       })
  //     }
  //   )
  // })

  app.post(prefix + '/map/edit', (res, req) => {
    const authorization = req.getHeader('authorization')
    readJson(
      res,
      async json => {
        checkAuth(res, authorization, async (err, user) => {
          if (err) {
            res.writeStatus(err.statusCode.toString()).end(err.message)
          } else {
            const card = parseInt(json.card)
            const stall = parseInt(json.stall)
            if (!Number.isInteger(card) || !Number.isInteger(stall)) {
              sendJson(res, {
                type: 'warning',
                info: 'Parameters not valid'
              })
              return
            }
            const { FREE, LOCK } = def.STALL_STATUS
            if (
              card !== FREE &&
              card !== LOCK &&
              (card < 1 || card > def.CARDS)
            ) {
              sendJson(res, {
                type: 'warning',
                info: 'card out of range'
              })
              return
            }
            const found = obj.stalls.find(stall => stall.status === card)
            if (card !== FREE && card !== LOCK && found) {
              sendJson(res, {
                type: 'warning',
                info: 'card in use!'
              })
              return
            }
            const buffer = Buffer.alloc(4)
            buffer.writeUInt16BE(stall, 0)
            buffer.writeUInt16BE(card, 2)
            const response = await plc.write(def.MAP_EDIT, buffer)
            sendJson(res, {
              type: response ? 'success' : 'error',
              info: response ? 'Written' : 'Write error!'
            })
          }
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
        const card = parseInt(json.card)
        const id = parseInt(json.id)
        console.log(typeof card, card, typeof id, id)
        if (!Number.isInteger(card) || !Number.isInteger(id)) {
          sendJson(res, {
            type: 'warning',
            info: 'Parameters not valid'
          })
          return
        }
        if (card < 1 || card > def.CARDS) {
          sendJson(res, {
            type: 'warning',
            info: 'card out of range'
          })
          return
        }
        const found = obj.stalls.find(stall => stall.status === card)
        if (id === 0 && found === undefined) {
          sendJson(res, {
            type: 'warning',
            info: 'card not present'
          })
          return
        }
        if (id !== 0 && found) {
          sendJson(res, {
            type: 'warning',
            info: 'card in use'
          })
          return
        }
        const buffer = Buffer.allocUnsafe(2)
        buffer.writeUInt16BE(card, 0)
        const response = await plc.write(def.REQ_0, buffer)
        console.log(buffer, response)
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

class HttpError {
  constructor (statusCode, error, message) {
    this.statusCode = statusCode
    this.error = error
    this.message = message
  }
}

async function checkAuth (res, authorization, cb) {
  if (!authorization) {
    cb(new HttpError(401, 'Unauthorized', 'Authorization header missing'))
  } else {
    res.onAborted(() => {
      res.aborted = true
    })
    try {
      const token = authorization.split(' ')[1]
      console.log(token)
      const response = await fetch(
        process.env.AUTH_PROVIDER.concat('/profile'),
        {
          method: 'POST',
          // credentials: 'include',
          headers: {
            Authorization: JSON.stringify({ token })
          }
        }
      )
      const res = await response.json()
      console.log('checkAuth', res)
      if (res.statusCode !== undefined) return cb(res) // TODO: refactor :-P
      cb(null, res)
    } catch (err) {
      console.log('Fetch error', err)
      cb(new HttpError(503, 'Service Unavailable', err.code))
    }
  }
}

// function httpError (statusCode, error, message) {
//   return { statusCode, error, message }
// }

module.exports = routes
