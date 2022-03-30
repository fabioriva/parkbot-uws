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
  outputs.find(b => b.addr === 'A1.2'),
  outputs.find(b => b.addr === 'A1.1')
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
  outputs.find(b => b.addr === 'A12.1'),
  outputs.find(b => b.addr === 'A11.2'),
  outputs.find(b => b.addr === 'A11.3'),
  outputs.find(b => b.addr === 'A11.4'),
  outputs.find(b => b.addr === 'A11.5'),
  outputs.find(b => b.addr === 'A11.6')
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
