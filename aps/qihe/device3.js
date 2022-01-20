const { inputs, outputs } = require('./obj')
const { Device } = require('../../models/devices')

const device = new Device(3, 'E1')

const positions = []

const lamps = [
  inputs.find(b => b.addr === 'E101.3'),
  outputs.find(b => b.addr === 'A101.7'),
  outputs.find(b => b.addr === 'A101.6')
]

const view = {
  a: device,
  b: positions,
  c: lamps,
  d: [],
  e: []
}

const inverters = []

const motors = []

module.exports = { device, inverters, motors, positions, view }
