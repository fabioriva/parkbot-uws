const util = require('util')

class Inverter {
  constructor (
    id,
    name,
    enable,
    status = 0,
    speed = 0,
    current = 0,
    load = 0,
    trip = 0
  ) {
    this.id = id
    this.name = name
    this.enable = enable
    this.status = status
    this.speed = speed
    this.current = current
    this.load = load
    this.trip = trip
  }

  update (buffer) {
    // this.status = (buffer.readInt16BE(0) >>> 0).toString(2)
    this.status = buffer.readInt16BE(0)
    this.speed = buffer.readInt16BE(2)
    this.current = buffer.readInt16BE(4)
    this.load = buffer.readInt16BE(6)
    this.trip = buffer.readInt16BE(8)
  }
}

const updateInverters = util.promisify(
  (start, buffer, offset, inverters, callback) => {
    let byte = start
    for (let i = 0; i < inverters.length; i++) {
      inverters[i].update(buffer.slice(byte, byte + offset))
      byte += offset
    }
    callback(null, inverters)
  }
)

module.exports = { updateInverters, Inverter }
