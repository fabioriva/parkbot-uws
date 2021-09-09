const { inputs, outputs } = require('./obj')
const { Device } = require('../../models/devices')
const { Inverter } = require('../../models/inverters')
const { Hoisting, Traveling } = require('../../models/motors')
const { Position } = require('../../models/positions')
const { Silomat } = require('../../models/silomat')

const device = new Device(6, 'T3')

const LV1 = new Position(1, 'LV1')
const LV2 = new Position(2, 'LV2')
const LH1 = new Position(3, 'LH1')
const LH2 = new Position(4, 'LH2')
const positions = [LV1, LV2, LH1, LH2]

const lamps = [
  inputs.find(b => b.addr === 'E601.3'),
  outputs.find(b => b.addr === 'A612.7'),
  outputs.find(b => b.addr === 'A612.6'),
  inputs.find(b => b.addr === 'E612.3')
]

const RMV = inputs.find(b => b.addr === 'E612.0')
const RMH = inputs.find(b => b.addr === 'E612.1')
const RES = inputs.find(b => b.addr === 'E612.2')
const REH = inputs.find(b => b.addr === 'E612.3')
const RCV = inputs.find(b => b.addr === 'E612.4')
const REAV = inputs.find(b => b.addr === 'E612.5')
const REAH = inputs.find(b => b.addr === 'E612.6')
const RCH = inputs.find(b => b.addr === 'E612.7')
const T2 = outputs.find(b => b.addr === 'A601.1')
const TRA = outputs.find(b => b.addr === 'A611.2')
const TRB = outputs.find(b => b.addr === 'A611.3')
const KCS = outputs.find(b => b.addr === 'A611.4')
const KCV = outputs.find(b => b.addr === 'A611.5')
const KCH = outputs.find(b => b.addr === 'A611.6')

const view = {
  a: device,
  b: positions,
  c: lamps,
  d: [],
  e: [RMV, RMH, RES, REH, RCV, REAV, REAH, RCH, T2, TRA, TRB, KCS, KCV, KCH],
  alarms: []
}

const EN1 = inputs.find(b => b.addr === 'E601.0')
const EN2 = inputs.find(b => b.addr === 'E601.1')

const IV1 = new Inverter(8, 'IV1', EN1)
const IV2 = new Inverter(9, 'IV2', EN2)

const inverters = [IV1, IV2]

const FTXV = inputs.find(b => b.addr === 'E611.6')
const FTXH = inputs.find(b => b.addr === 'E611.7')
const EM = inputs.find(b => b.addr === 'E611.0')
const LC = [FTXV, FTXH, EM]

const AKKP = inputs.find(b => b.addr === 'E601.7')
/**
 * Hoisting
 */
const FSBK = inputs.find(b => b.addr === 'E611.2')
const ASBK = inputs.find(b => b.addr === 'E611.3')
const RTA = inputs.find(b => b.addr === 'E601.6')
const SBK1 = outputs.find(b => b.addr === 'A611.0')
const SBK2 = outputs.find(b => b.addr === 'A612.0')

const M1 = new Hoisting(
  1,
  { key: 'mot-hoisting' },
  [FSBK, ASBK, RTA, AKKP, ...LC],
  [SBK1, SBK2],
  [LV1, LV2]
)

/**
 * Traveling
 */
const AH = inputs.find(b => b.addr === 'E601.5')
const T101 = outputs.find(b => b.addr === 'A601.0')
const T102 = outputs.find(b => b.addr === 'A601.3')
const T10F = outputs.find(b => b.addr === 'A601.2')

const M2 = new Traveling(
  2,
  { key: 'mot-traveling' },
  [AH, AKKP, ...LC],
  [T101, T102, T10F],
  [LH1, LH2]
)

const motors = [M1, M2]

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
