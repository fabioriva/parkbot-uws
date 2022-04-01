const { alarms, inputs, outputs } = require('./obj')
const { Device } = require('../../../models/devices')
const { Position } = require('../../../models/positions')
const { Silomat } = require('../../../models/silomat')

const device = new Device(2, 'EL2')

const LV = new Position(2, 'LV')
const positions = [LV]

const lamps = [
  inputs.find(b => b.addr === 'E13.3'),
  outputs.find(b => b.addr === 'A7.7'),
  outputs.find(b => b.addr === 'A7.6')
]

const RMV = inputs.find(b => b.addr === 'E18.0')
const RMH = inputs.find(b => b.addr === 'E18.1')
const RES = inputs.find(b => b.addr === 'E18.2')
const REH = inputs.find(b => b.addr === 'E18.3')
const RCVH = inputs.find(b => b.addr === 'E18.4')
const REAV = inputs.find(b => b.addr === 'E18.5')
const REAH = inputs.find(b => b.addr === 'E18.6')
const REP = inputs.find(b => b.addr === 'E18.7')
const T2 = outputs.find(b => b.addr === 'A11.1')
const TRA = outputs.find(b => b.addr === 'A11.2')
const TRB = outputs.find(b => b.addr === 'A11.3')
const KCS = outputs.find(b => b.addr === 'A11.4')
const KCV = outputs.find(b => b.addr === 'A11.5')
const KCH = outputs.find(b => b.addr === 'A11.6')

const view = {
  a: device,
  b: positions,
  c: lamps,
  d: [],
  e: [RMV, RMH, RES, REH, RCVH, REAV, REAH, REP, T2, TRA, TRB, KCS, KCV, KCH],
  alarms: alarms[0]._active
}

const inverters = []

const motors = []

/**
 * Silomat
 */
const silomat = new Silomat(
  2,
  'SIL2',
  [RMV, RMH, RES, REH, RCVH, REAV, REAH, REP],
  [T2, TRA, TRB, KCS, KCV, KCH]
  // [...LC]
)

module.exports = { device, inverters, motors, positions, silomat, view }
