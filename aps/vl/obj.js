const def = require('./def')
const str = require('./str')
const { Alarms, generateAlarms } = require('../../models/alarms')
const { generateBits, generateBytes } = require('../../models/bits')
const { generateCards } = require('../../models/cards')
const { generateQueue } = require('../../models/queue')
const { generateStalls } = require('../../models/stalls')

const al01 = new Alarms(generateAlarms(1, 1, 64, str.alarms1), 'EL')
exports.alarms = [al01]

const inputs1 = generateBits('E', 0, 7, str.inputs1)
const inputs2 = generateBits('E', 8, 9, str.inputs2)
const inputs3 = generateBits('E', 10, 15, str.inputs3)
const inputs = inputs1.concat(inputs2, inputs3)
exports.inputs = inputs
const eb = generateBytes(inputs)
exports.eb = eb

const outputs1 = generateBits('A', 0, 5, str.outputs1)
const outputs2 = generateBits('A', 6, 7, str.outputs2)
const outputs3 = generateBits('A', 8, 11, str.outputs3)
const outputs = outputs1.concat(outputs2, outputs3)
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

const queue = generateQueue(def)
exports.queue = queue

exports.devices = [device1.device]

exports.inverters = device1.inverters

exports.motors = device1.motors

exports.positions = device1.positions

exports.diagnostic = [device1]

exports.modes = [
  { id: 0, label: 'mode-no-func' },
  { id: 1, label: 'mode-data-edit' },
  { id: 2, label: 'mode-data-read' },
  { id: 3, label: 'mode-eme-1' },
  { id: 4, label: 'mode-eme-2' },
  { id: 5, label: 'mode-no-func' },
  { id: 6, label: 'mode-step' },
  { id: 7, label: 'mode-preset' },
  { id: 8, label: 'mode-auto' }
]

exports.operations = [
  { id: 0, label: '---' },
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
  { id: 12, label: '---' },
  { id: 13, label: '---' },
  { id: 14, label: '---' },
  { id: 15, label: '---' }
]

exports.overview = {
  definitions: { cards: def.CARDS, stalls: def.STALLS },
  devices: [device1.view],
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
      max: 8,
      stalls: stalls.slice(0, 8),
      elevators: [{ id: 'el-a1', label: 'EL' }]
    },
    {
      nr: 2,
      label: 'Level +2',
      min: 9,
      max: 16,
      stalls: stalls.slice(8, 16),
      elevators: [{ id: 'el-a2', label: 'EL' }]
    },
    {
      nr: 3,
      label: 'Level +3',
      min: 17,
      max: 24,
      stalls: stalls.slice(16, 24),
      elevators: [{ id: 'el-a3', label: 'EL' }]
    },
    {
      nr: 4,
      label: 'Level +4',
      min: 25,
      max: 32,
      stalls: stalls.slice(24, 32),
      elevators: [{ id: 'el-a4', label: 'EL' }]
    },
    {
      nr: 5,
      label: 'Level +5',
      min: 33,
      max: 40,
      stalls: stalls.slice(32, 40),
      elevators: [{ id: 'el-a5', label: 'EL' }]
    },
    {
      nr: 6,
      label: 'Level +6',
      min: 41,
      max: 48,
      stalls: stalls.slice(40, 48),
      elevators: [{ id: 'el-a6', label: 'EL' }]
    },
    {
      nr: 7,
      label: 'Level +7',
      min: 49,
      max: 56,
      stalls: stalls.slice(48, 56),
      elevators: [{ id: 'el-a7', label: 'EL' }]
    }
  ],
  occupancy: [
    { id: 'busy', value: 0 },
    { id: 'free', value: 0 },
    { id: 'lock', value: 0 }
  ]
}