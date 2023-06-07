const { inputs, outputs } = require('./obj')
const { Device } = require('../../models/devices')
const { Position } = require('../../models/positions')

const device = new Device(3, 'EL')

const LV1 = new Position(1, 'LV1')
const LV2 = new Position(2, 'LV2')
const LH1 = new Position(3, 'LH1')
const LH2 = new Position(3, 'LH2')
const positions = [LV1, LV2, LH1, LH2]

const lamps = [
  inputs.find(b => b.addr === 'E1.3'),
  outputs.find(b => b.addr === 'A1.7'),
  outputs.find(b => b.addr === 'A1.6')
]

const silomat = [
  inputs.find(b => b.addr === 'E16.0'),
  inputs.find(b => b.addr === 'E16.1'),
  inputs.find(b => b.addr === 'E16.2'),
  inputs.find(b => b.addr === 'E16.3'),
  inputs.find(b => b.addr === 'E16.4'),
  inputs.find(b => b.addr === 'E16.5'),
  inputs.find(b => b.addr === 'E16.6'),
  inputs.find(b => b.addr === 'E16.7'),
  outputs.find(b => b.addr === 'A15.5'),
  outputs.find(b => b.addr === 'A15.6'),
  outputs.find(b => b.addr === 'A15.7'),
  outputs.find(b => b.addr === 'A16.1'),
  outputs.find(b => b.addr === 'A16.2'),
  outputs.find(b => b.addr === 'A16.3')
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
