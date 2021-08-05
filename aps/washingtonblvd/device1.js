const { inputs, outputs } = require('./obj')
const { Device } = require('../../models/devices')
const { Inverter } = require('../../models/inverters')
const { Lock } = require('../../models/motors')
const { Position } = require('../../models/positions')

const device = new Device(1, 'EL1')

const LV = new Position(1, 'LV')
const ENR = new Position(2, 'ENR')
const positions = [LV, ENR]

const lamps = [
  inputs.find(b => b.addr === 'E103.3'),
  outputs.find(b => b.addr === 'A100.7'),
  outputs.find(b => b.addr === 'A100.6')
]

const silomat = []

const view = {
  a: device,
  b: positions,
  c: lamps,
  d: [],
  e: silomat
}

const EN1 = inputs.find(b => b.addr === 'E104.3')
const IV1 = new Inverter(1, 'IV1', EN1)
const inverters = [IV1]

const AMM = inputs.find(b => b.addr === 'E105.5')
const EOM = inputs.find(b => b.addr === 'E105.3')
const EZM = inputs.find(b => b.addr === 'E105.4')
const SMA = outputs.find(b => b.addr === 'A102.0')
const SMB = outputs.find(b => b.addr === 'A102.1')

const M2 = new Lock(1, '', [AMM, EOM, EZM], [SMA, SMB])

const motors = [M2]

module.exports = { device, inverters, motors, positions, view }
