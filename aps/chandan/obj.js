const def = require('./def')
const str = require('./str')
const { Alarms, generateAlarms } = require('../../models/alarms')
const { generateBits, generateBytes } = require('../../models/bits')
const { generateCards } = require('../../models/cards')
const { generateQueue } = require('../../models/queue')
const { generateStalls } = require('../../models/stalls')

const al01 = new Alarms(generateAlarms(1, 64, str.alarms1), 1) // EL1
const al02 = new Alarms(generateAlarms(1, 64, str.alarms2), 2) // EL2
const al03 = new Alarms(generateAlarms(1, 64, str.alarms3), 3) // T(A)
exports.alarms = [al01, al02, al03]

const inputs1 = generateBits('E', 0, 1, str.inputs1)
const inputs2 = generateBits('E', 10, 17, str.inputs2)
const inputs3 = generateBits('E', 20, 27, str.inputs3)
const inputs4 = generateBits('E', 30, 35, str.inputs4)
const inputs = inputs1.concat(inputs2, inputs3, inputs4)
exports.inputs = inputs
const eb = generateBytes(inputs)
exports.eb = eb

const outputs1 = generateBits('A', 0, 1, str.outputs1)
const outputs2 = generateBits('A', 10, 17, str.outputs2)
const outputs3 = generateBits('A', 20, 25, str.outputs3)
const outputs4 = generateBits('A', 30, 33, str.outputs4)
const outputs = outputs1.concat(outputs2, outputs3, outputs4)
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

const queue = generateQueue(def)
exports.queue = queue

exports.devices = [device1.device, device2.device, device3.device]

exports.inverters = device1.inverters.concat(
  device2.inverters,
  device3.inverters
)

exports.motors = device1.motors.concat(device2.motors, device3.motors)

exports.positions = device1.positions.concat(
  device2.positions,
  device3.positions
)

exports.diagnostic = [device1, device2, device3]

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
  devices: [device1.view, device2.view, device3.view],
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
      label: '3rd basement (P1)',
      min: 1,
      max: 35,
      stalls: stalls.slice(0, 35),
      elevators: [
        { id: 'el-1', label: 'EL1' },
        { id: 'el-2', label: 'EL2' }
      ]
    },
    {
      nr: 2,
      label: '2nd basement (P2)',
      min: 36,
      max: 70,
      stalls: stalls.slice(35, 70),
      elevators: [
        { id: 'el-1', label: 'EL1' },
        { id: 'el-2', label: 'EL2' }
      ]
    },
    {
      nr: 3,
      label: '1st basement (P3)',
      min: 71,
      max: 105,
      stalls: stalls.slice(70, 105),
      elevators: [
        { id: 'el-1', label: 'EL1' },
        { id: 'el-2', label: 'EL2' }
      ]
    }
  ],
  occupancy: [
    { id: 'busy', value: 0 },
    { id: 'free', value: 0 },
    { id: 'lock', value: 0 }
  ]
}
