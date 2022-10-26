const { inputs, outputs } = require('./obj')
const { Device } = require('../../models/devices')
const { Position } = require('../../models/positions')

const device = new Device(1, 'EL1')

const LV1 = new Position(1, 'LV')

const positions = [LV1]

const lamps = [
  inputs.find(b => b.addr === 'E11.2'),
  outputs.find(b => b.addr === 'A10.7'),
  outputs.find(b => b.addr === 'A10.6')
]

const silomat = [
]

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
