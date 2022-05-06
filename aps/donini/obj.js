const def = require('./def')
const str = require('./str')
const { Alarms, generateAlarms } = require('../../models/alarms')
const { generateBits, generateBytes } = require('../../models/bits')
const { generateCards } = require('../../models/cards')
const { generateQueue } = require('../../models/queue')
const { generateStalls } = require('../../models/stalls')

const al01 = new Alarms(generateAlarms(1, 64, str.ALARMS.slice(0, 64)), 1)
const al02 = new Alarms(generateAlarms(1, 64, str.ALARMS.slice(0, 64)), 2)
exports.alarms = [al01, al02]

const inputs1 = generateBits('E', 0, 9, str.inputs1)
const inputs2 = generateBits('E', 10, 17, str.inputs2)
const inputs = inputs1.concat(inputs2)
exports.inputs = inputs
const eb = generateBytes(inputs)
exports.eb = eb

const outputs1 = generateBits('A', 0, 5, str.outputs1)
const outputs2 = generateBits('A', 10, 13, str.outputs2)
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
const device2 = require('./device2')

const queue = generateQueue(def)
exports.queue = queue

exports.devices = [
  device1.device,
  device2.device
]

exports.inverters = device1.inverters.concat(device2.inverters)

exports.motors = device1.motors.concat(device2.motors)

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
      label: 'Level 1 (-3)',
      min: 1,
      max: 40,
      stalls: stalls.slice(0, 40),
      elevators: [{ id: 't', label: 'T' }]
    },
    {
      nr: 2,
      label: 'Level 2 (-2)',
      min: 41,
      max: 78,
      stalls: stalls.slice(40, 78),
      elevators: [{ id: 't', label: 'T' }]
    },
    {
      nr: 3,
      label: 'Level 3 (-1)',
      min: 79,
      max: 81,
      stalls: stalls.slice(78, 81),
      elevators: [{ id: 't', label: 'T' }, { id: 'el', label: 'EL' }]
    }
  ],
  occupancy: [
    { id: 'busy', value: 0 },
    { id: 'free', value: 0 },
    { id: 'lock', value: 0 }
  ]
}
