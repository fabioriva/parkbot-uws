const { alarms, inputs, outputs } = require('./obj')
const { Device } = require('../../models/devices')
const { Position } = require('../../models/positions')
const { Silomat } = require('../../models/silomat')

const device = new Device(2, 'SH2')

const LH = new Position(2, 'LH')
const positions = [LH]

const lamps = [
  inputs.find(b => b.addr === 'E44.3'),
  outputs.find(b => b.addr === 'A21.7'),
  outputs.find(b => b.addr === 'A21.6')
]

const RMV = inputs.find(b => b.addr === 'E43.0')
const RMH = inputs.find(b => b.addr === 'E43.1')
const RES = inputs.find(b => b.addr === 'E43.2')
const REH = inputs.find(b => b.addr === 'E43.3')
const RCVH = inputs.find(b => b.addr === 'E43.4')
const REAV = inputs.find(b => b.addr === 'E43.5')
const REAH = inputs.find(b => b.addr === 'E43.6')
const REP = inputs.find(b => b.addr === 'E43.7')
const T2 = outputs.find(b => b.addr === 'A23.1')
const TRA = outputs.find(b => b.addr === 'A23.2')
const TRB = outputs.find(b => b.addr === 'A23.3')
const KCS = outputs.find(b => b.addr === 'A23.4')
const KCV = outputs.find(b => b.addr === 'A23.5')
const KCH = outputs.find(b => b.addr === 'A23.6')

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
