const { inputs, outputs } = require('./obj')
const { Device } = require('../../models/devices')
const { Position } = require('../../models/positions')

const device = new Device(2, 'SH2')

const LH1 = new Position(3, 'LH1')
const LH2 = new Position(4, 'LH2')
const positions = [LH1, LH2]

const lamps = [
  inputs.find(b => b.addr === 'E23.3'),
  outputs.find(b => b.addr === 'A21.7'),
  outputs.find(b => b.addr === 'A21.6')
]

const silomat = [
  inputs.find(b => b.addr === 'E22.0'),
  inputs.find(b => b.addr === 'E22.1'),
  inputs.find(b => b.addr === 'E22.2'),
  inputs.find(b => b.addr === 'E22.3'),
  inputs.find(b => b.addr === 'E22.4'),
  inputs.find(b => b.addr === 'E22.5'),
  inputs.find(b => b.addr === 'E22.6'),
  inputs.find(b => b.addr === 'E22.7'),
  outputs.find(b => b.addr === 'A21.1'),
  outputs.find(b => b.addr === 'A21.2'),
  outputs.find(b => b.addr === 'A21.3'),
  outputs.find(b => b.addr === 'A20.2'),
  outputs.find(b => b.addr === 'A20.3'),
  outputs.find(b => b.addr === 'A20.4')
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
