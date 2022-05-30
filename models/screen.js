const util = require('util')

class Screen {
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

const updateScreens = util.promisify(
  (start, buffer, offset, screens, callback) => {
    let byte = start
    const min = 0
    const max = buffer.length / offset
    for (let i = min; i < max; i++) {
      screens[i].update(buffer.slice(byte, byte + offset))
      byte += offset
    }
    callback(null, screens)
  }
)

module.exports = { Screen, updateScreens }
