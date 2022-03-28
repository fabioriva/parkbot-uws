const { alarms, inputs, outputs } = require('./obj')
const { Device } = require('../../../models/devices')
const { Position } = require('../../../models/positions')
const { Silomat } = require('../../../models/silomat')

const device = new Device(3, 'SH3')

const LH = new Position(3, 'LH')
const positions = [LH]

const lamps = [
  inputs.find(b => b.addr === 'E49.3'),
  outputs.find(b => b.addr === 'A24.7'),
  outputs.find(b => b.addr === 'A24.6')
]

const RMV = inputs.find(b => b.addr === 'E48.0')
const RMH = inputs.find(b => b.addr === 'E48.1')
const RES = inputs.find(b => b.addr === 'E48.2')
const REH = inputs.find(b => b.addr === 'E48.3')
const RCVH = inputs.find(b => b.addr === 'E48.4')
const REAV = inputs.find(b => b.addr === 'E48.5')
const REAH = inputs.find(b => b.addr === 'E48.6')
const REP = inputs.find(b => b.addr === 'E48.7')
const T2 = outputs.find(b => b.addr === 'A26.1')
const TRA = outputs.find(b => b.addr === 'A26.2')
const TRB = outputs.find(b => b.addr === 'A26.3')
const KCS = outputs.find(b => b.addr === 'A26.4')
const KCV = outputs.find(b => b.addr === 'A26.5')
const KCH = outputs.find(b => b.addr === 'A26.6')

const view = {
  a: device,
  b: positions,
  c: lamps,
  d: [],
  e: [RMV, RMH, RES, REH, RCVH, REAV, REAH, REP, T2, TRA, TRB, KCS, KCV, KCH],
  alarms: alarms[3]._active
}

const inverters = []

const motors = []

/**
 * Silomat
 */
const silomat = new Silomat(
  3,
  'SIL3',
  [RMV, RMH, RES, REH, RCVH, REAV, REAH, REP],
  [T2, TRA, TRB, KCS, KCV, KCH]
  // [...LC]
)

module.exports = { device, inverters, motors, positions, silomat, view }
