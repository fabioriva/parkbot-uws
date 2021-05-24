function websocket (app, obj, options) {
  const { prefix } = options

  app.ws('/*', {
    /* Options */
    compression: options.compression,
    maxPayloadLength: options.maxPayloadLength,
    idleTimeout: options.idleTimeout,
    /* Handlers */
    // open: ws => {
    //   console.log('A WebSocket connected!')
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

  const diagnostic = obj.diagnostic.map((e, index) =>
    app.ws(prefix + '/diagnostic/' + index, {
      open: ws => {
        ws.subscribe('aps/diagnostic/' + index)
      }
    })
  )

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

  const racks = obj.racks.map((e, index) =>
    app.ws(prefix + '/racks/' + index, {
      open: ws => {
        ws.subscribe('aps/racks/' + index)
      }
    })
  )
}

module.exports = websocket
