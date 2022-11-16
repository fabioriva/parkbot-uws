const { alarms, inputs, outputs } = require('./obj')
const { Device } = require('../../models/devices')
// const { Position } = require('../../models/positions')

const device = new Device(2, 'EL(L)')

const positions = []

const lamps = [
  inputs.find(b => b.addr === 'E7.3'),
  outputs.find(b => b.addr === 'A5.7'),
  outputs.find(b => b.addr === 'A8.6')
  // inputs.find(b => b.addr === 'E6.3') // ???
]

const view = {
  a: device,
  b: positions,
  c: lamps,
  d: [],
  e: [],
  alarms: alarms[1]._active
}

const inverters = []

const motors = []

const silomat = { motors: [] }

module.exports = { device, inverters, motors, positions, silomat, view }
