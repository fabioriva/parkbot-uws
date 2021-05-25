const { inputs, outputs } = require('./obj')
const { Device } = require('../../models/devices')
const { Inverter } = require('../../models/inverters')
const { Door, Flap, Lock, Hoisting, Rotation } = require('../../models/motors')
const { Position } = require('../../models/positions')

const device = new Device(2, 'EVT2')

const LV = new Position(3, 'LV')
const ENR = new Position(4, 'ENR')
const positions = [LV, ENR]

const lamps = [
  inputs.find(b => b.addr === 'E203.3'),
  outputs.find(b => b.addr === 'A200.7'),
  outputs.find(b => b.addr === 'A200.6'),
  inputs.find(b => b.addr === 'E212.3')
]

const silomat = [
  inputs.find(b => b.addr === 'E212.0'),
  inputs.find(b => b.addr === 'E212.1'),
  inputs.find(b => b.addr === 'E212.2'),
  inputs.find(b => b.addr === 'E212.3'),
  inputs.find(b => b.addr === 'E212.4'),
  inputs.find(b => b.addr === 'E212.5'),
  inputs.find(b => b.addr === 'E212.6'),
  inputs.find(b => b.addr === 'E212.7'),
  outputs.find(b => b.addr === 'A200.0'),
  outputs.find(b => b.addr === 'A210.2'),
  outputs.find(b => b.addr === 'A210.3'),
  outputs.find(b => b.addr === 'A210.4'),
  outputs.find(b => b.addr === 'A210.5'),
  outputs.find(b => b.addr === 'A210.6')
]

const view = {
  a: device,
  b: positions,
  c: lamps,
  d: [],
  e: silomat
}

const EN1 = inputs.find(b => b.addr === 'E202.3')
const EN2 = inputs.find(b => b.addr === 'E202.0')

const IV1 = new Inverter(1, 'IV1', EN1)
const IV2 = new Inverter(2, 'IV2', EN2)

const inverters = [IV1, IV2]

const FTXV = inputs.find(b => b.addr === 'E211.6')
const FTXH = inputs.find(b => b.addr === 'E211.7')
const EM = inputs.find(b => b.addr === 'E211.0')
const LC = [FTXV, FTXH, EM]

/**
 * Hoisting
 */
const FSBK = inputs.find(b => b.addr === 'E202.4')
const ASBK = inputs.find(b => b.addr === 'E202.5')
const RTA = inputs.find(b => b.addr === 'E202.6')
const SQA = outputs.find(b => b.addr === 'A202.2')
const SBK1 = outputs.find(b => b.addr === 'A200.2')
const SBK2 = outputs.find(b => b.addr === 'A202.4')

const M1 = new Hoisting(
  1,
  { key: 'mot-hoisting' },
  [FSBK, ASBK, RTA],
  [SQA, SBK1, SBK2],
  [LV]
)

/**
 * Rotation
 */
const AKKM = inputs.find(b => b.addr === 'E201.5')
const ASBK2 = inputs.find(b => b.addr === 'E202.1')
const TD = outputs.find(b => b.addr === 'A202.6')

const M2 = new Rotation(2, { key: 'mot-rotation' }, [AKKM, ASBK2], [TD], [ENR])

/**
 * Lock
 */
const EOM = inputs.find(b => b.addr === 'E210.3')
const EZM = inputs.find(b => b.addr === 'E210.4')
const AMM = inputs.find(b => b.addr === 'E210.5')
const SMA = outputs.find(b => b.addr === 'A211.0')
const SMB = outputs.find(b => b.addr === 'A211.1')

const M3 = new Lock(
  3,
  { key: 'mot-lock', query: { nr: 1 } },
  [EOM, EZM, AMM, ...LC],
  [SMA, SMB]
)

/**
 * Flap
 */
const ECA = inputs.find(b => b.addr === 'E210.0')
const ECB = inputs.find(b => b.addr === 'E210.1')
const AMC = inputs.find(b => b.addr === 'E210.2')
const SCA = outputs.find(b => b.addr === 'A211.2')
const SCB = outputs.find(b => b.addr === 'A211.3')

const M4 = new Flap(
  4,
  { key: 'mot-flap', query: { nr: 1 } },
  [ECA, ECB, AMC, ...LC],
  [SCA, SCB]
)

/**
 * Door E
 */
const EZE = inputs.find(b => b.addr === 'E206.0')
const EOE = inputs.find(b => b.addr === 'E206.1')
const FBE = inputs.find(b => b.addr === 'E206.2')
const APE = inputs.find(b => b.addr === 'E201.6')
const SZE = outputs.find(b => b.addr === 'A200.4')
const SOE = outputs.find(b => b.addr === 'A200.5')

const M5 = new Door(5, { key: 'mot-door-e' }, [EZE, EOE, FBE, APE], [SZE, SOE])

/**
 * Door U
 */
const EZA = inputs.find(b => b.addr === 'E201.0')
const EOA = inputs.find(b => b.addr === 'E201.1')
const FBA = inputs.find(b => b.addr === 'E201.2')
const APA = inputs.find(b => b.addr === 'E201.3')
const SZA = outputs.find(b => b.addr === 'A202.0')
const SOA = outputs.find(b => b.addr === 'A202.1')

const M6 = new Door(6, { key: 'mot-door-u' }, [EZA, EOA, FBA, APA], [SZA, SOA])

const motors = [M1, M2, M3, M4, M5, M6]

module.exports = { device, inverters, motors, positions, view }
