const { inputs, outputs } = require('./obj')
const { Device } = require('../../models/devices')
const { Position } = require('../../models/positions')

const device = new Device(1, 'EL')

const LV1 = new Position(1, 'LV1')
const LV2 = new Position(2, 'LV2')
const ENH = new Position(3, 'ENC H')
const ENR = new Position(3, 'ENC R')
const positions = [LV1, LV2, ENH, ENR]

const lamps = [
  inputs.find(b => b.addr === 'E7.3'),
  outputs.find(b => b.addr === 'A4.7'),
  outputs.find(b => b.addr === 'A4.6')
]

const silomat = [
  inputs.find(b => b.addr === 'E14.0'),
  inputs.find(b => b.addr === 'E14.1'),
  inputs.find(b => b.addr === 'E14.2'),
  inputs.find(b => b.addr === 'E14.3'),
  inputs.find(b => b.addr === 'E14.4'),
  inputs.find(b => b.addr === 'E14.5'),
  inputs.find(b => b.addr === 'E14.6'),
  inputs.find(b => b.addr === 'E14.7'),
  outputs.find(b => b.addr === 'A15.1'),
  outputs.find(b => b.addr === 'A15.2'),
  outputs.find(b => b.addr === 'A15.3'),
  outputs.find(b => b.addr === 'A14.4'),
  outputs.find(b => b.addr === 'A14.5'),
  outputs.find(b => b.addr === 'A14.6')
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
