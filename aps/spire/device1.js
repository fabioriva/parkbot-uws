const { inputs, outputs } = require('./obj')
const { Device } = require('../../models/devices')
const { Inverter } = require('../../models/inverters')
const { Door, Flap, Lock, Hoisting, Rotation } = require('../../models/motors')
const { Position } = require('../../models/positions')
const { Silomat } = require('../../models/silomat')

const device = new Device(1, 'EVT1')

const LV = new Position(1, 'LV')
const ENR = new Position(2, 'ENR')
const positions = [LV, ENR]

const lamps = [
  inputs.find(b => b.addr === 'E103.3'),
  outputs.find(b => b.addr === 'A100.7'),
  outputs.find(b => b.addr === 'A100.6'),
  inputs.find(b => b.addr === 'E112.3')
]

const L1 = outputs.find(b => b.addr === 'A101.0')
const L2 = outputs.find(b => b.addr === 'A101.1')
const L3 = outputs.find(b => b.addr === 'A101.2')
const L4 = outputs.find(b => b.addr === 'A101.3')
const L5 = outputs.find(b => b.addr === 'A101.4')

const FDL = inputs.find(b => b.addr === 'E106.4')
const FDR = inputs.find(b => b.addr === 'E106.5')
const FLA = inputs.find(b => b.addr === 'E107.2')
const FLP = inputs.find(b => b.addr === 'E107.0')
const FPE = inputs.find(b => b.addr === 'E106.3')
const FRE = inputs.find(b => b.addr === 'E110.6')
const FT1 = inputs.find(b => b.addr === 'E106.6')
const FT2 = inputs.find(b => b.addr === 'E106.7')

const RMV = inputs.find(b => b.addr === 'E112.0')
const RMH = inputs.find(b => b.addr === 'E112.1')
const RES = inputs.find(b => b.addr === 'E112.2')
const REH = inputs.find(b => b.addr === 'E112.3')
const RCV = inputs.find(b => b.addr === 'E112.4')
const REAV = inputs.find(b => b.addr === 'E112.5')
const REAH = inputs.find(b => b.addr === 'E112.6')
const RCH = inputs.find(b => b.addr === 'E112.7')
const T2 = outputs.find(b => b.addr === 'A100.0')
const TRA = outputs.find(b => b.addr === 'A110.2')
const TRB = outputs.find(b => b.addr === 'A110.3')
const KCS = outputs.find(b => b.addr === 'A110.4')
const KCV = outputs.find(b => b.addr === 'A110.5')
const KCH = outputs.find(b => b.addr === 'A110.6')

const view = {
  a: device,
  b: positions,
  c: lamps,
  d: [],
  e: [RMV, RMH, RES, REH, RCV, REAV, REAH, RCH, T2, TRA, TRB, KCS, KCV, KCH],
  alarms: [],
  vg: {
    panel: [L1, L2, L3, L4, L5],
    sensors: [FPE, FRE, FLA, FLP, FDL, FDR, FT1, FT2]
  }
}

const EN1 = inputs.find(b => b.addr === 'E102.3')
const EN2 = inputs.find(b => b.addr === 'E102.0')

const IV1 = new Inverter(1, 'IV1', EN1)
const IV2 = new Inverter(2, 'IV2', EN2)

const inverters = [IV1, IV2]

const FTXV = inputs.find(b => b.addr === 'E111.6')
const FTXH = inputs.find(b => b.addr === 'E111.7')
const EM = inputs.find(b => b.addr === 'E111.0')
const LC = [EM, FTXV, FTXH]

/**
 * Hoisting
 */
const FSBK = inputs.find(b => b.addr === 'E102.4')
const ASBK = inputs.find(b => b.addr === 'E102.5')
const RTA = inputs.find(b => b.addr === 'E102.6')
const SQA = outputs.find(b => b.addr === 'A102.2')
const SBK1 = outputs.find(b => b.addr === 'A100.2')
const SBK2 = outputs.find(b => b.addr === 'A102.4')

const M1 = new Hoisting(
  1,
  { key: 'mot-hoisting' },
  [FSBK, ASBK, RTA],
  [SQA, SBK1, SBK2],
  [LV],
  LC
)

/**
 * Rotation
 */
const AKKM = inputs.find(b => b.addr === 'E101.5')
const ASBK2 = inputs.find(b => b.addr === 'E102.1')
const TD = outputs.find(b => b.addr === 'A102.6')

const M2 = new Rotation(
  2,
  { key: 'mot-rotation' },
  [AKKM, ASBK2],
  [TD],
  [ENR],
  LC
)

/**
 * Lock
 */
const EOM = inputs.find(b => b.addr === 'E110.3')
const EZM = inputs.find(b => b.addr === 'E110.4')
const AMM = inputs.find(b => b.addr === 'E110.5')
const SMA = outputs.find(b => b.addr === 'A111.0')
const SMB = outputs.find(b => b.addr === 'A111.1')

const M3 = new Lock(
  3,
  { key: 'mot-lock', query: { nr: 1 } },
  [EOM, EZM, AMM],
  [SMA, SMB]
)

/**
 * Flap
 */
const ECA = inputs.find(b => b.addr === 'E110.0')
const ECB = inputs.find(b => b.addr === 'E110.1')
const AMC = inputs.find(b => b.addr === 'E110.2')
const SCA = outputs.find(b => b.addr === 'A111.2')
const SCB = outputs.find(b => b.addr === 'A111.3')

const M4 = new Flap(
  4,
  { key: 'mot-flap', query: { nr: 1 } },
  [ECA, ECB, AMC],
  [SCA, SCB]
)

/**
 * Door E
 */
const EZE = inputs.find(b => b.addr === 'E106.0')
const EOE = inputs.find(b => b.addr === 'E106.1')
const FBE = inputs.find(b => b.addr === 'E106.2')
const APE = inputs.find(b => b.addr === 'E101.6')
const SZE = outputs.find(b => b.addr === 'A100.4')
const SOE = outputs.find(b => b.addr === 'A100.5')

const M5 = new Door(5, { key: 'mot-door-e' }, [EZE, EOE, FBE, APE], [SZE, SOE])

/**
 * Door U
 */
const EZA = inputs.find(b => b.addr === 'E101.0')
const EOA = inputs.find(b => b.addr === 'E101.1')
const FBA = inputs.find(b => b.addr === 'E101.2')
const APA = inputs.find(b => b.addr === 'E101.3')
const SZA = outputs.find(b => b.addr === 'A102.0')
const SOA = outputs.find(b => b.addr === 'A102.1')

const M6 = new Door(6, { key: 'mot-door-u' }, [EZA, EOA, FBA, APA], [SZA, SOA])

const motors = [M1, M2, M3, M4, M5, M6]

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
