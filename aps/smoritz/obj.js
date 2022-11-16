const def = require('./def')
const str = require('./str')
const { Alarms, generateAlarms } = require('../../models/alarms')
const { generateBits, generateBytes } = require('../../models/bits')
const { generateCards } = require('../../models/cards')
const { generateQueue } = require('../../models/queue')
const { generateStalls } = require('../../models/stalls')

const al01 = new Alarms(generateAlarms(1, 64, str.ALARMS.slice(0, 64)), 1) // EL
const al02 = new Alarms(generateAlarms(1, 64, str.ALARMS.slice(64, 128)), 2) // EL(L)
const al03 = new Alarms(generateAlarms(1, 64, str.ALARMS.slice(64, 128)), 3) // EL(R)
exports.alarms = [al01, al02, al03]

const inputs1 = generateBits('E', 4, 15, str.inputs1)
const inputs2 = generateBits('E', 28, 31, str.inputs2)
const inputs3 = generateBits('E', 32, 32, str.inputs3)
const inputs = inputs1.concat(inputs2, inputs3)
exports.inputs = inputs
const eb = generateBytes(inputs)
exports.eb = eb

const outputs1 = generateBits('A', 4, 11, str.outputs1)
const outputs2 = generateBits('A', 28, 29, str.outputs2)
const outputs3 = generateBits('A', 32, 32, str.outputs3)
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

const device1 = require('./device1') // EL
const device2 = require('./device2') // EL(L)
const device3 = require('./device3') // EL(R)

const queue = generateQueue(def)
exports.queue = queue

exports.devices = [
  device1.device,
  device2.device,
  device3.device
]

exports.positions = device1.positions.concat(device2.positions, device3.positions)

exports.diagnostic = [device1, device2, device3]

exports.modes = str.MODES

exports.overview = {
  definitions: { cards: def.CARDS, stalls: def.STALLS },
  devices: [
    device1.view,
    device2.view,
    device3.view
  ],
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
      label: 'Pano -2 (P1)',
      min: 1,
      max: 4,
      stalls: stalls.slice(0, 4),
      elevators: [
        { id: 'el-l', label: '(L)' },
        { id: 'el-r', label: '(R)' }
      ]
    },
    {
      nr: 2,
      label: 'Pano -1 (P2)',
      min: 5,
      max: 8,
      stalls: stalls.slice(4, 8),
      elevators: [
        { id: 'el-l', label: '(L)' },
        { id: 'el-r', label: '(R)' }
      ]
    }
  ],
  occupancy: [
    { id: 'busy', value: 0 },
    { id: 'free', value: 0 },
    { id: 'lock', value: 0 }
  ]
}
