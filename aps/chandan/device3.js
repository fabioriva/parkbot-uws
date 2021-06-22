const { inputs, outputs } = require('./obj')
const { Device } = require('../../models/devices')
const { Position } = require('../../models/positions')

const device = new Device(3, 'A')

const LV1 = new Position(1, 'LV1')
const LV2 = new Position(2, 'LV2')
const LH1 = new Position(3, 'LH1')
const LH2 = new Position(4, 'LH2')
const positions = [LV1, LV2, LH1, LH2]

const lamps = [
  inputs.find(b => b.addr === 'E31.0'),
  outputs.find(b => b.addr === 'A31.7'),
  outputs.find(b => b.addr === 'A31.6')
]

const silomat = [
  inputs.find(b => b.addr === 'E33.0'),
  inputs.find(b => b.addr === 'E33.1'),
  inputs.find(b => b.addr === 'E33.2'),
  inputs.find(b => b.addr === 'E33.3'),
  inputs.find(b => b.addr === 'E33.4'),
  inputs.find(b => b.addr === 'E33.5'),
  inputs.find(b => b.addr === 'E33.6'),
  inputs.find(b => b.addr === 'E33.7'),
  outputs.find(b => b.addr === 'A32.0'),
  outputs.find(b => b.addr === 'A32.1'),
  outputs.find(b => b.addr === 'A32.2'),
  outputs.find(b => b.addr === 'A32.3'),
  outputs.find(b => b.addr === 'A32.4'),
  outputs.find(b => b.addr === 'A32.5')
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
