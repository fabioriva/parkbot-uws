const { inputs, outputs } = require('./obj')
const { Device } = require('../../models/devices')
const { Position } = require('../../models/positions')

const device = new Device(5, 'T2')

const LV1 = new Position(1, 'LV1')
const LV2 = new Position(2, 'LV2')
const LH1 = new Position(3, 'LH1')
const LH2 = new Position(4, 'LH2')
const positions = [LV1, LV2, LH1, LH2]

const lamps = [
  inputs.find(b => b.addr === 'E501.3'),
  outputs.find(b => b.addr === 'A512.7'),
  outputs.find(b => b.addr === 'A512.6'),
  inputs.find(b => b.addr === 'E512.3')
]

const silomat = [
  inputs.find(b => b.addr === 'E512.0'),
  inputs.find(b => b.addr === 'E512.1'),
  inputs.find(b => b.addr === 'E512.2'),
  inputs.find(b => b.addr === 'E512.3'),
  inputs.find(b => b.addr === 'E512.4'),
  inputs.find(b => b.addr === 'E512.5'),
  inputs.find(b => b.addr === 'E512.6'),
  inputs.find(b => b.addr === 'E512.7'),
  outputs.find(b => b.addr === 'A501'),
  outputs.find(b => b.addr === 'A511.2'),
  outputs.find(b => b.addr === 'A511.3'),
  outputs.find(b => b.addr === 'A511.4'),
  outputs.find(b => b.addr === 'A511.5'),
  outputs.find(b => b.addr === 'A511.6')
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
