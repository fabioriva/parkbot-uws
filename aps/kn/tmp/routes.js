const fetch = require('node-fetch')
const format = require('date-fns/format')
const logger = require('pino')()
const querystring = require('querystring')
const {
  getHistory,
  getHistoryLog,
  getOperations,
  getRecentActivity
} = require('../../lib/history')
const { readJson, sendJson } = require('../../lib/json')
const { getMailingList, deleteItem, insertItem } = require('../../lib/mailer')

// const FALSE = Buffer.alloc(1, 0, 'hex')
// const TRUE = Buffer.alloc(1, 1, 'hex')

function log (req) {
  logger.info({
    'user-agent': req.getHeader('user-agent'),
    method: req.getMethod(),
    url: req.getUrl()
  })
}

function routes (app, db, def, objLeft, plc01, objRight, plc02, options) {
  const { prefix } = options

  app.post(prefix + '/activate', (res, req) => {
    const authorization = req.getHeader('authorization')
    readJson(
      res,
      async json => {
        checkAuth(res, authorization, async (err, user) => {
          if (err) {
            console.log(err)
            res.writeStatus(err.statusCode.toString()).end(err.message)
          } else {
            const { code } = json

            const result = await db
              .collection('keys')
              .updateOne({ key: code, valid: true }, { $set: { valid: false } })
            if (result.matchedCount === 1) {
              // sendJson(res, new Message('success', code))
              const buffer = Buffer.alloc(1, 1, 'hex')
              let response
              response = await plc01.write(def.ACTIVATE, buffer)
              response = await plc02.write(def.ACTIVATE, buffer)
              console.log(result, response)
              sendJson(
                res,
                new Message(
                  response ? 'success' : 'error',
                  response ? 'Activated key' + code : 'Write error!'
                )
              )
            } else {
              sendJson(res, new Message('error', code))
            }
          }
        })
      },
      () => sendJson(res, new Message('error', 'Invalid JSON'))
    )
  })

  // app.get(prefix + '/alarms', (res, req) => {
  //   const active = objLeft.alarms.map(item => item._active)
  //   sendJson(res, active)
  // })

  // app.get(prefix + '/cards', (res, req) => {
  //   sendJson(res, objLeft.cards)
  // })

  app.get(prefix + '/cards', (res, req) => {
    log(req)
    const authorization = req.getHeader('authorization')
    checkAuth(res, authorization, async (err, user) => {
      if (err) {
        res.writeStatus(err.statusCode.toString()).end(err.message)
      } else {
        sendJson(res, objLeft.cards)
      }
    })
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
      // cards: objLeft.cards.length,
      occupancy: objLeft.map.occupancy,
      operations: statistics,
      left: objLeft.overview,
      right: objRight.overview
    })
  })

  app.get(prefix + '/device/:id', (res, req) => {
    // sendJson(res, objLeft.diagnostic[req.getParameter(0)])
    const diagnostic = objLeft.diagnostic.map((item, key) => ({
      device: objLeft.overview.devices[key],
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

  app.get(prefix + '/mailingList', async (res, req) => {
    res.onAborted(() => {
      res.aborted = true
    })
    const docs = await getMailingList(db)
    sendJson(res, docs)
  })

  app.post(prefix + '/mailingList/add', (res, req) => {
    readJson(
      res,
      async json => {
        // const { email, name } = json
        // console.log(email, name)
        const result = await insertItem(db, json)
        sendJson(res, result)
      },
      () => {
        sendJson(res, {
          type: 'error',
          info: 'Invalid JSON!'
        })
      }
    )
  })

  app.post(prefix + '/mailingList/remove', (res, req) => {
    readJson(
      res,
      async json => {
        console.log(json)
        const result = await deleteItem(db, json)
        sendJson(res, result)
      },
      () => {
        sendJson(res, {
          type: 'error',
          info: 'Invalid JSON!'
        })
      }
    )
  })

  app.get(prefix + '/map', (res, req) => {
    sendJson(res, objLeft.map)
  })

  app.get(prefix + '/overview', (res, req) => {
    sendJson(res, {
      left: objLeft.overview,
      right: objRight.overview
    })
  })

  app.get(prefix + '/racks', (res, req) => {
    sendJson(res, {
      left: objLeft.racks,
      right: objRight.racks
    })
  })

  // app.get(prefix + '/rack/:id', (res, req) => {
  //   const racks = [...objLeft.racks, ...objRight.racks]
  //   sendJson(res, racks[req.getParameter(0)])
  // })

  app.get(prefix + '/left/rack/:id', (res, req) => {
    sendJson(res, objLeft.racks[req.getParameter(0)])
  })

  app.get(prefix + '/right/rack/:id', (res, req) => {
    sendJson(res, objRight.racks[req.getParameter(0)])
  })

  // app.get(prefix + '/stalls', (res, req) => {
  //   sendJson(res, objLeft.stalls)
  // })

  app.get(prefix + '/statistics', async (res, req) => {
    res.onAborted(() => {
      res.aborted = true
    })
    /* Awaiting will yield and effectively return to C++, so you need to have called onAborted */
    const query = querystring.parse(req.getQuery())
    const docs = await getOperations(db, query)
    sendJson(res, docs)
  })

  // app.post(prefix + '/card/edit', (res, req) => {
  //   const authorization = req.getHeader('authorization')
  //   readJson(
  //     res,
  //     async json => {
  //       checkAuth(res, authorization, async (err, user) => {
  //         if (err) {
  //           console.log(err)
  //           res.writeStatus(err.statusCode.toString()).end(err.message)
  //         } else {
  //           const { card, code } = json
  //           if (card < 1 || card > def.CARDS) {
  //             return sendJson(res, new Message('warning', 'Card not valid'))
  //           }
  //           const regexp = /^[a-fA-F0-9]{3}$/
  //           if (regexp.test(code)) {
  //             const buffer = Buffer.alloc(4)
  //             buffer.writeUInt16BE(card, 0)
  //             buffer.writeUInt16BE(parseInt(code, 16), 2) // string to hex
  //             const response = await plc.write(def.CARD_EDIT, buffer)
  //             sendJson(
  //               res,
  //               new Message(
  //                 response ? 'success' : 'error',
  //                 response ? 'Updated card ' + card : 'Write error!'
  //               )
  //             )
  //           } else {
  //             sendJson(
  //               res,
  //               new Message('warning', 'PIN code regexp is not valid')
  //             )
  //           }
  //         }
  //       })
  //     },
  //     () => sendJson(res, new Message('error', 'Invalid JSON'))
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
              return sendJson(
                res,
                new Message('warning', 'Parameters not valid')
              )
            }
            if (stall < 1 || stall > def.STALLS) {
              return sendJson(res, new Message('warning', 'Stall not valid'))
            }
            const { FREE, LOCK } = def.STALL_STATUS
            if (
              card !== FREE &&
              card !== LOCK &&
              (card < 1 || card > def.CARDS)
            ) {
              return sendJson(res, new Message('warning', 'Card not valid'))
            }
            const found = objLeft.stalls.find(stall => stall.status === card)
            if (card !== FREE && card !== LOCK && found) {
              return sendJson(res, new Message('warning', 'Card in use'))
            }
            const buffer = Buffer.alloc(4)
            buffer.writeUInt16BE(stall, 0)
            // buffer.writeUInt16BE(card, 2)
            buffer.writeInt16BE(card, 2)
            const response = await plc01.write(def.MAP_EDIT, buffer)
            sendJson(
              res,
              new Message(
                response ? 'success' : 'error',
                response ? 'Updated stall ' + stall : 'Write error!'
              )
            )
          }
        })
      },
      () => sendJson(res, new Message('error', 'Invalid JSON'))
    )
  })

  app.post(prefix + '/system/operation', (res, req) => {
    const authorization = req.getHeader('authorization')
    readJson(
      res,
      async json => {
        checkAuth(res, authorization, async (err, user) => {
          if (err) {
            res.writeStatus(err.statusCode.toString()).end(err.message)
          } else {
            const card = parseInt(json.card)
            const id = parseInt(json.id)
            const side = json.side
            if (!Number.isInteger(card) || !Number.isInteger(id)) {
              return sendJson(
                res,
                new Message('warning', 'Parameters not valid')
              )
            }
            if (card < 1 || card > def.CARDS) {
              return sendJson(res, new Message('warning', 'Card not valid'))
            }
            const found = objLeft.stalls.find(stall => stall.status === card)
            if (id === 0 && found === undefined) {
              return sendJson(res, new Message('warning', 'Card not present'))
            }
            if (id !== 0 && found) {
              return sendJson(res, new Message('warning', 'Card in use'))
            }
            const buffer = Buffer.allocUnsafe(2)
            buffer.writeUInt16BE(card, 0)
            let response = Boolean(0)
            if (side === 'left') {
              if (id === 0 && def.REQ_0 !== undefined) {
                response = await plc01.write(def.REQ_0, buffer)
              }
              if (id === 1 && def.REQ_1 !== undefined) {
                response = await plc01.write(def.REQ_1, buffer)
              }
              if (id === 2 && def.REQ_2 !== undefined) {
                response = await plc01.write(def.REQ_2, buffer)
              }
              if (id === 3 && def.REQ_3 !== undefined) {
                response = await plc01.write(def.REQ_3, buffer)
              }
              sendJson(
                res,
                new Message(
                  response ? 'success' : 'error',
                  response ? 'Sent request for card ' + card : 'Write error!'
                )
              )
            } else if (side === 'right') {
              if (id === 0 && def.REQ_0 !== undefined) {
                response = await plc02.write(def.REQ_0, buffer)
              }
              if (id === 1 && def.REQ_1 !== undefined) {
                response = await plc02.write(def.REQ_1, buffer)
              }
              if (id === 2 && def.REQ_2 !== undefined) {
                response = await plc02.write(def.REQ_2, buffer)
              }
              if (id === 3 && def.REQ_3 !== undefined) {
                response = await plc02.write(def.REQ_3, buffer)
              }
              sendJson(
                res,
                new Message(
                  response ? 'success' : 'error',
                  response ? 'Sent request for card ' + card : 'Write error!'
                )
              )
            } else {
              sendJson(res, new Message('error', 'Invalid JSON'))
            }
          }
        })
      },
      () => sendJson(res, new Message('error', 'Invalid JSON'))
    )
  })

  app.post(prefix + '/system/queue/delete', (res, req) => {
    const authorization = req.getHeader('authorization')
    readJson(
      res,
      async json => {
        checkAuth(res, authorization, async (err, user) => {
          if (err) {
            res.writeStatus(err.statusCode.toString()).end(err.message)
          } else {
            const { card, index } = json
            console.log(card, typeof card, index, typeof index)
            const buffer = Buffer.alloc(def.QUEUE_DELETE.amount).fill(0)
            buffer.writeUInt16BE(index, 0)
            buffer.writeUInt16BE(card, 2)
            const response = await plc01.write(def.QUEUE_DELETE, buffer)
            sendJson(
              res,
              new Message(
                response ? 'success' : 'error',
                response ? 'Deleted card ' + card : 'Write error!'
              )
            )
          }
        })
      },
      () => sendJson(res, new Message('error', 'Invalid JSON'))
    )
  })

  // app.post(prefix + '/readArea', (res, req) => {
  //   console.log(req)
  //   readJson(
  //     res,
  //     async json => {
  //       const { conn } = json
  //       const response = await plc.read(conn)
  //       console.log('/readArea', json, response)
  //       sendJson(
  //         res,
  //         new Message(response ? 'success' : 'error', response || 'Read error!')
  //       )
  //     },
  //     () => sendJson(res, new Message('error', 'Invalid JSON'))
  //   )
  // })

  // app.post(prefix + '/writeArea', (res, req) => {
  //   readJson(
  //     res,
  //     async json => {
  //       const { conn, buffer } = json
  //       console.log(conn, typeof buffer, buffer)
  //       // const buffer_ = Buffer.allocUnsafe(2)
  //       // buffer_.writeUInt16BE(buffer, 0)
  //       // const buffer_ = Buffer.alloc(1, buffer, 'hex')
  //       // const buffer_ = Buffer.alloc(conn.amount, buffer, 'hex')
  //       const buffer_ = Buffer.from(buffer)
  //       console.log(typeof buffer_, buffer_)
  //       // const { area, dbNumber, start, amount, wordLen } = json
  //       // const response = await plc.write(0x84, s7def.DB_DATA, ((184 * 8) + 4), 1, 0x01, s7def.TRUE)
  //       const response = await plc.write(conn, buffer_)
  //       console.log('/writeArea', json, response)
  //       sendJson(
  //         res,
  //         new Message(
  //           response ? 'success' : 'error',
  //           response ? 'Written' : 'Write error!'
  //         )
  //       )
  //     },
  //     () => sendJson(res, new Message('error', 'Invalid JSON'))
  //   )
  // })
}

class Message {
  constructor (severity, message) {
    this.severity = severity
    this.message = message
  }
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
      // console.log('checkAuth', res)
      if (res.statusCode !== undefined) return cb(res) // TODO: refactor :-P
      console.log('checkAuth', res)
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