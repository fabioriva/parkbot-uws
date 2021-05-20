function websocket (app, options) {
  const { prefix } = options

  app.ws('/*', {
    /* Options */
    compression: options.compression,
    maxPayloadLength: options.maxPayloadLength,
    idleTimeout: options.idleTimeout,
    /* Handlers */
    // open: ws => {
    //   console.log('A WebSocket connected!')
    //   // ws.send(JSON.stringify(obj.cards))
    //   ws.subscribe('aps/cards')
    // },
    // message: (ws, message, isBinary) => {
    //   /* Ok is false if backpressure was built up, wait for drain */
    //   let ok = ws.send(message, isBinary)
    // },
    drain: ws => {
      console.log('WebSocket backpressure: ' + ws.getBufferedAmount())
    },
    close: (ws, code, message) => {
      console.log('WebSocket closed')
    }
  })

  app.ws(prefix + '/cards', {
    open: ws => {
      ws.subscribe('aps/cards')
    }
  })

  app.ws(prefix + '/diagnostic', {
    open: ws => {
      ws.subscribe('aps/diagnostic')
    }
  })

  app.ws(prefix + '/info', {
    open: ws => {
      ws.subscribe('aps/info')
    }
  })

  app.ws(prefix + '/map', {
    open: ws => {
      ws.subscribe('aps/map')
    }
  })

  app.ws(prefix + '/overview', {
    open: ws => {
      ws.subscribe('aps/overview')
    }
  })

  app.ws(prefix + '/racks', {
    open: ws => {
      ws.subscribe('aps/racks')
    }
  })
}

module.exports = websocket
