const { inputs, outputs } = require('./obj')
const { Device } = require('../../models/devices')
const { Inverter } = require('../../models/inverters')
const { Lock, Hoisting, Traveling } = require('../../models/motors')
const { Position } = require('../../models/positions')
const { Silomat } = require('../../models/silomat')

const device = new Device(4, 'IVT4')

const LV1 = new Position(1, 'LV1')
const LV2 = new Position(2, 'LV2')
const LH1 = new Position(3, 'LH1')
const LH2 = new Position(4, 'LH2')
const positions = [LV1, LV2, LH1, LH2]

const lamps = [
  inputs.find(b => b.addr === 'E401.3'),
  outputs.find(b => b.addr === 'A400.7'),
  outputs.find(b => b.addr === 'A400.6'),
  inputs.find(b => b.addr === 'E412.3')
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
  alarms: []
}

const EN1 = inputs.find(b => b.addr === 'E401.1')
const EN2 = inputs.find(b => b.addr === 'E413.0')

const IV1 = new Inverter(1, 'IV1', EN1)
const IV2 = new Inverter(2, 'IV2', EN2)

const inverters = [IV1, IV2]

const FTXV = inputs.find(b => b.addr === 'E411.6')
const FTXH = inputs.find(b => b.addr === 'E411.7')
const EM = inputs.find(b => b.addr === 'E411.3')
const LC = [EM, FTXV, FTXH]

const EMC = inputs.find(b => b.addr === 'E405.5')

/**
 * Hoisting
 */
const FSBK = inputs.find(b => b.addr === 'E401.4')
const ASBK = inputs.find(b => b.addr === 'E401.5')
const RTA = inputs.find(b => b.addr === 'E401.6')
const SBK1 = outputs.find(b => b.addr === 'A400.0')
const SBK2 = outputs.find(b => b.addr === 'A400.0')

const M1 = new Hoisting(
  1,
  { key: 'mot-hoisting' },
  [FSBK, ASBK, RTA],
  [SBK1, SBK2],
  [LV1, LV2],
  LC
)

/**
 * Lock V
 */
const EOM = inputs.find(b => b.addr === 'E405.3')
const EZM = inputs.find(b => b.addr === 'E405.4')
const AMM = inputs.find(b => b.addr === 'E405.2')
const SMA = outputs.find(b => b.addr === 'A404.0')
const SMB = outputs.find(b => b.addr === 'A404.1')

const M2 = new Lock(
  2,
  { key: 'mot-lock', query: { nr: 1 } },
  [EOM, EZM, AMM],
  [SMA, SMB]
)

/**
 * Traveling
 */
const AH = inputs.find(b => b.addr === 'E414.6')
const T101 = outputs.find(b => b.addr === 'A411.0')
const T102 = outputs.find(b => b.addr === 'A412.4')
const T10F = outputs.find(b => b.addr === 'A412.5')

const M3 = new Traveling(
  3,
  { key: 'mot-traveling' },
  [AH, EMC],
  [T101, T102, T10F],
  [LH1, LH2],
  LC
)

const motors = [M1, M2, M3]

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
