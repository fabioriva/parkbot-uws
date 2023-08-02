const { inputs, outputs } = require('./obj')
const { Device } = require('../../models/devices')
const { Position } = require('../../models/positions')

const device = new Device(3, 'ELA')

const LV1 = new Position(5, 'LV1')
const LV2 = new Position(6, 'LV2')
const LH1 = new Position(7, 'LH1')
const LH2 = new Position(8, 'LH2')
const positions = [LV1, LV2, LH1, LH2]

const lamps = [
  inputs.find(b => b.addr === 'E30.1'),
  outputs.find(b => b.addr === 'A30.5'),
  outputs.find(b => b.addr === 'A30.4')
]

const silomat = [
  inputs.find(b => b.addr === 'E36.0'),
  inputs.find(b => b.addr === 'E36.1'),
  inputs.find(b => b.addr === 'E36.2'),
  inputs.find(b => b.addr === 'E36.3'),
  inputs.find(b => b.addr === 'E36.4'),
  inputs.find(b => b.addr === 'E36.5'),
  inputs.find(b => b.addr === 'E36.6'),
  inputs.find(b => b.addr === 'E36.7'),
  outputs.find(b => b.addr === 'A35.1'),
  outputs.find(b => b.addr === 'A35.2'),
  outputs.find(b => b.addr === 'A35.3'),
  outputs.find(b => b.addr === 'A35.4'),
  outputs.find(b => b.addr === 'A35.5'),
  outputs.find(b => b.addr === 'A35.6')
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
