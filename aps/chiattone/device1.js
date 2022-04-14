const { inputs, outputs } = require('./obj')
const { Device } = require('../../models/devices')
const { Position } = require('../../models/positions')

const device = new Device(1, 'SH1')

const LH1 = new Position(1, 'LH1')
const LH2 = new Position(2, 'LH2')
const positions = [LH1, LH2]

const lamps = [
  inputs.find(b => b.addr === 'E13.3'),
  outputs.find(b => b.addr === 'A11.7'),
  outputs.find(b => b.addr === 'A11.6')
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
  outputs.find(b => b.addr === 'A11.1'),
  outputs.find(b => b.addr === 'A11.2'),
  outputs.find(b => b.addr === 'A11.3'),
  outputs.find(b => b.addr === 'A10.2'),
  outputs.find(b => b.addr === 'A10.3'),
  outputs.find(b => b.addr === 'A10.4')
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
