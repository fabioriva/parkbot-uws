const def = require('./def')
const str = require('./str')
const { Alarms, generateAlarms } = require('../../models/alarms')
const { generateBits, generateBytes } = require('../../models/bits')
const { generateCards } = require('../../models/cards')
const { generateQueue } = require('../../models/queue')
const { generateStalls } = require('../../models/stalls')

const al01 = new Alarms(generateAlarms(1, 64, str.ALARMS.slice(0, 64)), 1) // EL
const al02 = new Alarms(generateAlarms(1, 64, str.ALARMS.slice(0, 64)), 2) // EU
exports.alarms = [al01, al02]

const inputs1 = generateBits('E', 4, 11, str.inputs1)
const inputs2 = generateBits('E', 12, 12, str.inputs2)
const inputs3 = generateBits('E', 24, 25, str.inputs3)
const inputs4 = generateBits('E', 0, 4, str.inputs4)
const inputs = inputs1.concat(inputs2, inputs3)
exports.inputs = inputs
const eb = generateBytes(inputs)
exports.eb = eb
// shuttle I/O
const inputsSH = inputs4
exports.inputsSH = inputsSH
const ebSH = generateBytes(inputsSH)
exports.ebSH = ebSH

const outputs1 = generateBits('A', 4, 7, str.outputs1)
const outputs2 = generateBits('A', 12, 12, str.outputs2)
const outputs3 = generateBits('A', 24, 25, str.outputs3)
const outputs4 = generateBits('A', 0, 2, str.outputs4)
const outputs = outputs1.concat(outputs2, outputs3)
exports.outputs = outputs
const ab = generateBytes(outputs)
exports.ab = ab
// shuttle I/O
const outputsSH = outputs4
exports.outputsSH = outputsSH
const abSH = generateBytes(outputsSH)
exports.abSH = abSH

const racks = require('./racks')
exports.racks = racks

const merkers = generateBits('M', 0, 7)
exports.merkers = merkers
const mb = generateBytes(merkers)
exports.mb = mb

const device1 = require('./device1') // EL
const device2 = require('./device2') // EU

const queue = generateQueue(def)
exports.queue = queue

exports.devices = [
  device1.device,
  device2.device
]

exports.positions = device1.positions.concat(device2.positions)

exports.diagnostic = [device1, device2]

exports.modes = str.MODES

exports.overview = {
  definitions: { cards: def.CARDS, stalls: def.STALLS },
  devices: [
    device1.view,
    device2.view
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
      label: 'Pano -4 (P1)',
      min: 1,
      max: 9,
      stalls: stalls.slice(0, 9),
      elevators: [
        { id: 'el', label: 'EL' }
      ]
    },
    {
      nr: 2,
      label: 'Pano -3 (P2)',
      min: 10,
      max: 18,
      stalls: stalls.slice(9, 18),
      elevators: [
        { id: 'el', label: 'EL' }
      ]
    },
    {
      nr: 3,
      label: 'Pano -2 (P3)',
      min: 19,
      max: 27,
      stalls: stalls.slice(18, 27),
      elevators: [
        { id: 'el', label: 'EL' }
      ]
    },
    {
      nr: 4,
      label: 'Pano -1 (P4)',
      min: 28,
      max: 34,
      stalls: stalls.slice(27, 34),
      elevators: [
        { id: 'el', label: 'EL' }
      ]
    },
    {
      nr: 5,
      label: 'Pano +1 (P6)',
      min: 35,
      max: 43,
      stalls: stalls.slice(34, 43),
      elevators: [
        { id: 'el', label: 'EL' }
      ]
    },
    {
      nr: 1,
      label: 'Pano +2 (P7)',
      min: 44,
      max: 52,
      stalls: stalls.slice(43, 52),
      elevators: [
        { id: 'el', label: 'EL' }
      ]
    }
  ],
  occupancy: [
    { id: 'busy', value: 0 },
    { id: 'free', value: 0 },
    { id: 'lock', value: 0 }
  ]
}
