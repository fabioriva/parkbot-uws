const def = require('./def')
const str = require('./str')
const { Alarms, generateAlarms } = require('../../models/alarms')
const { generateBits, generateBytes } = require('../../models/bits')
const { generateCards } = require('../../models/cards')
const { generateQueue } = require('../../models/queue')
const { generateStalls } = require('../../models/stalls')

const al01 = new Alarms(generateAlarms(1, 64, str.ALARMS.slice(0, 64)), 1) // 'EL1')
const al02 = new Alarms(generateAlarms(1, 64, str.ALARMS.slice(0, 64)), 2) // 'EL2')
const al03 = new Alarms(generateAlarms(1, 64, str.ALARMS.slice(64, 128)), 3) // 'E1')
const al04 = new Alarms(generateAlarms(1, 64, str.ALARMS.slice(64, 128)), 4) // 'E2')
const al05 = new Alarms(generateAlarms(1, 64, str.ALARMS.slice(64, 128)), 5) // 'E3')
const al06 = new Alarms(generateAlarms(1, 64, str.ALARMS.slice(64, 128)), 6) // 'E4')
const al07 = new Alarms(generateAlarms(1, 64, str.ALARMS.slice(128, 192)), 7) // 'U1')
const al08 = new Alarms(generateAlarms(1, 64, str.ALARMS.slice(128, 192)), 8) // 'U2')
const al09 = new Alarms(generateAlarms(1, 64, str.ALARMS.slice(128, 192)), 9) // 'U3')
const al10 = new Alarms(generateAlarms(1, 64, str.ALARMS.slice(128, 192)), 10) // 'U4')
exports.alarms = [al01, al02, al03, al04, al05, al06, al07, al08, al09, al10]

const inputs1 = generateBits('E', 0, 3, str.inputs1)
const inputs2 = generateBits('E', 100, 117, str.inputs2)
const inputs3 = generateBits('E', 120, 125, str.inputs3)
const inputs4 = generateBits('E', 200, 217, str.inputs4)
const inputs5 = generateBits('E', 220, 225, str.inputs5)
const inputs = inputs1.concat(inputs2, inputs3, inputs4, inputs5)
exports.inputs = inputs

const eb = generateBytes(inputs)
exports.eb = eb

const outputs1 = generateBits('A', 0, 3, str.outputs1)
const outputs2 = generateBits('A', 100, 111, str.outputs2)
const outputs3 = generateBits('A', 120, 123, str.outputs3)
const outputs4 = generateBits('A', 200, 211, str.outputs4)
const outputs5 = generateBits('A', 220, 223, str.outputs5)
const outputs = outputs1.concat(outputs2, outputs3, outputs4, outputs5)
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
const device7 = require('./device7')
const device8 = require('./device8')
const device9 = require('./device9')
const device10 = require('./device10')

const queue = generateQueue(def)
exports.queue = queue

exports.devices = [
  device1.device,
  device2.device,
  device3.device,
  device4.device,
  device5.device,
  device6.device,
  device7.device,
  device8.device,
  device9.device,
  device10.device
]

exports.inverters = device1.inverters.concat(
  device2.inverters,
  device3.inverters,
  device4.inverters,
  device5.inverters,
  device6.inverters,
  device7.inverters,
  device8.inverters,
  device9.inverters,
  device10.inverters
)

exports.motors = device1.motors.concat(
  device2.motors,
  device3.motors,
  device4.motors,
  device5.motors,
  device6.motors,
  device7.motors,
  device8.motors,
  device9.motors,
  device10.motors
)

exports.positions = device1.positions.concat(
  device2.positions,
  device3.positions,
  device4.positions,
  device5.positions,
  device6.positions,
  device7.positions,
  device8.positions,
  device9.positions,
  device10.positions
)

exports.diagnostic = [
  device1,
  device2,
  device3,
  device4,
  device5,
  device6,
  device7,
  device8,
  device9,
  device10
]

exports.modes = str.MODES

exports.overview = {
  definitions: { cards: def.CARDS, stalls: def.STALLS },
  devices: [
    device1.view,
    device2.view,
    device3.view,
    device4.view,
    device5.view,
    device6.view,
    device7.view,
    device8.view,
    device9.view,
    device10.view
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
      label: 'Level 1',
      min: 1,
      max: 12,
      stalls: stalls.slice(0, 29),
      elevators: [
        { id: 'el-1', label: 'EL1' },
        { id: 'el-2', label: 'EL2' }
      ]
    },
    {
      nr: 2,
      label: 'Level 2',
      min: 13,
      max: 24,
      stalls: stalls.slice(29, 58),
      elevators: [
        { id: 'el-1', label: 'EL1' },
        { id: 'el-2', label: 'EL2' }
      ]
    },
    {
      nr: 3,
      label: 'Level 3',
      min: 25,
      max: 36,
      stalls: stalls.slice(58, 87),
      elevators: [
        { id: 'el-1', label: 'EL1' },
        { id: 'el-2', label: 'EL2' }
      ]
    },
    {
      nr: 4,
      label: 'Level 4',
      min: 37,
      max: 48,
      stalls: stalls.slice(87, 116),
      elevators: [
        { id: 'el-1', label: 'EL1' },
        { id: 'el-2', label: 'EL2' }
      ]
    },
    {
      nr: 5,
      label: 'Level 5',
      min: 49,
      max: 60,
      stalls: stalls.slice(116, 145),
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
