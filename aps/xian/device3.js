const { inputs, outputs } = require('./obj')
const { Device } = require('../../models/devices')
const { Position } = require('../../models/positions')

const device = new Device(3, 'T')

const LV1 = new Position(1, 'LV1')
const LH1 = new Position(2, 'LV2')
const ENR = new Position(3, 'ENR')
const ENC = new Position(4, 'ENC')
const positions = [LV1, LH1, ENR, ENC]

const lamps = [
  inputs.find(b => b.addr === 'E1.4'),
  outputs.find(b => b.addr === 'A1.7'),
  outputs.find(b => b.addr === 'A1.6')
]

// const silomat = [
//   inputs.find(b => b.addr === 'E116.0'),
//   inputs.find(b => b.addr === 'E116.1'),
//   inputs.find(b => b.addr === 'E116.2'),
//   inputs.find(b => b.addr === 'E116.3'),
//   inputs.find(b => b.addr === 'E116.4'),
//   inputs.find(b => b.addr === 'E116.5'),
//   inputs.find(b => b.addr === 'E116.6'),
//   inputs.find(b => b.addr === 'E116.7'),
//   outputs.find(b => b.addr === 'A115.5'),
//   outputs.find(b => b.addr === 'A115.6'),
//   outputs.find(b => b.addr === 'A115.7'),
//   outputs.find(b => b.addr === 'A116.1'),
//   outputs.find(b => b.addr === 'A116.2'),
//   outputs.find(b => b.addr === 'A116.3')
// ]

const view = {
  a: device,
  b: positions,
  c: lamps,
  d: [],
  e: [] // silomat
}

const inverters = []

const motors = []

module.exports = { device, inverters, motors, positions, view }
