const format = require('date-fns/format')
const querystring = require('querystring')
const { getHistory, getOperations, getRecentActivity } = require('./db')

function routes (app, db, def, obj, plc, options) {
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

  app.post(prefix + '/card/edit', (res, req) => {
    /* Note that you cannot read from req after returning from here */
    let url = req.getUrl()
    /* Read the body until done or error */
    readJson(
      res,
      async obj => {
        console.log('Posted to ' + url + ': ')
        console.log(obj)
        const { card, code } = obj
        const regexp = /^[a-fA-F0-9]{3}$/ // new RegExp('^[a-fA-F0-9]{3}$')
        if (regexp.test(code)) {
          const buffer = Buffer.alloc(4)
          buffer.writeUInt16BE(card, 0)
          buffer.writeUInt16BE(parseInt(code, 16), 2) // string to hex
          const response = await plc.write(def.CARD_EDIT, buffer)
          res.writeHeader('Content-Type', 'application/json')
          res.end(
            JSON.stringify({
              type: response ? 'success' : 'error',
              info: response ? 'Written' : 'Write error!'
            })
          )
        } else {
          res.writeHeader('Content-Type', 'application/json')
          res.end(
            JSON.stringify({
              type: 'warning',
              info: 'code regexp is not valid!'
            })
          )
        }
      },
      () => {
        /* Request was prematurely aborted or invalid or missing, stop reading */
        console.log('Invalid JSON or no data at all!')
        res.writeHeader('Content-Type', 'application/json')
        res.end(
          JSON.stringify({
            type: 'error',
            info: 'Invalid JSON!'
          })
        )
      }
    )
  })

  app.post(prefix + '/map/edit', (res, req) => {
    /* Note that you cannot read from req after returning from here */
    let url = req.getUrl()
    /* Read the body until done or error */
    readJson(
      res,
      async obj => {
        console.log('Posted to ' + url + ': ')
        console.log(obj)
        const { card, stall } = obj
        if (card >= 1 && card <= def.cards) {
          if (findCard(obj.stalls, card)) {
            res.writeHeader('Content-Type', 'application/json')
            res.end(
              JSON.stringify({
                type: 'warning',
                info: 'card in use!'
              })
            )
          }
        }
        const buffer = Buffer.alloc(4)
        buffer.writeUInt16BE(stall, 0)
        buffer.writeUInt16BE(card, 2)
        console.log(buffer)
        const response = await plc.write(def.MAP_EDIT, buffer)
        res.writeHeader('Content-Type', 'application/json')
        res.end(
          JSON.stringify({
            type: response ? 'success' : 'error',
            info: response ? 'Written' : 'Write error!'
          })
        )
      },
      () => {
        /* Request was prematurely aborted or invalid or missing, stop reading */
        console.log('Invalid JSON or no data at all!')
        res.writeHeader('Content-Type', 'application/json')
        res.end(
          JSON.stringify({
            type: 'error',
            info: 'Invalid JSON!'
          })
        )
      }
    )
  })

  app.post(prefix + '/system/operation', (res, req) => {
    /* Note that you cannot read from req after returning from here */
    let url = req.getUrl()
    /* Read the body until done or error */
    readJson(
      res,
      async obj => {
        console.log('Posted to ' + url + ': ')
        console.log(obj)
        const { operation, value } = obj

        if (value < 1 || value > def.CARDS) {
          res.writeHeader('Content-Type', 'application/json')
          res.end(
            JSON.stringify({
              type: 'warning',
              info: 'card out of range'
            })
          )
        }
        const card = findCard(obj.stalls, value)
        if (operation === 0 && card === undefined) {
          res.writeHeader('Content-Type', 'application/json')
          res.end(
            JSON.stringify({
              type: 'warning',
              info: 'card not present!'
            })
          )
        }
        if (operation !== 0 && card) {
          res.writeHeader('Content-Type', 'application/json')
          res.end(
            JSON.stringify({
              type: 'warning',
              info: 'card in use!'
            })
          )
        }
        const buffer = Buffer.allocUnsafe(2)
        buffer.writeUInt16BE(value, 0)
        const response = await plc.write(def.REQ_0, buffer)
        res.writeHeader('Content-Type', 'application/json')
        res.end(
          JSON.stringify({
            type: response ? 'success' : 'error',
            info: response ? 'Written' : 'Write error!'
          })
        )
      },
      () => {
        /* Request was prematurely aborted or invalid or missing, stop reading */
        console.log('Invalid JSON or no data at all!')
        res.writeHeader('Content-Type', 'application/json')
        res.end(
          JSON.stringify({
            type: 'error',
            info: 'Invalid JSON!'
          })
        )
      }
    )
  })

  app.post(prefix + '/system/queue/delete', (res, req) => {
    /* Note that you cannot read from req after returning from here */
    let url = req.getUrl()
    /* Read the body until done or error */
    readJson(
      res,
      async obj => {
        console.log('Posted to ' + url + ': ')
        console.log(obj)
        const { card, index } = obj
        const buffer = Buffer.alloc(def.QUEUE_DELETE.amount).fill(0)
        buffer.writeUInt16BE(index, 0)
        buffer.writeUInt16BE(card, 2)
        const response = await plc.write(def.QUEUE_DELETE, buffer)
        res.end(
          JSON.stringify({
            type: response ? 'success' : 'error',
            info: response ? 'Written' : 'Write error!'
          })
        )
      },
      () => {
        /* Request was prematurely aborted or invalid or missing, stop reading */
        console.log('Invalid JSON or no data at all!')
        res.writeHeader('Content-Type', 'application/json')
        res.end(
          JSON.stringify({
            type: 'error',
            info: 'Invalid JSON!'
          })
        )
      }
    )
  })
}

const findCard = (stalls, card) => stalls.find(stall => stall.status === card)

function readJson (res, cb, err) {
  let buffer
  /* Register data cb */
  res.onData((ab, isLast) => {
    let chunk = Buffer.from(ab)
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

module.exports = routes
