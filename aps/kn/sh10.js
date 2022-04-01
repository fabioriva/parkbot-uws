const { alarms, inputs, outputs } = require('./obj')
const { Device } = require('../../models/devices')
const { Position } = require('../../models/positions')
const { Silomat } = require('../../models/silomat')

const device = new Device(10, 'SH10')

const LH = new Position(10, 'LH')
const positions = [LH]

const lamps = [
  inputs.find(b => b.addr === 'E84.3'),
  outputs.find(b => b.addr === 'A45.7'),
  outputs.find(b => b.addr === 'A45.6')
]

const RMV = inputs.find(b => b.addr === 'E83.0')
const RMH = inputs.find(b => b.addr === 'E83.1')
const RES = inputs.find(b => b.addr === 'E83.2')
const REH = inputs.find(b => b.addr === 'E83.3')
const RCVH = inputs.find(b => b.addr === 'E83.4')
const REAV = inputs.find(b => b.addr === 'E83.5')
const REAH = inputs.find(b => b.addr === 'E83.6')
const REP = inputs.find(b => b.addr === 'E83.7')
const T2 = outputs.find(b => b.addr === 'A47.1')
const TRA = outputs.find(b => b.addr === 'A47.2')
const TRB = outputs.find(b => b.addr === 'A47.3')
const KCS = outputs.find(b => b.addr === 'A47.4')
const KCV = outputs.find(b => b.addr === 'A47.5')
const KCH = outputs.find(b => b.addr === 'A47.6')

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
  10,
  'SIL10',
  [RMV, RMH, RES, REH, RCVH, REAV, REAH, REP],
  [T2, TRA, TRB, KCS, KCV, KCH]
  // [...LC]
)

module.exports = { device, inverters, motors, positions, silomat, view }
