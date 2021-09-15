const def = require('./def')
const str = require('./str')
const { Alarms, generateAlarms } = require('../../models/alarms')
const { generateBits, generateBytes } = require('../../models/bits')
const { generateCards } = require('../../models/cards')
const { generateQueue } = require('../../models/queue')
const { generateStalls } = require('../../models/stalls')

const al01 = new Alarms(generateAlarms(1, 64, str.EL), 1)
const al02 = new Alarms(generateAlarms(1, 64, str.EL), 2)
exports.alarms = [al01, al02]

const inputs1 = generateBits('E', 0, 3, str.inputs1)
const inputs2 = generateBits('E', 100, 109, str.inputs2)
const inputs3 = generateBits('E', 110, 111, str.inputs3)
const inputs4 = generateBits('E', 120, 125, str.inputs4)
const inputs5 = generateBits('E', 200, 209, str.inputs2)
const inputs6 = generateBits('E', 210, 211, str.inputs3)
const inputs7 = generateBits('E', 220, 225, str.inputs4)
const inputs = inputs1.concat(
  inputs2,
  inputs3,
  inputs4,
  inputs5,
  inputs6,
  inputs7
)
exports.inputs = inputs
const eb = generateBytes(inputs)
exports.eb = eb

const outputs1 = generateBits('A', 0, 3, str.outputs1)
const outputs2 = generateBits('A', 100, 107, str.outputs2)
const outputs3 = generateBits('A', 110, 111, str.outputs3)
const outputs4 = generateBits('A', 120, 123, str.outputs4)
const outputs5 = generateBits('A', 200, 207, str.outputs2)
const outputs6 = generateBits('A', 210, 211, str.outputs3)
const outputs7 = generateBits('A', 220, 223, str.outputs4)
const outputs = outputs1.concat(
  outputs2,
  outputs3,
  outputs4,
  outputs5,
  outputs6,
  outputs7
)
exports.outputs = outputs
const ab = generateBytes(outputs)
exports.ab = ab

const racks = require('./racks')
exports.racks = racks

const merkers = generateBits('M', 0, 7)
exports.merkers = merkers
const mb = generateBytes(merkers)
exports.mb = mb

const device1 = require('./device1')
const device2 = require('./device2')
const device3 = require('./device3')
const device4 = require('./device4')
const device5 = require('./device5')
const device6 = require('./device6')

const queue = generateQueue(def)
exports.queue = queue

exports.devices = [
  device1.device,
  device2.device,
  device3.device,
  device4.device,
  device5.device,
  device6.device
]

exports.inverters = device1.inverters.concat(
  device2.inverters,
  device3.inverters,
  device4.inverters,
  device5.inverters,
  device6.inverters
)

exports.motors = device1.motors.concat(
  device2.motors,
  device3.motors,
  device4.motors,
  device5.motors,
  device6.motors
)

exports.positions = device1.positions.concat(
  device2.positions,
  device3.positions,
  device4.positions,
  device5.positions,
  device6.positions
)

exports.diagnostic = [device1, device2, device3, device4, device5, device6]

exports.modes = [
  { id: 0, label: 'mode-no' },
  { id: 1, label: 'mode-data-edit' },
  { id: 2, label: 'mode-data-read' },
  { id: 3, label: 'mode-eme-1' },
  { id: 4, label: 'mode-eme-2' },
  { id: 5, label: 'mode-no' },
  { id: 6, label: 'mode-step' },
  { id: 7, label: 'mode-preset' },
  { id: 8, label: 'mode-auto' }
]

exports.operations = [
  { id: 0, label: 'op-no' },
  { id: 1, label: 'op-alarm-on' },
  { id: 2, label: 'op-alarm-off' },
  { id: 3, label: 'op-switch-mode' },
  { id: 4, label: 'op-change-pin' },
  { id: 5, label: 'op-stall-in' },
  { id: 6, label: 'op-stall-out' },
  { id: 7, label: 'op-shuffle-in' },
  { id: 8, label: 'op-shuffle-out' },
  { id: 9, label: 'op-stall-rsv' },
  { id: 10, label: 'op-req-exit' },
  { id: 11, label: 'op-req-entry' },
  { id: 12, label: 'op-no' },
  { id: 13, label: 'op-no' },
  { id: 14, label: 'op-no' },
  { id: 15, label: 'op-no' }
]

exports.overview = {
  definitions: { cards: def.CARDS, stalls: def.STALLS },
  devices: [
    device1.view,
    device2.view,
    device3.view,
    device4.view,
    device5.view,
    device6.view
  ],
  exitQueue: {
    queueList: queue,
    exitButton: {
      enable: merkers.find(b => b.addr === 'M3.0'),
      label: 'action-exit'
    }
  }
}

const cards = generateCards(def)
exports.cards = cards

const stalls = generateStalls(def)
exports.stalls = stalls

exports.map = {
  definitions: {
    cards: def.CARDS,
    stalls: def.STALLS,
    stallStatus: def.STALL_STATUS
  },
  levels: [
    {
      nr: 1,
      label: 'Level +1',
      min: 1,
      max: 16,
      stalls: stalls.slice(0, 16),
      elevators: [
        { id: 'el-a1', label: 'A1' },
        { id: 'el-b1', label: 'B2' }
      ]
    },
    {
      nr: 2,
      label: 'Level +2',
      min: 17,
      max: 32,
      stalls: stalls.slice(16, 32),
      elevators: [
        { id: 'el-a2', label: 'A1' },
        { id: 'el-b2', label: 'B2' }
      ]
    },
    {
      nr: 3,
      label: 'Level +3',
      min: 33,
      max: 48,
      stalls: stalls.slice(32, 48),
      elevators: [
        { id: 'el-a3', label: 'A1' },
        { id: 'el-b3', label: 'B2' }
      ]
    },
    {
      nr: 4,
      label: 'Level +4',
      min: 49,
      max: 64,
      stalls: stalls.slice(48, 64),
      elevators: [
        { id: 'el-a4', label: 'A1' },
        { id: 'el-b4', label: 'B2' }
      ]
    },
    {
      nr: 5,
      label: 'Level +5',
      min: 65,
      max: 80,
      stalls: stalls.slice(64, 80),
      elevators: [
        { id: 'el-a5', label: 'A1' },
        { id: 'el-b5', label: 'B2' }
      ]
    },
    {
      nr: 6,
      label: 'Level +6',
      min: 81,
      max: 96,
      stalls: stalls.slice(80, 96),
      elevators: [
        { id: 'el-a6', label: 'A1' },
        { id: 'el-b6', label: 'B2' }
      ]
    },
    {
      nr: 7,
      label: 'Level +7',
      min: 97,
      max: 112,
      stalls: stalls.slice(96, 112),
      elevators: [
        { id: 'el-a7', label: 'A1' },
        { id: 'el-b7', label: 'B2' }
      ]
    }
  ],
  occupancy: [
    { id: 'busy', value: 0 },
    { id: 'free', value: 0 },
    { id: 'lock', value: 0 }
  ]
}
