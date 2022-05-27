const { alarms, inputs, outputs } = require('./obj')
const { Device } = require('../../models/devices')

const device = new Device(2, 'EU2')

const positions = []

const lamps = [
  inputs.find(b => b.addr === 'E1.3'),
  outputs.find(b => b.addr === 'A1.7'),
  outputs.find(b => b.addr === 'A1.6')
//   inputs.find(b => b.addr === 'E6.3') // FPE
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
