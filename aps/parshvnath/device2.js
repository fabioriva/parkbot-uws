const { inputs, outputs } = require('./obj')
const { Device } = require('../../models/devices')
const { Position } = require('../../models/positions')

const device = new Device(2, 'EL2')

const LV1 = new Position(3, 'LV1')
const LV2 = new Position(4, 'LV2')

const positions = [LV1, LV2]

const lamps = [
  inputs.find(b => b.addr === 'E201.3'),
  outputs.find(b => b.addr === 'A201.6'),
  outputs.find(b => b.addr === 'A201.7')
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
