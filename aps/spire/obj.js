const def = require('./def')
const str = require('./str')
const { Alarms, generateAlarms } = require('../../models/alarms')
const { generateBits, generateBytes } = require('../../models/bits')
const { generateCards } = require('../../models/cards')
const { generateQueue } = require('../../models/queue')
const { generateStalls } = require('../../models/stalls')

const al01 = new Alarms(generateAlarms(1, 64, str.EVT), 1)
const al02 = new Alarms(generateAlarms(1, 64, str.EVT), 2)
const al03 = new Alarms(generateAlarms(1, 64, str.EVT), 3)
const al04 = new Alarms(generateAlarms(1, 64, str.IVT), 4)
const al05 = new Alarms(generateAlarms(1, 64, str.IVT), 5)
const al06 = new Alarms(generateAlarms(1, 64, str.IVT), 6)
exports.alarms = [al01, al02, al03, al04, al05, al06]

const inputs1 = generateBits('E', 0, 5, str.inputs1)
const inputs2 = generateBits('E', 100, 107, str.inputs2)
const inputs3 = generateBits('E', 110, 112, str.inputs3)
const inputs4 = generateBits('E', 200, 207, str.inputs2)
const inputs5 = generateBits('E', 210, 212, str.inputs3)
const inputs6 = generateBits('E', 300, 307, str.inputs2)
const inputs7 = generateBits('E', 310, 312, str.inputs3)
const inputs8 = generateBits('E', 400, 403, str.inputs8)
const inputs9 = generateBits('E', 404, 405, str.inputs9)
const inputs10 = generateBits('E', 410, 414, str.inputs10)
const inputs11 = generateBits('E', 500, 503, str.inputs8)
const inputs12 = generateBits('E', 504, 505, str.inputs9)
const inputs13 = generateBits('E', 510, 514, str.inputs10)
const inputs14 = generateBits('E', 600, 603, str.inputs8)
const inputs15 = generateBits('E', 604, 605, str.inputs9)
const inputs16 = generateBits('E', 610, 614, str.inputs10)
const inputs = inputs1.concat(
  inputs2,
  inputs3,
  inputs4,
  inputs5,
  inputs6,
  inputs7,
  inputs8,
  inputs9,
  inputs10,
  inputs11,
  inputs12,
  inputs13,
  inputs14,
  inputs15,
  inputs16
)
exports.inputs = inputs
const eb = generateBytes(inputs)
exports.eb = eb

const outputs1 = generateBits('A', 0, 5, str.outputs1)
const outputs2 = generateBits('A', 100, 103, str.outputs2)
const outputs3 = generateBits('A', 110, 111, str.outputs3)
const outputs4 = generateBits('A', 200, 203, str.outputs2)
const outputs5 = generateBits('A', 210, 211, str.outputs3)
const outputs6 = generateBits('A', 300, 303, str.outputs2)
const outputs7 = generateBits('A', 310, 311, str.outputs3)
const outputs8 = generateBits('A', 400, 401, str.outputs8)
const outputs9 = generateBits('A', 404, 404, str.outputs9)
const outputs10 = generateBits('A', 410, 412, str.outputs10)
const outputs11 = generateBits('A', 500, 501, str.outputs8)
const outputs12 = generateBits('A', 504, 504, str.outputs9)
const outputs13 = generateBits('A', 510, 512, str.outputs10)
const outputs14 = generateBits('A', 600, 601, str.outputs8)
const outputs15 = generateBits('A', 604, 604, str.outputs9)
const outputs16 = generateBits('A', 610, 612, str.outputs10)
const outputs = outputs1.concat(
  outputs2,
  outputs3,
  outputs4,
  outputs5,
  outputs6,
  outputs7,
  outputs8,
  outputs9,
  outputs10,
  outputs11,
  outputs12,
  outputs13,
  outputs14,
  outputs15,
  outputs16
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

exports.silomats = device1.silomat.motors.concat(
  device2.silomat.motors,
  device3.silomat.motors,
  device4.silomat.motors,
  device5.silomat.motors,
  device6.silomat.motors
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
      label: '1st Level (P1)',
      min: 1,
      max: 38,
      stalls: stalls.slice(0, 38),
      elevators: [
        { id: 'el-4', label: 'IVT4' },
        { id: 'el-5', label: 'IVT5' },
        { id: 'el-6', label: 'IVT6' }
      ]
    },
    {
      nr: 2,
      label: '2nd Level (P2)',
      min: 39,
      max: 76,
      stalls: stalls.slice(38, 76),
      elevators: [
        { id: 'el-4', label: 'IVT4' },
        { id: 'el-5', label: 'IVT5' },
        { id: 'el-6', label: 'IVT6' }
      ]
    },
    {
      nr: 3,
      label: '3rd Level (P3)',
      min: 77,
      max: 114,
      stalls: stalls.slice(76, 114),
      elevators: [
        { id: 'el-4', label: 'IVT4' },
        { id: 'el-5', label: 'IVT5' },
        { id: 'el-6', label: 'IVT6' }
      ]
    },
    {
      nr: 4,
      label: '4th Level (P4)',
      min: 115,
      max: 152,
      stalls: stalls.slice(114, 152),
      elevators: [
        { id: 'el-4', label: 'IVT4' },
        { id: 'el-5', label: 'IVT5' },
        { id: 'el-6', label: 'IVT6' }
      ]
    },
    {
      nr: 5,
      label: '5th Level (P5)',
      min: 153,
      max: 190,
      stalls: stalls.slice(152, 190),
      elevators: [
        { id: 'el-4', label: 'IVT4' },
        { id: 'el-5', label: 'IVT5' },
        { id: 'el-6', label: 'IVT6' }
      ]
    },
    {
      nr: 6,
      label: '6th Level (P6)',
      min: 191,
      max: 227,
      stalls: stalls.slice(190, 227),
      elevators: [
        { id: 'el-4', label: 'IVT4' },
        { id: 'el-5', label: 'IVT5' },
        { id: 'el-6', label: 'IVT6' }
      ]
    },
    {
      nr: 7,
      label: '7th Level (P7)',
      min: 228,
      max: 255,
      stalls: stalls.slice(227, 255),
      elevators: [
        { id: 'el-4', label: 'IVT4' },
        { id: 'el-5', label: 'IVT5' },
        { id: 'el-6', label: 'IVT6' }
      ]
    },
    {
      nr: 8,
      label: '8th Level (P8)',
      min: 256,
      max: 276,
      stalls: stalls.slice(255, 276),
      elevators: [
        { id: 'el-4', label: 'IVT4' },
        { id: 'el-5', label: 'IVT5' },
        { id: 'el-6', label: 'IVT6' }
      ]
    }
  ],
  occupancy: [
    { id: 'busy', value: 0 },
    { id: 'free', value: 0 },
    { id: 'lock', value: 0 }
  ]
}
