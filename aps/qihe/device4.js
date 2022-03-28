const { REQ_2 } = require('./def')
const { inputs, merkers, outputs } = require('./obj')
const { Device } = require('../../models/devices')

const device = new Device(4, 'E2')

const positions = []

const lamps = [
  inputs.find(b => b.addr === 'E101.3'),
  outputs.find(b => b.addr === 'A101.7'),
  outputs.find(b => b.addr === 'A101.6')
]

const A0 = {
  conn: REQ_2,
  enable: merkers.find(b => b.addr === 'M3.2'),
  key: 'action-entry'
}

const view = {
  a: device,
  b: positions,
  c: lamps,
  d: [A0],
  e: []
}

const inverters = []

const motors = []

module.exports = { device, inverters, motors, positions, view }
