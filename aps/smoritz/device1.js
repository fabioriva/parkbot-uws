const def = require('./def')
const { alarms, inputs, outputs, merkers } = require('./obj')
const { Device } = require('../../models/devices')
// const { Position } = require('../../models/positions')
const { Silomat } = require('../../models/silomat')

const device = new Device(1, 'EL')

const positions = []

const lamps = [
  inputs.find(b => b.addr === 'E7.3'),
  outputs.find(b => b.addr === 'A29.7'),
  outputs.find(b => b.addr === 'A29.6')
  // inputs.find(b => b.addr === 'E30.3')
]

const A0 = {
  conn: def.REQ_ENTRY,
  enable: merkers.find(b => b.addr === 'M3.1'),
  key: 'action-entry'
}

const RMV = inputs.find(b => b.addr === 'E30.0')
const RMH = inputs.find(b => b.addr === 'E30.1')
const RES = inputs.find(b => b.addr === 'E30.2')
const REH = inputs.find(b => b.addr === 'E30.3')
const RCV = inputs.find(b => b.addr === 'E30.4')
const REAV = inputs.find(b => b.addr === 'E30.5')
const REAH = inputs.find(b => b.addr === 'E30.6')
const RCH = inputs.find(b => b.addr === 'E30.7')
const T2 = outputs.find(b => b.addr === 'A28.1')
const TRA = outputs.find(b => b.addr === 'A28.2')
const TRB = outputs.find(b => b.addr === 'A28.3')
const KCS = outputs.find(b => b.addr === 'A28.4')
const KCV = outputs.find(b => b.addr === 'A28.5')
const KCH = outputs.find(b => b.addr === 'A28.6')

const view = {
  a: device,
  b: positions,
  c: lamps,
  d: [A0],
  e: [RMV, RMH, RES, REH, RCV, REAV, REAH, RCH, T2, TRA, TRB, KCS, KCV, KCH],
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
  [RMV, RMH, RES, REH, RCV, REAV, REAH, RCH],
  [T2, TRA, TRB, KCS, KCV, KCH]
  // [...LC]
)

module.exports = { device, inverters, motors, positions, silomat, view }
