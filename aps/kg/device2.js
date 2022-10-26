const { inputs, outputs } = require('./obj')
const { Device } = require('../../models/devices')
const { Position } = require('../../models/positions')

const device = new Device(2, 'EL2')

const LV1 = new Position(2, 'LV1')
const LV2 = new Position(3, 'LV2')
const LH1 = new Position(4, 'LH1')
const LH2 = new Position(5, 'LH2')
const positions = [LV1, LV2, LH1, LH2]

const lamps = [
  inputs.find(b => b.addr === 'E41.2'),
  outputs.find(b => b.addr === 'A40.7'),
  outputs.find(b => b.addr === 'A40.6')
]

const silomat = [
  inputs.find(b => b.addr === 'E52.0'),
  inputs.find(b => b.addr === 'E52.1'),
  inputs.find(b => b.addr === 'E52.2'),
  inputs.find(b => b.addr === 'E52.3'),
  inputs.find(b => b.addr === 'E52.4'),
  inputs.find(b => b.addr === 'E52.5'),
  inputs.find(b => b.addr === 'E52.6'),
  inputs.find(b => b.addr === 'E52.7'),
  outputs.find(b => b.addr === 'A51.1'),
  outputs.find(b => b.addr === 'A51.2'),
  outputs.find(b => b.addr === 'A51.3'),
  outputs.find(b => b.addr === 'A51.4'),
  outputs.find(b => b.addr === 'A51.5'),
  outputs.find(b => b.addr === 'A51.6')
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
