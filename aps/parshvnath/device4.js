const { inputs, outputs } = require('./obj')
const { Device } = require('../../models/devices')
const { Position } = require('../../models/positions')

const device = new Device(4, 'SH1')

const LH1 = new Position(7, 'LH1')
const LH2 = new Position(8, 'LH2')
const ENR = new Position(9, 'ENR')
const positions = [LH1, LH2, ENR]

const lamps = [
  inputs.find(b => b.addr === 'E113.3'),
  outputs.find(b => b.addr === 'A113.7'),
  outputs.find(b => b.addr === 'A113.6')
]

const silomat = [
  inputs.find(b => b.addr === 'E112.0'),
  inputs.find(b => b.addr === 'E112.1'),
  inputs.find(b => b.addr === 'E112.2'),
  inputs.find(b => b.addr === 'E112.3'),
  inputs.find(b => b.addr === 'E112.4'),
  inputs.find(b => b.addr === 'E112.5'),
  inputs.find(b => b.addr === 'E112.6'),
  inputs.find(b => b.addr === 'E112.7'),
  outputs.find(b => b.addr === 'A112.1'),
  outputs.find(b => b.addr === 'A112.2'),
  outputs.find(b => b.addr === 'A112.3'),
  outputs.find(b => b.addr === 'A112.4'),
  outputs.find(b => b.addr === 'A112.5'),
  outputs.find(b => b.addr === 'A112.6')
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
