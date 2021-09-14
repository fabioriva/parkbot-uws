const { inputs, outputs } = require('./obj')
const { Device } = require('../../models/devices')

const device = new Device(3, 'E1')

const positions = []

const lamps = [
  inputs.find(b => b.addr === 'E101.3'),
  outputs.find(b => b.addr === 'A100.7'),
  outputs.find(b => b.addr === 'A100.6')
]

const silomat = []

const view = {
  a: device,
  b: positions,
  c: lamps,
  d: [],
  e: silomat
}

const inverters = []

const motors = []

module.exports = { device, inverters, motors, positions, view }
