const { alarms, inputs, outputs } = require('./obj')
const { Device } = require('../../models/devices')

const device = new Device(3, 'U')

const positions = []

const lamps = [
  inputs.find(b => b.addr === 'E7.3'),
  outputs.find(b => b.addr === 'A29.7'),
  outputs.find(b => b.addr === 'A7.6'),
  inputs.find(b => b.addr === 'E29.5') // FR
]

const view = {
  a: device,
  b: positions,
  c: lamps,
  d: [],
  e: [],
  alarms: alarms[2]._active
}

const inverters = []

const motors = []

/**
 * Silomat
 */
const silomat = { motors: [] }

module.exports = { device, inverters, motors, positions, silomat, view }
