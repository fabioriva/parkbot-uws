const { inputs, outputs } = require('./obj')
const { Device } = require('../../models/devices')
const { Position } = require('../../models/positions')

const device = new Device(2, 'EL2')

const LV1 = new Position(1, 'LV1')
const LV2 = new Position(2, 'LV2')
const positions = [LV1, LV2]

const lamps = [
  inputs.find(b => b.addr === 'E20.1'),
  outputs.find(b => b.addr === 'A20.5'),
  outputs.find(b => b.addr === 'A20.4')
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
