const def = require('./def')
const str = require('./str')
const { Alarms, generateAlarms } = require('../../models/alarms')
const { generateBits, generateBytes } = require('../../models/bits')
const { generateCards } = require('../../models/cards')
const { generateQueue } = require('../../models/queue')
const { generateStalls } = require('../../models/stalls')

const al01 = new Alarms(generateAlarms(1, 64, str.ALARMS.slice(0, 64)), 1)
const al02 = new Alarms(generateAlarms(1, 64, str.ALARMS.slice(0, 64)), 2)
const al03 = new Alarms(generateAlarms(1, 64, str.ALARMS.slice(0, 64)), 3)
const al04 = new Alarms(generateAlarms(1, 64, str.ALARMS.slice(64, 128)), 4)
exports.alarms = [al01, al02, al03, al04]

const inputs1 = generateBits('E', 0, 13, str.inputs1)
const inputs2 = generateBits('E', 20, 23, str.inputs2)
const inputs3 = generateBits('E', 30, 33, str.inputs3)
const inputs = inputs1.concat(inputs2, inputs3)
exports.inputs = inputs
const eb = generateBytes(inputs)
exports.eb = eb

const outputs1 = generateBits('A', 0, 3, str.outputs1)
const outputs2 = generateBits('A', 10, 13, str.outputs2)
const outputs3 = generateBits('A', 20, 23, str.outputs3)
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
const device4 = require('./device4')

const queue = generateQueue(def)
exports.queue = queue

exports.devices = [
  device1.device,
  device2.device,
  device3.device,
  device4.device
]

exports.inverters = device1.inverters.concat(
  device2.inverters,
  device3.inverters,
  device4.inverters
)

exports.motors = device1.motors.concat(
  device2.motors,
  device3.motors,
  device4.motors
)

exports.positions = device1.positions.concat(
  device2.positions,
  device3.positions,
  device4.positions
)

// exports.silomats = device1.silomat.motors.concat(
//   device2.silomat.motors,
//   device3.silomat.motors
// )

exports.diagnostic = [device1, device2, device3, device4]

exports.modes = str.MODES

exports.overview = {
  definitions: { cards: def.CARDS, stalls: def.STALLS },
  devices: [
    device1.view,
    device2.view,
    device3.view,
    device4.view
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
      label: 'Level -1 (SH1)',
      min: 1,
      max: 13,
      stalls: stalls.slice(0, 13),
      elevators: [
        { id: 'el-1', label: 'EL' }
      ]
    },
    {
      nr: 2,
      label: 'Level -2 (SH2)',
      min: 14,
      max: 26,
      stalls: stalls.slice(13, 26),
      elevators: [
        { id: 'el-2', label: 'EL' }
      ]
    },
    {
      nr: 3,
      label: 'Level -3 (SH3)',
      min: 27,
      max: 40,
      stalls: stalls.slice(26, 40),
      elevators: [
        { id: 'el-3', label: 'EL' }
      ]
    }
  ],
  occupancy: [
    { id: 'busy', value: 0 },
    { id: 'free', value: 0 },
    { id: 'lock', value: 0 }
  ]
}
