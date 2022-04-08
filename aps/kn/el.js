const { alarms, inputs, outputs } = require('./obj')
const { Device } = require('../../models/devices')
const { Inverter } = require('../../models/inverters')
const {
  // Door,
  // Flap,
  Lock,
  Hoisting
} = require('../../models/motors')
const { Position } = require('../../models/positions')
const { Silomat } = require('../../models/silomat')

let EB = 0
let AB = 0

const devices_ = []
const inverters_ = []
const motors_ = []
const positions_ = []
const silomats_ = []
const views_ = []
const diagnostic_ = []

for (let i = 1; i <= 3; i++) {
  const device = new Device(i, 'EL' + i)

  const LV = new Position(i, 'LV')
  const positions = [LV]

  const lamps = [
    inputs.find(b => b.addr === 'E' + (EB + 1).toString() + '.3'),
    outputs.find(b => b.addr === 'A' + (AB + 1).toString() + '.7'),
    outputs.find(b => b.addr === 'A' + (AB + 1).toString() + '.6')
  ]

  const RMV = inputs.find(b => b.addr === 'E' + (EB + 6).toString() + '.0')
  const RMH = inputs.find(b => b.addr === 'E' + (EB + 6).toString() + '.1')
  const RES = inputs.find(b => b.addr === 'E' + (EB + 6).toString() + '.2')
  const REH = inputs.find(b => b.addr === 'E' + (EB + 6).toString() + '.3')
  const RCVH = inputs.find(b => b.addr === 'E' + (EB + 6).toString() + '.4')
  const REAV = inputs.find(b => b.addr === 'E' + (EB + 6).toString() + '.5')
  const REAH = inputs.find(b => b.addr === 'E' + (EB + 6).toString() + '.6')
  const REP = inputs.find(b => b.addr === 'E' + (EB + 6).toString() + '.7')
  const T2 = outputs.find(b => b.addr === 'A' + (AB + 5).toString() + '.1')
  const TRA = outputs.find(b => b.addr === 'A' + (AB + 5).toString() + '.2')
  const TRB = outputs.find(b => b.addr === 'A' + (AB + 5).toString() + '.3')
  const KCS = outputs.find(b => b.addr === 'A' + (AB + 5).toString() + '.4')
  const KCV = outputs.find(b => b.addr === 'A' + (AB + 5).toString() + '.5')
  const KCH = outputs.find(b => b.addr === 'A' + (AB + 5).toString() + '.6')

  const view = {
    a: device,
    b: positions,
    c: lamps,
    d: [],
    e: [RMV, RMH, RES, REH, RCVH, REAV, REAH, REP, T2, TRA, TRB, KCS, KCV, KCH],
    alarms: alarms[i - 1]._active
  }

  const EN = inputs.find(b => b.addr === 'E' + (EB + 11).toString() + '.0')
  const IV = new Inverter(i, 'IV', EN)
  const inverters = [IV]

  /**
 * Motors
 */
  const FTXV = inputs.find(b => b.addr === 'E' + (EB + 4).toString() + '.0')
  const FTXH = inputs.find(b => b.addr === 'E' + (EB + 4).toString() + '.1')
  const FEMV = inputs.find(b => b.addr === 'E' + (EB + 4).toString() + '.2')
  const FEMH = inputs.find(b => b.addr === 'E' + (EB + 4).toString() + '.3')
  const LC = [FEMV, FEMH, FTXV, FTXH]

  const ASBK = inputs.find(b => b.addr === 'E' + (EB + 11).toString() + '.2')
  const RTA = inputs.find(b => b.addr === 'E' + (EB + 11).toString() + '.3')
  const TJ1 = inputs.find(b => b.addr === 'E' + (EB + 5).toString() + '.3')

  const KQA = outputs.find(b => b.addr === 'A' + (AB + 4).toString() + '.0')
  const SBK1 = outputs.find(b => b.addr === 'A' + (AB + 2).toString() + '.0')
  const SBK2 = outputs.find(b => b.addr === 'A' + (AB + 4).toString() + '.1')

  const M1 = new Hoisting(
    i,
    { key: 'mot-hoisting' },
    [TJ1, RTA, ASBK],
    [KQA, SBK1, SBK2],
    [LV],
    LC,
    IV
  )

  const AMM = inputs.find(b => b.addr === 'E' + (EB + 7).toString() + '.5')
  const EOM = inputs.find(b => b.addr === 'E' + (EB + 7).toString() + '.3')
  const EZM = inputs.find(b => b.addr === 'E' + (EB + 7).toString() + '.4')
  const SMA = outputs.find(b => b.addr === 'A' + (AB + 4).toString() + '.6')
  const SMB = outputs.find(b => b.addr === 'A' + (AB + 4).toString() + '.7')

  const M2 = new Lock(
    i,
    { key: 'mot-lock', query: { nr: 1 } },
    [EOM, EZM, AMM],
    [SMA, SMB]
  )
  const motors = [M1, M2]

  const silomat = new Silomat(
    i,
    'SIL' + i,
    [RMV, RMH, RES, REH, RCVH, REAV, REAH, REP],
    [T2, TRA, TRB, KCS, KCV, KCH]
  )

  devices_.push(device)
  inverters_.push(IV)
  motors_.push(M1, M2)
  positions_.push(LV)
  silomats_.push(...silomat.motors)
  views_.push(view)

  diagnostic_.push({
    device,
    inverters,
    motors,
    positions,
    silomat,
    view
  })

  EB += 12
  AB += 6
}

module.exports = { devices_, inverters_, motors_, positions_, silomats_, views_, diagnostic_ }
