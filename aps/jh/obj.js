const def = require('./defn')
const str = require('./str')
const { Alarms, generateAlarms } = require('../../models/alarms')
const { generateBits, generateBytes } = require('../../models/bits')
const { generateCards } = require('../../models/cards')
const { generateQueue } = require('../../models/queue')
const { generateStalls } = require('../../models/stalls')

const al01 = new Alarms(generateAlarms(1, 64, str.ALARMS.slice(0, 64)))
const al02 = new Alarms(generateAlarms(1, 64, str.ALARMS.slice(64, 128)))
const al03 = new Alarms(generateAlarms(1, 64, str.ALARMS.slice(64, 128)))
exports.alarms = [al01, al02, al03]

const inputs1 = generateBits('E', 0, 11, str.inputs1)
const inputs2 = generateBits('E', 24, 25, str.inputs2)
const inputs3 = generateBits('E', 0, 3, str.inputs3)
const inputs4 = generateBits('E', 4, 4, str.inputs4)
const inputs = inputs1.concat(inputs2)
exports.inputs = inputs
const eb = generateBytes(inputs)
exports.eb = eb
// shuttle I/O
const inputsSH = inputs3.concat(inputs4)
exports.inputsSH = inputsSH
const ebSH = generateBytes(inputsSH)
exports.ebSH = ebSH

const outputs1 = generateBits('A', 4, 11, str.outputs1)
const outputs2 = generateBits('A', 24, 25, str.outputs2)
const outputs3 = generateBits('A', 0, 1, str.outputs3)
const outputs4 = generateBits('A', 4, 4, str.outputs4)
const outputs = outputs1.concat(outputs2)
exports.outputs = outputs
const ab = generateBytes(outputs)
exports.ab = ab
// shuttle I/O
const outputsSH = outputs3.concat(outputs4)
exports.outputsSH = outputsSH
const abSH = generateBytes(outputsSH)
exports.abSH = abSH

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

exports.devices = [
  device1.device,
  device2.device,
  device3.device
]

exports.inverters = device1.inverters.concat(device2.inverters, device3.inverters)

exports.motors = device1.motors.concat(device2.motors, device3.motors)

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
      label: 'Level -7',
      min: 1,
      max: 33,
      stalls: stalls.slice(0, 33),
      elevators: [{ id: 'el', label: 'EL' }]
    },
    {
      nr: 2,
      label: 'Level -6',
      min: 34,
      max: 66,
      stalls: stalls.slice(33, 66),
      elevators: [{ id: 'el', label: 'EL' }]
    },
    {
      nr: 3,
      label: 'Level -5',
      min: 67,
      max: 99,
      stalls: stalls.slice(66, 99),
      elevators: [{ id: 'el', label: 'EL' }]
    },
    {
      nr: 4,
      label: 'Level -4',
      min: 100,
      max: 131,
      stalls: stalls.slice(99, 131),
      elevators: [{ id: 'el', label: 'EL' }]
    },
    {
      nr: 5,
      label: 'Level -3',
      min: 132,
      max: 161,
      stalls: stalls.slice(131, 161),
      elevators: [{ id: 'el', label: 'EL' }]
    }
  ],
  occupancy: [
    { id: 'busy', value: 0 },
    { id: 'free', value: 0 },
    { id: 'lock', value: 0 }
  ]
}
