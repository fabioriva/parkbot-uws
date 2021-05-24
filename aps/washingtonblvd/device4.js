const { inputs, outputs } = require('./obj')
const { Device } = require('../../models/devices')
const { Position } = require('../../models/positions')

const device = new Device(4, 'T1')

const LV1 = new Position(1, 'LV1')
const LV2 = new Position(2, 'LV2')
const LH1 = new Position(3, 'LH1')
const LH2 = new Position(4, 'LH2')
const positions = [LV1, LV2, LH1, LH2]

const lamps = [
  inputs.find(b => b.addr === 'E401.3'),
  outputs.find(b => b.addr === 'A412.7'),
  outputs.find(b => b.addr === 'A412.6'),
  inputs.find(b => b.addr === 'E412.3')
]

const silomat = [
  inputs.find(b => b.addr === 'E412.0'),
  inputs.find(b => b.addr === 'E412.1'),
  inputs.find(b => b.addr === 'E412.2'),
  inputs.find(b => b.addr === 'E412.3'),
  inputs.find(b => b.addr === 'E412.4'),
  inputs.find(b => b.addr === 'E412.5'),
  inputs.find(b => b.addr === 'E412.6'),
  inputs.find(b => b.addr === 'E412.7'),
  outputs.find(b => b.addr === 'A401'),
  outputs.find(b => b.addr === 'A411.2'),
  outputs.find(b => b.addr === 'A411.3'),
  outputs.find(b => b.addr === 'A411.4'),
  outputs.find(b => b.addr === 'A411.5'),
  outputs.find(b => b.addr === 'A411.6')
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
