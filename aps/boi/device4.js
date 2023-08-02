const { inputs, outputs } = require('./obj')
const { Device } = require('../../models/devices')
const { Position } = require('../../models/positions')

const device = new Device(4, 'ELB')

const LV1 = new Position(9, 'LV1')
const LV2 = new Position(10, 'LV2')
const LH1 = new Position(11, 'LH1')
const LH2 = new Position(12, 'LH2')
const positions = [LV1, LV2, LH1, LH2]

const lamps = [
  inputs.find(b => b.addr === 'E60.1'),
  outputs.find(b => b.addr === 'A60.5'),
  outputs.find(b => b.addr === 'A60.4')
]

const silomat = [
  inputs.find(b => b.addr === 'E66.0'),
  inputs.find(b => b.addr === 'E66.1'),
  inputs.find(b => b.addr === 'E66.2'),
  inputs.find(b => b.addr === 'E66.3'),
  inputs.find(b => b.addr === 'E66.4'),
  inputs.find(b => b.addr === 'E66.5'),
  inputs.find(b => b.addr === 'E66.6'),
  inputs.find(b => b.addr === 'E66.7'),
  outputs.find(b => b.addr === 'A65.1'),
  outputs.find(b => b.addr === 'A65.2'),
  outputs.find(b => b.addr === 'A65.3'),
  outputs.find(b => b.addr === 'A65.4'),
  outputs.find(b => b.addr === 'A65.5'),
  outputs.find(b => b.addr === 'A65.6')
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
