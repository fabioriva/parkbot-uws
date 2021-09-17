const { alarms, inputs, outputs } = require('./obj')
const { Device } = require('../../models/devices')
const { Position } = require('../../models/positions')
const { Silomat } = require('../../models/silomat')

const device = new Device(2, 'T2')

const LV1 = new Position(5, 'LV1')
const LV2 = new Position(6, 'LV2')
const LH1 = new Position(7, 'LH1')
const LH2 = new Position(8, 'LH2')
const positions = [LV1, LV2, LH1, LH2]

const lamps = [
  inputs.find(b => b.addr === 'E29.3'),
  outputs.find(b => b.addr === 'A27.7'),
  outputs.find(b => b.addr === 'A27.6')
]

const RMV = inputs.find(b => b.addr === 'E28.0')
const RMH = inputs.find(b => b.addr === 'E28.1')
const RES = inputs.find(b => b.addr === 'E28.2')
const REH = inputs.find(b => b.addr === 'E28.3')
const RCV = inputs.find(b => b.addr === 'E28.4')
const REAV = inputs.find(b => b.addr === 'E28.5')
const REAH = inputs.find(b => b.addr === 'E28.6')
const RCH = inputs.find(b => b.addr === 'E28.7')
const T2 = outputs.find(b => b.addr === 'A29.1')
const TRA = outputs.find(b => b.addr === 'A29.2')
const TRB = outputs.find(b => b.addr === 'A29.3')
const KCS = outputs.find(b => b.addr === 'A29.4')
const KCV = outputs.find(b => b.addr === 'A29.5')
const KCH = outputs.find(b => b.addr === 'A29.6')

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
  2,
  'SIL2',
  [RMV, RMH, RES, REH, RCV, REAV, REAH, RCH],
  [T2, TRA, TRB, KCS, KCV, KCH]
  // [...LC]
)

module.exports = { device, inverters, motors, positions, silomat, view }
