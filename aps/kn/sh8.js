const { alarms, inputs, outputs } = require('./obj')
const { Device } = require('../../models/devices')
const { Position } = require('../../models/positions')
const { Silomat } = require('../../models/silomat')

const device = new Device(8, 'SH8')

const LH = new Position(8, 'LH')
const positions = [LH]

const lamps = [
  inputs.find(b => b.addr === 'E74.3'),
  outputs.find(b => b.addr === 'A39.7'),
  outputs.find(b => b.addr === 'A39.6')
]

const RMV = inputs.find(b => b.addr === 'E73.0')
const RMH = inputs.find(b => b.addr === 'E73.1')
const RES = inputs.find(b => b.addr === 'E73.2')
const REH = inputs.find(b => b.addr === 'E73.3')
const RCVH = inputs.find(b => b.addr === 'E73.4')
const REAV = inputs.find(b => b.addr === 'E73.5')
const REAH = inputs.find(b => b.addr === 'E73.6')
const REP = inputs.find(b => b.addr === 'E73.7')
const T2 = outputs.find(b => b.addr === 'A41.1')
const TRA = outputs.find(b => b.addr === 'A41.2')
const TRB = outputs.find(b => b.addr === 'A41.3')
const KCS = outputs.find(b => b.addr === 'A41.4')
const KCV = outputs.find(b => b.addr === 'A41.5')
const KCH = outputs.find(b => b.addr === 'A41.6')

const view = {
  a: device,
  b: positions,
  c: lamps,
  d: [],
  e: [RMV, RMH, RES, REH, RCVH, REAV, REAH, REP, T2, TRA, TRB, KCS, KCV, KCH],
  alarms: alarms[10]._active
}

const inverters = []

const motors = []

/**
 * Silomat
 */
const silomat = new Silomat(
  8,
  'SIL8',
  [RMV, RMH, RES, REH, RCVH, REAV, REAH, REP],
  [T2, TRA, TRB, KCS, KCV, KCH]
  // [...LC]
)

module.exports = { device, inverters, motors, positions, silomat, view }
