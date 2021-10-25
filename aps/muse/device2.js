const { alarms, inputs, outputs } = require('./obj')
const { Device } = require('../../models/devices')
const { Inverter } = require('../../models/inverters')
const { Position } = require('../../models/positions')

const device = new Device(2, 'EL2')

const LV1 = new Position(5, 'LV1')
const LV2 = new Position(6, 'LV2')
const ENH = new Position(7, 'ENC H')
const ENR = new Position(8, 'ENC R')
const positions = [LV1, LV2, ENH, ENR]

const lamps = [
  inputs.find(b => b.addr === 'E203.3'),
  outputs.find(b => b.addr === 'A203.7'),
  outputs.find(b => b.addr === 'A203.6')
]

const view = {
  a: device,
  b: positions,
  c: lamps,
  d: [],
  e: [],
  alarms: alarms[1]._active
}

const EN1 = inputs.find(b => b.addr === 'E203.0')
const EN2 = inputs.find(b => b.addr === 'E203.1')

const IV1 = new Inverter(3, 'IV1', EN1)
const IV2 = new Inverter(4, 'IV2', EN2)

const inverters = [IV1, IV2]

const motors = []

/**
 * Silomat
 */
const silomat = { motors: [] }

module.exports = { device, inverters, motors, positions, silomat, view }
