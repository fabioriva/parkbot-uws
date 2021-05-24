const { inputs, outputs } = require('./obj')
const { Device } = require('../../models/devices')
const { Position } = require('../../models/positions')

const device = new Device(2, 'EL2')

const LV = new Position(1, 'LV')
const ENR = new Position(2, 'ENR')
const positions = [LV, ENR]

const lamps = [
  inputs.find(b => b.addr === 'E203.3'),
  outputs.find(b => b.addr === 'A200.7'),
  outputs.find(b => b.addr === 'A200.6')
]

const silomat = []

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
