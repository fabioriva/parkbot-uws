const { alarms, inputs, outputs } = require('./obj')
const { Device } = require('../../models/devices')

const device = new Device(1, 'EL')

const positions = []

const lamps = [
  inputs.find(b => b.addr === 'E7.3'),
  outputs.find(b => b.addr === 'A0.7'),
  outputs.find(b => b.addr === 'A0.6')
]

const view = {
  a: device,
  b: positions,
  c: lamps,
  d: [],
  e: [],
  alarms: alarms[0]._active
}

const inverters = []

const motors = []

/**
 * Silomat
 */
const silomat = { motors: [] }

module.exports = { device, inverters, motors, positions, silomat, view }
