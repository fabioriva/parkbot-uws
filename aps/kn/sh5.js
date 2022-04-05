const { alarms, inputs, outputs } = require('./obj')
const { Device } = require('../../models/devices')
const { Position } = require('../../models/positions')
const { Silomat } = require('../../models/silomat')

const device = new Device(5, 'SH5')

const LH = new Position(5, 'LH')
const positions = [LH]

const lamps = [
  inputs.find(b => b.addr === 'E59.3'),
  outputs.find(b => b.addr === 'A30.7'),
  outputs.find(b => b.addr === 'A30.6')
]

const RMV = inputs.find(b => b.addr === 'E58.0')
const RMH = inputs.find(b => b.addr === 'E58.1')
const RES = inputs.find(b => b.addr === 'E58.2')
const REH = inputs.find(b => b.addr === 'E58.3')
const RCVH = inputs.find(b => b.addr === 'E58.4')
const REAV = inputs.find(b => b.addr === 'E58.5')
const REAH = inputs.find(b => b.addr === 'E58.6')
const REP = inputs.find(b => b.addr === 'E58.7')
const T2 = outputs.find(b => b.addr === 'A32.1')
const TRA = outputs.find(b => b.addr === 'A32.2')
const TRB = outputs.find(b => b.addr === 'A32.3')
const KCS = outputs.find(b => b.addr === 'A32.4')
const KCV = outputs.find(b => b.addr === 'A32.5')
const KCH = outputs.find(b => b.addr === 'A32.6')

const view = {
  a: device,
  b: positions,
  c: lamps,
  d: [],
  e: [RMV, RMH, RES, REH, RCVH, REAV, REAH, REP, T2, TRA, TRB, KCS, KCV, KCH],
  alarms: alarms[7]._active
}

const inverters = []

const motors = []

/**
 * Silomat
 */
const silomat = new Silomat(
  5,
  'SIL5',
  [RMV, RMH, RES, REH, RCVH, REAV, REAH, REP],
  [T2, TRA, TRB, KCS, KCV, KCH]
  // [...LC]
)

module.exports = { device, inverters, motors, positions, silomat, view }
