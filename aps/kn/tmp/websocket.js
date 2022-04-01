function websocket (app, obj, options) {
  const { prefix, side } = options

  // app.ws('/*', {
  //   /* Options */
  //   compression: options.compression,
  //   maxPayloadLength: options.maxPayloadLength,
  //   idleTimeout: options.idleTimeout,
  //   /* Handlers */
  //   open: ws => {
  //     console.log('A WebSocket connected!')
  //   },
  //   message: (ws, message, isBinary) => {
  //     /* Ok is false if backpressure was built up, wait for drain */
  //     let ok = ws.send(message, isBinary)
  //   },
  //   drain: ws => {
  //     console.log('WebSocket backpressure: ' + ws.getBufferedAmount())
  //   },
  //   close: (ws, code, message) => {
  //     console.log('WebSocket closed')
  //   }
  // })

  // app.ws(prefix + '/cards', {
  //   open: ws => {
  //     ws.subscribe('aps/cards')
  //   }
  // })

  // app.ws(prefix + '/diagnostic', {
  //   open: ws => {
  //     ws.subscribe('aps/diagnostic')
  //   }
  // })

  // app.ws(prefix + '/info', {
  //   open: ws => {
  //     ws.subscribe('aps/info')
  //   }
  // })

  app.ws(prefix + side + '/info', {
    open: ws => {
      ws.subscribe(side + '/info')
    }
  })

  app.ws(prefix + side + '/map', {
    open: ws => {
      ws.subscribe(side + 'aps/map')
    }
  })

  app.ws(prefix + side + '/overview', {
    open: ws => {
      ws.subscribe(side + '/overview')
    }
  })

  // app.ws(prefix + '/right/overview', {
  //   open: ws => {
  //     ws.subscribe('aps/overview')
  //   }
  // })

  // app.ws(prefix + '/racks', {
  //   open: ws => {
  //     ws.subscribe('aps/racks')
  //   }
  // })

  // obj.alarms.map((e, index) =>
  //   app.ws(prefix + '/alarms/' + index, {
  //     open: ws => {
  //       ws.subscribe('aps/alarms/' + index)
  //     }
  //   })
  // )

  obj.diagnostic.map((e, index) =>
    app.ws(prefix + '/diagnostic/' + index, {
      open: ws => {
        ws.subscribe('aps/diagnostic/' + index)
      }
    })
  )

  obj.racks.map((e, index) =>
    app.ws(prefix + side + '/racks/' + index, {
      open: ws => {
        ws.subscribe(side + '/racks/' + index)
      }
    })
  )
}

module.exports = websocket
