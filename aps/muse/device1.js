const def = require('./def')
const { alarms, inputs, merkers, outputs } = require('./obj')
const { Device } = require('../../models/devices')
const { Inverter } = require('../../models/inverters')
const { Position } = require('../../models/positions')

const device = new Device(1, 'EL1')

const LV1 = new Position(1, 'LV1')
const LV2 = new Position(2, 'LV2')
const ENH = new Position(3, 'ENC H')
const ENR = new Position(4, 'ENC R')
const positions = [LV1, LV2, ENH, ENR]

const lamps = [
  inputs.find(b => b.addr === 'E103.3'),
  outputs.find(b => b.addr === 'A103.7'),
  outputs.find(b => b.addr === 'A103.6')
]

const A0 = {
  conn: def.ROLLBACK_1,
  enable: merkers.find(b => b.addr === 'M3.0'),
  key: 'action-entry'
}

const view = {
  a: device,
  b: positions,
  c: lamps,
  d: [A0],
  e: [],
  alarms: alarms[0]._active
}

const EN1 = inputs.find(b => b.addr === 'E103.0')
const EN2 = inputs.find(b => b.addr === 'E103.1')

const IV1 = new Inverter(1, 'IV1', EN1)
const IV2 = new Inverter(2, 'IV2', EN2)

const inverters = [IV1, IV2]

const motors = []

/**
 * Silomat
 */
const silomat = { motors: [] }

module.exports = { device, inverters, motors, positions, silomat, view }
