const { inputs, outputs } = require('./obj')
const { Device } = require('../../models/devices')

const device = new Device(9, 'U3')

const positions = []

const lamps = [
  inputs.find(b => b.addr === 'E201.3'),
  outputs.find(b => b.addr === 'A201.7'),
  outputs.find(b => b.addr === 'A201.6')
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
