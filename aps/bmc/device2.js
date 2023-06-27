const { inputs, outputs } = require('./obj')
const { Device } = require('../../models/devices')
const { Position } = require('../../models/positions')

const device = new Device(2, 'EL2')

const LV1 = new Position(1, 'LV1')
const LV2 = new Position(2, 'LV2')
const LH1 = new Position(3, 'LH1')
const LH2 = new Position(4, 'LH2')
const positions = [LV1, LV2, LH1, LH2]

const lamps = [
  inputs.find(b => b.addr === 'E210.3'),
  outputs.find(b => b.addr === 'A210.0'),
  outputs.find(b => b.addr === 'A210.1')
]

const silomat = [
  inputs.find(b => b.addr === 'E216.0'),
  inputs.find(b => b.addr === 'E216.1'),
  inputs.find(b => b.addr === 'E216.2'),
  inputs.find(b => b.addr === 'E216.3'),
  inputs.find(b => b.addr === 'E216.4'),
  inputs.find(b => b.addr === 'E216.5'),
  inputs.find(b => b.addr === 'E216.6'),
  inputs.find(b => b.addr === 'E216.7'),
  outputs.find(b => b.addr === 'A215.5'),
  outputs.find(b => b.addr === 'A215.6'),
  outputs.find(b => b.addr === 'A215.7'),
  outputs.find(b => b.addr === 'A216.1'),
  outputs.find(b => b.addr === 'A216.2'),
  outputs.find(b => b.addr === 'A216.3')
]

const view = {
  a: device,
  b: positions,
  c: lamps,
  d: [],
  e: silomat,
  alarms: []
}

const inverters = []

const motors = []

module.exports = { device, inverters, motors, positions, view }
