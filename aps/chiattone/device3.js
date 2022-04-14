const { inputs, outputs } = require('./obj')
const { Device } = require('../../models/devices')
const { Position } = require('../../models/positions')

const device = new Device(3, 'SH3')

const LH = new Position(5, 'LH')
const ENR = new Position(6, 'ENR')
const positions = [LH, ENR]

const lamps = [
  inputs.find(b => b.addr === 'E33.3'),
  outputs.find(b => b.addr === 'A31.7'),
  outputs.find(b => b.addr === 'A31.6')
]

const silomat = [
  inputs.find(b => b.addr === 'E32.0'),
  inputs.find(b => b.addr === 'E32.1'),
  inputs.find(b => b.addr === 'E32.2'),
  inputs.find(b => b.addr === 'E32.3'),
  inputs.find(b => b.addr === 'E32.4'),
  inputs.find(b => b.addr === 'E32.5'),
  inputs.find(b => b.addr === 'E32.6'),
  inputs.find(b => b.addr === 'E32.7'),
  outputs.find(b => b.addr === 'A31.1'),
  outputs.find(b => b.addr === 'A31.2'),
  outputs.find(b => b.addr === 'A31.3'),
  outputs.find(b => b.addr === 'A30.2'),
  outputs.find(b => b.addr === 'A30.3'),
  outputs.find(b => b.addr === 'A30.4')
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
