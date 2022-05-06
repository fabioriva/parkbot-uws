const { alarms, inputs, outputs } = require('./obj')
const { Device } = require('../../models/devices')
const { Position } = require('../../models/positions')
const { Silomat } = require('../../models/silomat')

const device = new Device(2, 'T')

const LV = new Position(1, 'LV')
const LH = new Position(2, 'LH')
const positions = [LV, LH]

const lamps = [
  inputs.find(b => b.addr === 'E7.3'),
  outputs.find(b => b.addr === 'A0.7'),
  outputs.find(b => b.addr === 'A0.6')
]

const RMV = inputs.find(b => b.addr === 'E13.0')
const RMH = inputs.find(b => b.addr === 'E13.1')
const RES = inputs.find(b => b.addr === 'E13.2')
const REH = inputs.find(b => b.addr === 'E13.3')
const RCV = inputs.find(b => b.addr === 'E13.4')
const REAV = inputs.find(b => b.addr === 'E13.5')
const REAH = inputs.find(b => b.addr === 'E13.6')
const RCH = inputs.find(b => b.addr === 'E13.7')
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
  e: [RMV, RMH, RES, REH, RCV, REAV, REAH, RCH, T2, TRA, TRB, KCS, KCV, KCH],
  alarms: alarms[1]._active
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
