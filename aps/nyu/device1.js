const { alarms, inputs, outputs } = require('./obj')
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
  outputs.find(b => b.addr === 'A100.7'),
  outputs.find(b => b.addr === 'A100.6')
]

const RMV = inputs.find(b => b.addr === 'E110.0')
const RMH = inputs.find(b => b.addr === 'E110.1')
const RES = inputs.find(b => b.addr === 'E110.2')
const REH = inputs.find(b => b.addr === 'E110.3')
const RCV = inputs.find(b => b.addr === 'E110.4')
const REAV = inputs.find(b => b.addr === 'E110.5')
const REAH = inputs.find(b => b.addr === 'E110.6')
const RCH = inputs.find(b => b.addr === 'E110.7')
const T2 = outputs.find(b => b.addr === 'A112.1')
const TRA = outputs.find(b => b.addr === 'A112.2')
const TRB = outputs.find(b => b.addr === 'A112.3')
const KCS = outputs.find(b => b.addr === 'A111.2')
const KCV = outputs.find(b => b.addr === 'A111.3')
const KCH = outputs.find(b => b.addr === 'A111.4')

const view = {
  a: device,
  b: positions,
  c: lamps,
  d: [],
  e: [RMV, RMH, RES, REH, RCV, REAV, REAH, RCH, T2, TRA, TRB, KCS, KCV, KCH],
  alarms: alarms[0]._active
}

const EN1 = inputs.find(b => b.addr === 'E104.3')
// const EN2 = inputs.find(b => b.addr === 'E103.1')

const IV1 = new Inverter(1, 'IV1', EN1)
// const IV2 = new Inverter(2, 'IV2', EN2)

const inverters = [IV1]

const motors = []

/**
 * Silomat
 */
const silomat = { motors: [] }

module.exports = { device, inverters, motors, positions, silomat, view }
