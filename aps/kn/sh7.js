const { alarms, inputs, outputs } = require('./obj')
const { Device } = require('../../models/devices')
const { Position } = require('../../models/positions')
const { Silomat } = require('../../models/silomat')

const device = new Device(7, 'SH7')

const LH = new Position(7, 'LH')
const positions = [LH]

const lamps = [
  inputs.find(b => b.addr === 'E69.3'),
  outputs.find(b => b.addr === 'A36.7'),
  outputs.find(b => b.addr === 'A36.6')
]

const RMV = inputs.find(b => b.addr === 'E68.0')
const RMH = inputs.find(b => b.addr === 'E68.1')
const RES = inputs.find(b => b.addr === 'E68.2')
const REH = inputs.find(b => b.addr === 'E68.3')
const RCVH = inputs.find(b => b.addr === 'E68.4')
const REAV = inputs.find(b => b.addr === 'E68.5')
const REAH = inputs.find(b => b.addr === 'E68.6')
const REP = inputs.find(b => b.addr === 'E68.7')
const T2 = outputs.find(b => b.addr === 'A38.1')
const TRA = outputs.find(b => b.addr === 'A38.2')
const TRB = outputs.find(b => b.addr === 'A38.3')
const KCS = outputs.find(b => b.addr === 'A38.4')
const KCV = outputs.find(b => b.addr === 'A38.5')
const KCH = outputs.find(b => b.addr === 'A38.6')

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
  7,
  'SIL7',
  [RMV, RMH, RES, REH, RCVH, REAV, REAH, REP],
  [T2, TRA, TRB, KCS, KCV, KCH]
  // [...LC]
)

module.exports = { device, inverters, motors, positions, silomat, view }
