const def = require('./def')
const { alarms, inputs, merkers, outputs } = require('./obj')
const { Device } = require('../../models/devices')

const device = new Device(5, 'C')

const positions = []

const lamps = [
  inputs.find(b => b.addr === 'E7.3'),
  outputs.find(b => b.addr === 'A0.7'),
  outputs.find(b => b.addr === 'A0.6')
]

const A0 = {
  conn: def.REQ_3,
  enable: merkers.find(b => b.addr === 'M3.3'),
  key: 'action-entry'
}

const view = {
  a: device,
  b: positions,
  c: lamps,
  d: [A0],
  e: [],
  alarms: alarms[4]._active
}

const inverters = []

const motors = []

/**
 * Silomat
 */
const silomat = { motors: [] }

module.exports = { device, inverters, motors, positions, silomat, view }
