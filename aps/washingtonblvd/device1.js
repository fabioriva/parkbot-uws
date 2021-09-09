const { inputs, outputs } = require('./obj')
const { Device } = require('../../models/devices')
const { Inverter } = require('../../models/inverters')
const { Door, Flap, Lock, Hoisting, Rotation } = require('../../models/motors')
const { Position } = require('../../models/positions')

const device = new Device(1, 'EL1')

const LV = new Position(1, 'LV')
const ENR = new Position(2, 'ENR')
const positions = [LV, ENR]

const lamps = [
  inputs.find(b => b.addr === 'E103.3'),
  outputs.find(b => b.addr === 'A100.7'),
  outputs.find(b => b.addr === 'A100.6')
]

const view = {
  a: device,
  b: positions,
  c: lamps,
  d: [],
  e: []
}

const EN1 = inputs.find(b => b.addr === 'E104.3')
const IV1 = new Inverter(1, 'IV1', EN1)
const inverters = [IV1]

const FTXV = inputs.find(b => b.addr === 'E103.0')
const FTXH = inputs.find(b => b.addr === 'E103.1')
const FTC = inputs.find(b => b.addr === 'E102.1')
const LC = [FTXV, FTXH, FTC]

/**
 * Hoisting
 */
const FSBK = inputs.find(b => b.addr === 'E104.4')
const ASBK = inputs.find(b => b.addr === 'E104.5')
const RTA = inputs.find(b => b.addr === 'E104.6')
const SQA = outputs.find(b => b.addr === 'A102.2')
const SBK1 = outputs.find(b => b.addr === 'A100.2')
const SBK2 = outputs.find(b => b.addr === 'A103.5')

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
const AD = inputs.find(b => b.addr === 'E105.1')
const ASBK2 = inputs.find(b => b.addr === 'E104.1')
const TD = outputs.find(b => b.addr === 'A102.6')

const M2 = new Rotation(2, { key: 'mot-rotation' }, [AD, ASBK2], [TD], [ENR])

/**
 * Lock V
 */
const EOM = inputs.find(b => b.addr === 'E105.3')
const EZM = inputs.find(b => b.addr === 'E105.4')
const AMM = inputs.find(b => b.addr === 'E105.5')
const SMA = outputs.find(b => b.addr === 'A102.0')
const SMB = outputs.find(b => b.addr === 'A102.1')

const M3 = new Lock(
  3,
  { key: 'mot-lock', query: { nr: 'V' } },
  [EOM, EZM, AMM, ...LC],
  [SMA, SMB]
)

/**
 * Lock R
 */
const EOMD = inputs.find(b => b.addr === 'E108.0')
const EZMD = inputs.find(b => b.addr === 'E108.1')
const AMMD = inputs.find(b => b.addr === 'E108.2')
const SMAD = outputs.find(b => b.addr === 'A105.0')
const SMBD = outputs.find(b => b.addr === 'A105.1')

const M4 = new Lock(
  4,
  { key: 'mot-lock', query: { nr: 'R' } },
  [EOMD, EZMD, AMMD, ...LC],
  [SMAD, SMBD]
)

/**
 * Flap
 */
const ECA = inputs.find(b => b.addr === 'E102.4')
const ECB = inputs.find(b => b.addr === 'E102.5')
const AMC = inputs.find(b => b.addr === 'E102.6')
const SCA = outputs.find(b => b.addr === 'A102.4')
const SCB = outputs.find(b => b.addr === 'A102.5')

const M5 = new Flap(
  5,
  { key: 'mot-flap', query: { nr: 1 } },
  [ECA, ECB, AMC, ...LC],
  [SCA, SCB]
)

/**
 * Door E
 */
const EZE = inputs.find(b => b.addr === 'E106.0')
const EOE = inputs.find(b => b.addr === 'E106.1')
const FBE = inputs.find(b => b.addr === 'E106.2')
const APE = inputs.find(b => b.addr === 'E102.7')
const SZE = outputs.find(b => b.addr === 'A100.4')
const SOE = outputs.find(b => b.addr === 'A100.5')

const M6 = new Door(6, { key: 'mot-door' }, [EZE, EOE, FBE, APE], [SZE, SOE])

const motors = [M1, M2, M3, M4, M5, M6]

const silomat = { motors: [] }

module.exports = { device, inverters, motors, positions, silomat, view }
