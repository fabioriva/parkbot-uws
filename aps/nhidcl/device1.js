const { inputs, outputs } = require('./obj')
const { Device } = require('../../models/devices')
const { Position } = require('../../models/positions')

const device = new Device(1, 'EL1')

const LV1 = new Position(1, 'LV1')
const LV2 = new Position(2, 'LV2')
const LH1 = new Position(3, 'LH1')
const LH2 = new Position(4, 'LH2')
const positions = [LV1, LV2, LH1, LH2]

const lamps = [
  inputs.find(b => b.addr === 'E101.3'),
  outputs.find(b => b.addr === 'A100.7'),
  outputs.find(b => b.addr === 'A100.6')
]

const silomat = [
  inputs.find(b => b.addr === 'E122.0'),
  inputs.find(b => b.addr === 'E122.1'),
  inputs.find(b => b.addr === 'E122.2'),
  inputs.find(b => b.addr === 'E122.3'),
  inputs.find(b => b.addr === 'E122.4'),
  inputs.find(b => b.addr === 'E122.5'),
  inputs.find(b => b.addr === 'E122.6'),
  inputs.find(b => b.addr === 'E122.7'),
  outputs.find(b => b.addr === 'A121.2'),
  outputs.find(b => b.addr === 'A121.4'),
  outputs.find(b => b.addr === 'A121.5'),
  outputs.find(b => b.addr === 'A122.0'),
  outputs.find(b => b.addr === 'A122.1'),
  outputs.find(b => b.addr === 'A122.2')
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
