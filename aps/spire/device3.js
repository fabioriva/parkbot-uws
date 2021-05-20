const { inputs, outputs } = require('./obj')
const { Device } = require('../../models/devices')
const { Inverter } = require('../../models/inverters')
const { Door, Flap, Lock, Hoisting, Rotation } = require('../../models/motors')
const { Position } = require('../../models/positions')

const device = new Device(3, 'EVT3')

const LV = new Position(5, 'LV')
const ENR = new Position(6, 'ENR')
const positions = [LV, ENR]

const lamps = [
  inputs.find(b => b.addr === 'E303.3'),
  outputs.find(b => b.addr === 'A300.7'),
  outputs.find(b => b.addr === 'A300.6'),
  inputs.find(b => b.addr === 'E312.3')
]

const silomat = [
  inputs.find(b => b.addr === 'E312.0'),
  inputs.find(b => b.addr === 'E312.1'),
  inputs.find(b => b.addr === 'E312.2'),
  inputs.find(b => b.addr === 'E312.3'),
  inputs.find(b => b.addr === 'E312.4'),
  inputs.find(b => b.addr === 'E312.5'),
  inputs.find(b => b.addr === 'E312.6'),
  inputs.find(b => b.addr === 'E312.7'),
  outputs.find(b => b.addr === 'A300.0'),
  outputs.find(b => b.addr === 'A310.2'),
  outputs.find(b => b.addr === 'A310.3'),
  outputs.find(b => b.addr === 'A310.4'),
  outputs.find(b => b.addr === 'A310.5'),
  outputs.find(b => b.addr === 'A310.6')
]

const view = {
  a: device,
  b: positions,
  c: lamps,
  d: [],
  e: silomat
}

const EN1 = inputs.find(b => b.addr === 'E302.3')
const EN2 = inputs.find(b => b.addr === 'E302.0')

const IV1 = new Inverter(1, 'IV1', EN1)
const IV2 = new Inverter(2, 'IV2', EN2)

const inverters = [IV1, IV2]

const FTXV = inputs.find(b => b.addr === 'E311.6')
const FTXH = inputs.find(b => b.addr === 'E311.7')
const EM = inputs.find(b => b.addr === 'E311.0')
const LC = [FTXV, FTXH, EM]

/**
 * Hoisting
 */
const FSBK = inputs.find(b => b.addr === 'E302.4')
const ASBK = inputs.find(b => b.addr === 'E302.5')
const RTA = inputs.find(b => b.addr === 'E302.6')
const SQA = outputs.find(b => b.addr === 'A302.2')
const SBK1 = outputs.find(b => b.addr === 'A300.2')
const SBK2 = outputs.find(b => b.addr === 'A302.4')

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
const AKKM = inputs.find(b => b.addr === 'E301.5')
const ASBK2 = inputs.find(b => b.addr === 'E302.1')
const TD = outputs.find(b => b.addr === 'A302.6')

const M2 = new Rotation(2, { key: 'mot-rotation' }, [AKKM, ASBK2], [TD], [ENR])

/**
 * Lock
 */
const EOM = inputs.find(b => b.addr === 'E310.3')
const EZM = inputs.find(b => b.addr === 'E310.4')
const AMM = inputs.find(b => b.addr === 'E310.5')
const SMA = outputs.find(b => b.addr === 'A311.0')
const SMB = outputs.find(b => b.addr === 'A311.1')

const M3 = new Lock(
  3,
  { key: 'mot-lock', query: { nr: 1 } },
  [EOM, EZM, AMM, ...LC],
  [SMA, SMB]
)

/**
 * Flap
 */
const ECA = inputs.find(b => b.addr === 'E310.0')
const ECB = inputs.find(b => b.addr === 'E310.1')
const AMC = inputs.find(b => b.addr === 'E310.2')
const SCA = outputs.find(b => b.addr === 'A311.2')
const SCB = outputs.find(b => b.addr === 'A311.3')

const M4 = new Flap(
  4,
  { key: 'mot-flap', query: { nr: 1 } },
  [ECA, ECB, AMC, ...LC],
  [SCA, SCB]
)

/**
 * Door E
 */
const EZE = inputs.find(b => b.addr === 'E306.0')
const EOE = inputs.find(b => b.addr === 'E306.1')
const SZE = outputs.find(b => b.addr === 'A300.4')
const SOE = outputs.find(b => b.addr === 'A300.5')
const APE = inputs.find(b => b.addr === 'E301.6')

const M5 = new Door(5, { key: 'mot-door-e' }, [EZE, EOE, APE], [SZE, SOE])

/**
 * Door U
 */
const EZA = inputs.find(b => b.addr === 'E301.0')
const EOA = inputs.find(b => b.addr === 'E301.1')
const SZA = outputs.find(b => b.addr === 'A302.0')
const SOA = outputs.find(b => b.addr === 'A302.1')
const APA = inputs.find(b => b.addr === 'E301.3')

const M6 = new Door(6, { key: 'mot-door-u' }, [EZA, EOA, APA], [SZA, SOA])

const motors = [M1, M2, M3, M4, M5, M6]

module.exports = { device, inverters, motors, positions, view }
