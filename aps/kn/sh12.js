const { alarms, inputs, outputs } = require('./obj')
const { Device } = require('../../models/devices')
const { Position } = require('../../models/positions')
const { Silomat } = require('../../models/silomat')

const device = new Device(12, 'SH12')

const LH = new Position(12, 'LH')
const positions = [LH]

const lamps = [
  inputs.find(b => b.addr === 'E94.3'),
  outputs.find(b => b.addr === 'A51.7'),
  outputs.find(b => b.addr === 'A51.6')
]

const RMV = inputs.find(b => b.addr === 'E93.0')
const RMH = inputs.find(b => b.addr === 'E93.1')
const RES = inputs.find(b => b.addr === 'E93.2')
const REH = inputs.find(b => b.addr === 'E93.3')
const RCVH = inputs.find(b => b.addr === 'E93.4')
const REAV = inputs.find(b => b.addr === 'E93.5')
const REAH = inputs.find(b => b.addr === 'E93.6')
const REP = inputs.find(b => b.addr === 'E93.7')
const T2 = outputs.find(b => b.addr === 'A53.1')
const TRA = outputs.find(b => b.addr === 'A53.2')
const TRB = outputs.find(b => b.addr === 'A53.3')
const KCS = outputs.find(b => b.addr === 'A53.4')
const KCV = outputs.find(b => b.addr === 'A53.5')
const KCH = outputs.find(b => b.addr === 'A53.6')

const view = {
  a: device,
  b: positions,
  c: lamps,
  d: [],
  e: [RMV, RMH, RES, REH, RCVH, REAV, REAH, REP, T2, TRA, TRB, KCS, KCV, KCH],
  alarms: alarms[14]._active
}

const inverters = []

const motors = []

/**
 * Silomat
 */
const silomat = new Silomat(
  12,
  'SIL12',
  [RMV, RMH, RES, REH, RCVH, REAV, REAH, REP],
  [T2, TRA, TRB, KCS, KCV, KCH]
  // [...LC]
)

module.exports = { device, inverters, motors, positions, silomat, view }
