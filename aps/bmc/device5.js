const { inputs, outputs } = require('./obj')
const { Device } = require('../../models/devices')
const { Position } = require('../../models/positions')

const device = new Device(5, 'U1')

const ENR = new Position(1, 'ENR')
const positions = [ENR]

const lamps = [
  inputs.find(b => b.addr === 'E101.1'),
  outputs.find(b => b.addr === 'A101.0'),
  outputs.find(b => b.addr === 'A101.1')
]

const silomat = []

const view = {
  a: device,
  b: positions,
  c: lamps,
  d: [],
  e: silomat,
  alarms: []
}

const inverters = []

const motors = []

module.exports = { device, inverters, motors, positions, view }
