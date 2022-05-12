const { alarms, inputsSH, outputsSH } = require('./obj')
const { Device } = require('../../models/devices')
const { Position } = require('../../models/positions')
const { Silomat } = require('../../models/silomat')

const device = new Device(2, 'EL')

const LV1 = new Position(1, 'LV1')
const LV2 = new Position(2, 'LV2')
const ENH = new Position(3, 'ENH')
const positions = [LV1, LV2, ENH]

const lamps = [
  inputsSH.find(b => b.addr === 'E3.3'),
  outputsSH.find(b => b.addr === 'A4.7'),
  outputsSH.find(b => b.addr === 'A4.6'),
  inputsSH.find(b => b.addr === 'E2.3')
]

const RMV = inputsSH.find(b => b.addr === 'E2.0')
const RMH = inputsSH.find(b => b.addr === 'E2.1')
const RES = inputsSH.find(b => b.addr === 'E2.2')
const REH = inputsSH.find(b => b.addr === 'E2.3')
const RCV = inputsSH.find(b => b.addr === 'E2.4')
const REAV = inputsSH.find(b => b.addr === 'E2.5')
const REAH = inputsSH.find(b => b.addr === 'E2.6')
const RCH = inputsSH.find(b => b.addr === 'E2.7')
const T2 = outputsSH.find(b => b.addr === 'A1.1')
const TRA = outputsSH.find(b => b.addr === 'A1.2')
const TRB = outputsSH.find(b => b.addr === 'A1.3')
const KCS = outputsSH.find(b => b.addr === 'A1.4')
const KCV = outputsSH.find(b => b.addr === 'A1.5')
const KCH = outputsSH.find(b => b.addr === 'A1.6')

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
