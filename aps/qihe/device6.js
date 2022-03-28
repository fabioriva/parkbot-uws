const { REQ_4 } = require('./def')
const { inputs, merkers, outputs } = require('./obj')
const { Device } = require('../../models/devices')

const device = new Device(6, 'E4')

const positions = []

const lamps = [
  inputs.find(b => b.addr === 'E201.3'),
  outputs.find(b => b.addr === 'A201.7'),
  outputs.find(b => b.addr === 'A201.6')
]

const A0 = {
  conn: REQ_4,
  enable: merkers.find(b => b.addr === 'M3.4'),
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
