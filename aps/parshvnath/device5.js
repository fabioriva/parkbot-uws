const { inputs, outputs } = require('./obj')
const { Device } = require('../../models/devices')
const { Position } = require('../../models/positions')

const device = new Device(5, 'SH2')

const LH1 = new Position(10, 'LH1')
const LH2 = new Position(11, 'LH2')
const ENR = new Position(12, 'ENR')
const positions = [LH1, LH2, ENR]

const lamps = [
  inputs.find(b => b.addr === 'E213.3'),
  outputs.find(b => b.addr === 'A213.6'),
  outputs.find(b => b.addr === 'A213.7')
]

const silomat = [
  inputs.find(b => b.addr === 'E212.0'),
  inputs.find(b => b.addr === 'E212.1'),
  inputs.find(b => b.addr === 'E212.2'),
  inputs.find(b => b.addr === 'E212.3'),
  inputs.find(b => b.addr === 'E212.4'),
  inputs.find(b => b.addr === 'E212.5'),
  inputs.find(b => b.addr === 'E212.6'),
  inputs.find(b => b.addr === 'E212.7'),
  outputs.find(b => b.addr === 'A212.1'),
  outputs.find(b => b.addr === 'A212.2'),
  outputs.find(b => b.addr === 'A212.3'),
  outputs.find(b => b.addr === 'A212.4'),
  outputs.find(b => b.addr === 'A212.5'),
  outputs.find(b => b.addr === 'A212.6')
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
