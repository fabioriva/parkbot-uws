const { inputs, outputs } = require('./obj')
const { Device } = require('../../models/devices')
const { Position } = require('../../models/positions')

const device = new Device(6, 'T3')

const LV1 = new Position(1, 'LV1')
const LV2 = new Position(2, 'LV2')
const LH1 = new Position(3, 'LH1')
const LH2 = new Position(4, 'LH2')
const positions = [LV1, LV2, LH1, LH2]

const lamps = [
  inputs.find(b => b.addr === 'E601.3'),
  outputs.find(b => b.addr === 'A612.7'),
  outputs.find(b => b.addr === 'A612.6'),
  inputs.find(b => b.addr === 'E612.3')
]

const silomat = [
  inputs.find(b => b.addr === 'E612.0'),
  inputs.find(b => b.addr === 'E612.1'),
  inputs.find(b => b.addr === 'E612.2'),
  inputs.find(b => b.addr === 'E612.3'),
  inputs.find(b => b.addr === 'E612.4'),
  inputs.find(b => b.addr === 'E612.5'),
  inputs.find(b => b.addr === 'E612.6'),
  inputs.find(b => b.addr === 'E612.7'),
  outputs.find(b => b.addr === 'A601.1'),
  outputs.find(b => b.addr === 'A611.2'),
  outputs.find(b => b.addr === 'A611.3'),
  outputs.find(b => b.addr === 'A611.4'),
  outputs.find(b => b.addr === 'A611.5'),
  outputs.find(b => b.addr === 'A611.6')
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
