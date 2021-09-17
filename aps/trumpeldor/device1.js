const { alarms, inputs, outputs } = require('./obj')
const { Device } = require('../../models/devices')
const { Position } = require('../../models/positions')
const { Silomat } = require('../../models/silomat')

const device = new Device(1, 'EL')

const LV1 = new Position(1, 'LV1')
const LV2 = new Position(2, 'LV2')
const ENH = new Position(3, 'ENC H')
const ENR = new Position(4, 'ENC R')
const positions = [LV1, LV2, ENH, ENR]

const lamps = [
  inputs.find(b => b.addr === 'E7.3'),
  outputs.find(b => b.addr === 'A4.7'),
  outputs.find(b => b.addr === 'A4.6')
]

const RMV = inputs.find(b => b.addr === 'E14.0')
const RMH = inputs.find(b => b.addr === 'E14.1')
const RES = inputs.find(b => b.addr === 'E14.2')
const REH = inputs.find(b => b.addr === 'E14.3')
const RCV = inputs.find(b => b.addr === 'E14.4')
const REAV = inputs.find(b => b.addr === 'E14.5')
const REAH = inputs.find(b => b.addr === 'E14.6')
const RCH = inputs.find(b => b.addr === 'E14.7')
const T2 = outputs.find(b => b.addr === 'A15.1')
const TRA = outputs.find(b => b.addr === 'A15.2')
const TRB = outputs.find(b => b.addr === 'A15.3')
const KCS = outputs.find(b => b.addr === 'A14.4')
const KCV = outputs.find(b => b.addr === 'A14.5')
const KCH = outputs.find(b => b.addr === 'A14.6')

const view = {
  a: device,
  b: positions,
  c: lamps,
  d: [],
  e: [RMV, RMH, RES, REH, RCV, REAV, REAH, RCH, T2, TRA, TRB, KCS, KCV, KCH],
  alarms: alarms[0]._active
}

const inverters = []

const motors = []

/**
 * Silomat
 */
const silomat = new Silomat(
  1,
  'SIL1',
  [RMV, RMH, RES, REH, RCV, REAV, REAH, RCH],
  [T2, TRA, TRB, KCS, KCV, KCH]
  // [...LC]
)

module.exports = { device, inverters, motors, positions, silomat, view }
