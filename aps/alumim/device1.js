const { alarms, inputs, outputs, merkers } = require('./obj')
const { Device } = require('../../models/devices')
const { Inverter } = require('../../models/inverters')
const {
  Door,
  Flap,
  Lock,
  Hoisting,
  Rotation,
  Traveling
} = require('../../models/motors')
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

/**
 * Inverters
 */
const EN1 = inputs.find(b => b.addr === 'E8.3')
const EN2 = inputs.find(b => b.addr === 'E8.5')

const IV1 = new Inverter(1, 'IV1', EN1)
const IV2 = new Inverter(2, 'IV2', EN2)

const inverters = [IV1, IV2]

/**
 * Motors
 */
const FTXV = inputs.find(b => b.addr === 'E16.0')
const FTXH = inputs.find(b => b.addr === 'E16.1')
const EM = inputs.find(b => b.addr === 'E16.3')
const LC = [EM, FTXV, FTXH]

/**
 * Hoisting
 */
const FKBA = inputs.find(b => b.addr === 'E8.0')
const RTA = inputs.find(b => b.addr === 'E8.6')
const ASBK = inputs.find(b => b.addr === 'E15.0')
const FSBK = inputs.find(b => b.addr === 'E15.1')
const KQA = outputs.find(b => b.addr === 'A4.0')
const SBK1 = outputs.find(b => b.addr === 'A15.7')
const SBK2 = outputs.find(b => b.addr === 'A14.7')

const M1 = new Hoisting(
  1,
  { key: 'mot-hoisting' },
  [FKBA, RTA, ASBK, FSBK],
  [KQA, SBK1, SBK2],
  [LV1, LV2],
  LC,
  IV1.speed
)

/**
 * Traveling
 */
const AH = inputs.find(b => b.addr === 'E8.6')
const ASH = inputs.find(b => b.addr === 'E9.3')
const AIV = inputs.find(b => b.addr === 'E9.4')
const EMC = inputs.find(b => b.addr === 'E17.1')
const MNR = inputs.find(b => b.addr === 'E17.6')
const MNL = inputs.find(b => b.addr === 'E17.7')
const TLIV = outputs.find(b => b.addr === 'A7.6')
const T10 = outputs.find(b => b.addr === 'A15.0')

const M2 = new Traveling(
  2,
  { key: 'mot-traveling' },
  [AH, ASH, AIV, EMC, MNR, MNL],
  [TLIV, T10],
  [ENH],
  LC
)

/**
 * Rotation
 */
const AD = inputs.find(b => b.addr === 'E16.7')
const ASBK2 = inputs.find(b => b.addr === 'E15.4')
const EXD = inputs.find(b => b.addr === 'E17.0')
const TD = outputs.find(b => b.addr === 'A14.0')

const M3 = new Rotation(
  3,
  { key: 'mot-rotation' },
  [AD, ASBK2, ASH, AIV, EXD],
  [TLIV, TD],
  [ENR],
  LC
)

/**
 * Lock 1/2/3/4
 */
const AMM = inputs.find(b => b.addr === 'E7.0')
const EOM1 = inputs.find(b => b.addr === 'E6.0')
const EZM1 = inputs.find(b => b.addr === 'E6.1')
const EOM2 = inputs.find(b => b.addr === 'E6.2')
const EZM2 = inputs.find(b => b.addr === 'E6.3')
const EOM3 = inputs.find(b => b.addr === 'E6.4')
const EZM3 = inputs.find(b => b.addr === 'E6.5')
const EOM4 = inputs.find(b => b.addr === 'E6.6')
const EZM4 = inputs.find(b => b.addr === 'E6.7')
const SMA1 = outputs.find(b => b.addr === 'A8.0')
const SMB1 = outputs.find(b => b.addr === 'A8.1')
const SMA2 = outputs.find(b => b.addr === 'A8.2')
const SMB2 = outputs.find(b => b.addr === 'A8.3')
const SMA3 = outputs.find(b => b.addr === 'A8.4')
const SMB3 = outputs.find(b => b.addr === 'A8.5')
const SMA4 = outputs.find(b => b.addr === 'A8.6')
const SMB4 = outputs.find(b => b.addr === 'A8.7')

const M4 = new Lock(
  4,
  { key: 'mot-lock', query: { nr: 1 } },
  [EOM1, EZM1, AMM],
  [SMA1, SMB1]
)

const M5 = new Lock(
  5,
  { key: 'mot-lock', query: { nr: 2 } },
  [EOM2, EZM2, AMM],
  [SMA2, SMB2]
)

const M6 = new Lock(
  6,
  { key: 'mot-lock', query: { nr: 3 } },
  [EOM3, EZM3, AMM],
  [SMA3, SMB3]
)

const M7 = new Lock(
  6,
  { key: 'mot-lock', query: { nr: 4 } },
  [EOM4, EZM4, AMM],
  [SMA4, SMB4]
)

/**
 * Flap
 */
const ECA = inputs.find(b => b.addr === 'E16.4')
const ECB = inputs.find(b => b.addr === 'E16.5')
const AMC = inputs.find(b => b.addr === 'E16.6')
const SCA = outputs.find(b => b.addr === 'A15.5')
const SCB = outputs.find(b => b.addr === 'A15.6')

const M8 = new Flap(
  8,
  { key: 'mot-flap', query: { nr: 1 } },
  [ECA, ECB, AMC],
  [SCA, SCB]
)

/**
 * Door E/U
 */
const EZE = inputs.find(b => b.addr === 'E10.0')
const EOE = inputs.find(b => b.addr === 'E10.1')
const FBE = inputs.find(b => b.addr === 'E10.2')
const APE = inputs.find(b => b.addr === 'E9.1')
const SZE = merkers.find(b => b.addr === 'M1.0')
const SOE = merkers.find(b => b.addr === 'M1.1')

const M9 = new Door(5, { key: 'mot-door-e' }, [EZE, EOE, FBE, APE], [SZE, SOE])

const motors = [M1, M2, M3, M4, M5, M6, M7, M8, M9]

/**
 * Silomat
 */
const silomat = new Silomat(
  1,
  'SIL1',
  [RMV, RMH, RES, REH, RCV, REAV, REAH, RCH],
  [T2, TRA, TRB, KCS, KCV, KCH],
  LC,
  IV1.speed
)

module.exports = { device, inverters, motors, positions, silomat, view }
