const { inputs, outputs } = require('./obj')
const { Device } = require('../../models/devices')
const { Position } = require('../../models/positions')

const device = new Device(1, 'EL')

const LV1 = new Position(1, 'LV1')
const LV2 = new Position(2, 'LV2')
const LH = new Position(3, 'LH')
const positions = [LV1, LV2, LH]

const lamps = [
  inputs.find(b => b.addr === 'E1.3'),
  outputs.find(b => b.addr === 'A0.7'),
  outputs.find(b => b.addr === 'A0.6')
]

const silomat = [
  inputs.find(b => b.addr === 'E12.0'),
  inputs.find(b => b.addr === 'E12.1'),
  inputs.find(b => b.addr === 'E12.2'),
  inputs.find(b => b.addr === 'E12.3'),
  inputs.find(b => b.addr === 'E12.4'),
  inputs.find(b => b.addr === 'E12.5'),
  inputs.find(b => b.addr === 'E12.6'),
  inputs.find(b => b.addr === 'E12.7'),
  outputs.find(b => b.addr === 'A10.0'),
  outputs.find(b => b.addr === 'A9.2'),
  outputs.find(b => b.addr === 'A9.3'),
  outputs.find(b => b.addr === 'A9.4'),
  outputs.find(b => b.addr === 'A9.5'),
  outputs.find(b => b.addr === 'A9.6')
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
