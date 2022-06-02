const util = require('util')

class ExitScreen {
  constructor (id, name, running = [], waiting = []) {
    this.id = id
    this.name = name
    this.running = running
    this.waiting = waiting
  }

  update (delivered, devices, queue) {
    this.running = []
    devices.forEach(item => {
      if (item.operation === 2) {
        this.running.push({
          garage: item.name,
          op: item.step === delivered ? 'exit-mesg-1' : 'exit-mesg-2',
          card: item.card
        })
      }
    })
    this.waiting = []
    queue.forEach(item => {
      if (item.card !== 0) {
        this.waiting.push({ id: item.id, card: item.card })
      }
    })
  }
}

class GarageScreen {
  constructor (id, name, L1 = false, L2 = false, L3 = false, L4 = false, L5 = false) {
    this.id = id
    this.name = name
    this.L1 = L1
    this.L2 = L2
    this.L3 = L3
    this.L4 = L4
    this.L5 = L5
  }

  update (buffer) {
    this.L1 = buffer.readInt16BE(0) !== 0
    this.L2 = buffer.readInt16BE(2) !== 0
    this.L3 = buffer.readInt16BE(4)
    this.L4 = buffer.readInt16BE(6) !== 0
    this.L5 = buffer.readInt16BE(8) !== 0
  }
}

const updateGarageScreens = util.promisify(
  (start, buffer, offset, screens, callback) => {
    let byte = start
    // const min = 0
    // const max = buffer.length / offset
    for (let i = 0; i < screens.length; i++) {
      screens[i].update(buffer.slice(byte, byte + offset))
      byte += offset
    }
    callback(null, screens)
  }
)

module.exports = { ExitScreen, GarageScreen, updateGarageScreens }
