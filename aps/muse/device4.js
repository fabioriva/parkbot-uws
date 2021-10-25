const { alarms, inputs, outputs } = require('./obj')
const { Device } = require('../../models/devices')
const { Inverter } = require('../../models/inverters')
const { Position } = require('../../models/positions')
const { Silomat } = require('../../models/silomat')

const device = new Device(4, 'EL4')

const LV1 = new Position(13, 'LV1')
const LV2 = new Position(14, 'LV2')
const LH1 = new Position(15, 'LH1')
const LH2 = new Position(16, 'LH2')
const positions = [LV1, LV2, LH1, LH2]

const lamps = [
  inputs.find(b => b.addr === 'E401.3'),
  outputs.find(b => b.addr === 'A400.7'),
  outputs.find(b => b.addr === 'A400.6')
]

const RMV = inputs.find(b => b.addr === 'E412.0')
const RMH = inputs.find(b => b.addr === 'E412.1')
const RES = inputs.find(b => b.addr === 'E412.2')
const REH = inputs.find(b => b.addr === 'E412.3')
const RCV = inputs.find(b => b.addr === 'E412.4')
const REAV = inputs.find(b => b.addr === 'E412.5')
const REAH = inputs.find(b => b.addr === 'E412.6')
const RCH = inputs.find(b => b.addr === 'E412.7')
const T2 = outputs.find(b => b.addr === 'A411.1')
const TRA = outputs.find(b => b.addr === 'A411.2')
const TRB = outputs.find(b => b.addr === 'A411.3')
const KCS = outputs.find(b => b.addr === 'A411.4')
const KCV = outputs.find(b => b.addr === 'A411.5')
const KCH = outputs.find(b => b.addr === 'A411.6')

const view = {
  a: device,
  b: positions,
  c: lamps,
  d: [],
  e: [RMV, RMH, RES, REH, RCV, REAV, REAH, RCH, T2, TRA, TRB, KCS, KCV, KCH],
  alarms: alarms[3]._active
}

const EN1 = inputs.find(b => b.addr === 'E401.1')
const EN2 = inputs.find(b => b.addr === 'E413.0')

const IV1 = new Inverter(5, 'IV1', EN1)
const IV2 = new Inverter(6, 'IV2', EN2)

const inverters = [IV1, IV2]

const motors = []

/**
 * Silomat
 */
const silomat = new Silomat(
  1,
  'SIL1',
  [RMV, RMH, RES, REH, RCV, REAV, REAH, RCH],
  [T2, TRA, TRB, KCS, KCV, KCH],
  IV2
)

module.exports = { device, inverters, motors, positions, silomat, view }
