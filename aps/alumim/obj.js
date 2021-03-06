const def = require('./def')
const str = require('./str')
const { Alarms, generateAlarms } = require('../../models/alarms')
const { generateBits, generateBytes } = require('../../models/bits')
const { generateCards } = require('../../models/cards')
const { generateQueue } = require('../../models/queue')
const { generateStalls } = require('../../models/stalls')

// const al01 = new Alarms(generateAlarms(1, 64, str.alarms1), 1)
const al01 = new Alarms(generateAlarms(1, 64, str.ALARMS), 1)
exports.alarms = [al01]

const inputs1 = generateBits('E', 4, 13, str.inputs1)
const inputs2 = generateBits('E', 14, 17, str.inputs2)
const inputs = inputs1.concat(inputs2)
exports.inputs = inputs
const eb = generateBytes(inputs)
exports.eb = eb

const outputs1 = generateBits('A', 4, 9, str.outputs1)
const outputs2 = generateBits('A', 14, 15, str.outputs2)
const outputs = outputs1.concat(outputs2)
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

exports.silomats = device1.silomat.motors

exports.diagnostic = [device1]

exports.modes = str.MODES

exports.overview = {
  definitions: { cards: def.CARDS, stalls: def.STALLS },
  devices: [device1.view],
  exitQueue: {
    queueList: queue,
    exitButton: {
      conn: def.REQ_0,
      enable: merkers.find(b => b.addr === 'M3.0'),
      key: 'action-exit'
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
      label: 'Level -3',
      min: 1,
      max: 12,
      stalls: stalls.slice(0, 12),
      elevators: [{ id: 'el-1', label: 'EL' }]
    },
    {
      nr: 2,
      label: 'Level -2',
      min: 13,
      max: 24,
      stalls: stalls.slice(12, 24),
      elevators: [{ id: 'el-2', label: 'EL' }]
    },
    {
      nr: 3,
      label: 'Level 3',
      min: 25,
      max: 36,
      stalls: stalls.slice(24, 36),
      elevators: [{ id: 'el-3', label: 'EL' }]
    }
  ],
  occupancy: [
    { id: 'busy', value: 0 },
    { id: 'free', value: 0 },
    { id: 'lock', value: 0 }
  ]
}
