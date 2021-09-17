const { alarms, inputs, outputs } = require('./obj')
const { Device } = require('../../models/devices')
const { Position } = require('../../models/positions')
const { Silomat } = require('../../models/silomat')

const device = new Device(1, 'T1')

const LV1 = new Position(1, 'LV1')
const LV2 = new Position(2, 'LV2')
const LH1 = new Position(3, 'LH1')
const LH2 = new Position(4, 'LH2')
const positions = [LV1, LV2, LH1, LH2]

const lamps = [
  inputs.find(b => b.addr === 'E23.3'),
  outputs.find(b => b.addr === 'A21.7'),
  outputs.find(b => b.addr === 'A21.6')
]

const RMV = inputs.find(b => b.addr === 'E22.0')
const RMH = inputs.find(b => b.addr === 'E22.1')
const RES = inputs.find(b => b.addr === 'E22.2')
const REH = inputs.find(b => b.addr === 'E22.3')
const RCV = inputs.find(b => b.addr === 'E22.4')
const REAV = inputs.find(b => b.addr === 'E22.5')
const REAH = inputs.find(b => b.addr === 'E22.6')
const RCH = inputs.find(b => b.addr === 'E22.7')
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
