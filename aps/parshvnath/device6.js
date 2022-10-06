const { inputs, outputs } = require('./obj')
const { Device } = require('../../models/devices')
const { Position } = require('../../models/positions')

const device = new Device(6, 'SH3')

const LH1 = new Position(13, 'LH1')
const LH2 = new Position(14, 'LH2')
const ENR = new Position(15, 'ENR')
const positions = [LH1, LH2, ENR]

const lamps = [
  inputs.find(b => b.addr === 'E313.3'),
  outputs.find(b => b.addr === 'A313.6'),
  outputs.find(b => b.addr === 'A313.7')
]

const silomat = [
  inputs.find(b => b.addr === 'E312.0'),
  inputs.find(b => b.addr === 'E312.1'),
  inputs.find(b => b.addr === 'E312.2'),
  inputs.find(b => b.addr === 'E312.3'),
  inputs.find(b => b.addr === 'E312.4'),
  inputs.find(b => b.addr === 'E312.5'),
  inputs.find(b => b.addr === 'E312.6'),
  inputs.find(b => b.addr === 'E312.7'),
  outputs.find(b => b.addr === 'A312.1'),
  outputs.find(b => b.addr === 'A312.2'),
  outputs.find(b => b.addr === 'A312.3'),
  outputs.find(b => b.addr === 'A312.4'),
  outputs.find(b => b.addr === 'A312.5'),
  outputs.find(b => b.addr === 'A312.6')
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
