const { inputs, outputs } = require('./obj')
const { Device } = require('../../models/devices')
const { Position } = require('../../models/positions')

const device = new Device(1, 'EL1')

const LV = new Position(1, 'LV')
const ENR = new Position(2, 'ENR')
const positions = [LV, ENR]

const lamps = [
  inputs.find(b => b.addr === 'E10.1'),
  outputs.find(b => b.addr === 'A10.5'),
  outputs.find(b => b.addr === 'A10.4')
]

const silomat = [
  inputs.find(b => b.addr === 'E21.0'),
  inputs.find(b => b.addr === 'E21.1'),
  inputs.find(b => b.addr === 'E21.2'),
  inputs.find(b => b.addr === 'E21.3'),
  inputs.find(b => b.addr === 'E21.4'),
  inputs.find(b => b.addr === 'E21.5'),
  inputs.find(b => b.addr === 'E21.6'),
  inputs.find(b => b.addr === 'E21.7'),
  outputs.find(b => b.addr === 'A17.0'),
  outputs.find(b => b.addr === 'A17.1'),
  outputs.find(b => b.addr === 'A17.2'),
  outputs.find(b => b.addr === 'A17.3'),
  outputs.find(b => b.addr === 'A17.4'),
  outputs.find(b => b.addr === 'A17.5')
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
