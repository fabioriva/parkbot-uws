const { alarms, inputs, outputs } = require('./obj')
const { Device } = require('../../models/devices')
const { Position } = require('../../models/positions')
const { Silomat } = require('../../models/silomat')

const device = new Device(1, 'EL1')

const LV = new Position(1, 'LV')
const positions = [LV]

const lamps = [
  inputs.find(b => b.addr === 'E1.3'),
  outputs.find(b => b.addr === 'A1.7'),
  outputs.find(b => b.addr === 'A1.6')
]

const RMV = inputs.find(b => b.addr === 'E6.0')
const RMH = inputs.find(b => b.addr === 'E6.1')
const RES = inputs.find(b => b.addr === 'E6.2')
const REH = inputs.find(b => b.addr === 'E6.3')
const RCVH = inputs.find(b => b.addr === 'E6.4')
const REAV = inputs.find(b => b.addr === 'E6.5')
const REAH = inputs.find(b => b.addr === 'E6.6')
const REP = inputs.find(b => b.addr === 'E6.7')
const T2 = outputs.find(b => b.addr === 'A5.1')
const TRA = outputs.find(b => b.addr === 'A5.2')
const TRB = outputs.find(b => b.addr === 'A5.3')
const KCS = outputs.find(b => b.addr === 'A5.4')
const KCV = outputs.find(b => b.addr === 'A5.5')
const KCH = outputs.find(b => b.addr === 'A5.6')

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
  1,
  'SIL1',
  [RMV, RMH, RES, REH, RCVH, REAV, REAH, REP],
  [T2, TRA, TRB, KCS, KCV, KCH]
  // [...LC]
)

module.exports = { device, inverters, motors, positions, silomat, view }
