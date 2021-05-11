const def = require('./def')
const str = require('./str')
const { Alarms, generateAlarms } = require('../../models/alarms')
const { generateBits, generateBytes } = require('../../models/bits')
const { generateCards } = require('../../models/cards')
const { generateDevices } = require('../../models/devices')
const { generatePositions } = require('../../models/positions')
const { generateQueue } = require('../../models/queue')
const { generateStalls } = require('../../models/stalls')

const al01 = new Alarms(generateAlarms(1, 1, 64, str.alarms1), 'EVT1')
const al02 = new Alarms(generateAlarms(2, 1, 64, str.alarms1), 'EVT2')
const al03 = new Alarms(generateAlarms(3, 1, 64, str.alarms1), 'EVT3')
const al04 = new Alarms(generateAlarms(4, 1, 64, str.alarms4), 'IVT1')
const al05 = new Alarms(generateAlarms(5, 1, 64, str.alarms4), 'IVT2')
const al06 = new Alarms(generateAlarms(6, 1, 64, str.alarms4), 'IVT3')
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

const {
  S7_521_1BL00_0AB0,
  S7_521_1BH00_0AB0,
  S7_522_1BH01_0AB0,
  S7_522_1BL01_0AB0,
  S7_131_6BF00_0BA0,
  S7_132_6BF00_0BA0
} = require('../../models/modules')

const rack1 = {
  nr: 1,
  serie: 'et200m',
  title: 'Main',
  cards: [
    new S7_521_1BL00_0AB0(1, eb.slice(0, 4)),
    new S7_521_1BH00_0AB0(2, eb.slice(4, 6)),
    new S7_522_1BL01_0AB0(3, ab.slice(0, 4)),
    new S7_522_1BH01_0AB0(4, ab.slice(4, 6))
  ]
}

const rack2 = {
  nr: 2,
  serie: 'et200m',
  title: 'LS1',
  cards: [
    new S7_521_1BL00_0AB0(1, eb.slice(6, 10)),
    new S7_521_1BL00_0AB0(2, eb.slice(10, 14)),
    new S7_522_1BL01_0AB0(3, ab.slice(6, 10))
  ]
}

const rack3 = {
  nr: 3,
  serie: 'et200s',
  title: 'KKM1',
  cards: [
    new S7_131_6BF00_0BA0(1, eb[14]),
    new S7_131_6BF00_0BA0(2, eb[15]),
    new S7_131_6BF00_0BA0(3, eb[16]),
    new S7_132_6BF00_0BA0(4, ab[10]),
    new S7_132_6BF00_0BA0(5, ab[11])
  ]
}

const rack4 = {
  nr: 4,
  serie: 'et200m',
  title: 'LS2',
  cards: [
    new S7_521_1BL00_0AB0(1, eb.slice(17, 21)),
    new S7_521_1BL00_0AB0(2, eb.slice(21, 25)),
    new S7_522_1BL01_0AB0(3, ab.slice(12, 16))
  ]
}

const rack5 = {
  nr: 5,
  serie: 'et200s',
  title: 'KKM2',
  cards: [
    new S7_131_6BF00_0BA0(1, eb[25]),
    new S7_131_6BF00_0BA0(2, eb[26]),
    new S7_131_6BF00_0BA0(3, eb[27]),
    new S7_132_6BF00_0BA0(4, ab[16]),
    new S7_132_6BF00_0BA0(5, ab[17])
  ]
}

const rack6 = {
  nr: 6,
  serie: 'et200m',
  title: 'LS3',
  cards: [
    new S7_521_1BL00_0AB0(1, eb.slice(28, 32)),
    new S7_521_1BL00_0AB0(2, eb.slice(32, 36)),
    new S7_522_1BL01_0AB0(3, ab.slice(18, 22))
  ]
}

const rack7 = {
  nr: 7,
  serie: 'et200s',
  title: 'KKM3',
  cards: [
    new S7_131_6BF00_0BA0(1, eb[36]),
    new S7_131_6BF00_0BA0(2, eb[37]),
    new S7_131_6BF00_0BA0(3, eb[38]),
    new S7_132_6BF00_0BA0(4, ab[22]),
    new S7_132_6BF00_0BA0(5, ab[23])
  ]
}

const rack8 = {
  nr: 8,
  serie: 'et200m',
  title: 'LS4',
  cards: [
    new S7_521_1BL00_0AB0(1, eb.slice(39, 43)),
    new S7_522_1BH01_0AB0(2, ab.slice(24, 26))
  ]
}

const rack9 = {
  nr: 9,
  serie: 'et200s',
  title: 'KKP4',
  cards: [
    new S7_131_6BF00_0BA0(1, eb[43]),
    new S7_131_6BF00_0BA0(2, eb[44]),
    new S7_132_6BF00_0BA0(3, ab[26])
  ]
}

const rack10 = {
  nr: 10,
  serie: 'et200s',
  title: 'SH4',
  cards: [
    new S7_131_6BF00_0BA0(1, eb[45]),
    new S7_131_6BF00_0BA0(2, eb[46]),
    new S7_131_6BF00_0BA0(3, eb[47]),
    new S7_131_6BF00_0BA0(4, eb[48]),
    new S7_131_6BF00_0BA0(5, eb[49]),
    new S7_132_6BF00_0BA0(1, ab[27]),
    new S7_132_6BF00_0BA0(2, ab[28]),
    new S7_132_6BF00_0BA0(3, ab[29])
  ]
}

const rack11 = {
  nr: 11,
  serie: 'et200m',
  title: 'LS5',
  cards: [
    new S7_521_1BL00_0AB0(1, eb.slice(50, 54)),
    new S7_522_1BH01_0AB0(2, ab.slice(30, 32))
  ]
}

const rack12 = {
  nr: 12,
  serie: 'et200s',
  title: 'KKP5',
  cards: [
    new S7_131_6BF00_0BA0(1, eb[54]),
    new S7_131_6BF00_0BA0(2, eb[55]),
    new S7_132_6BF00_0BA0(3, ab[32])
  ]
}

const rack13 = {
  nr: 13,
  serie: 'et200s',
  title: 'SH5',
  cards: [
    new S7_131_6BF00_0BA0(1, eb[56]),
    new S7_131_6BF00_0BA0(2, eb[57]),
    new S7_131_6BF00_0BA0(3, eb[58]),
    new S7_131_6BF00_0BA0(4, eb[59]),
    new S7_131_6BF00_0BA0(5, eb[60]),
    new S7_132_6BF00_0BA0(1, ab[33]),
    new S7_132_6BF00_0BA0(2, ab[34]),
    new S7_132_6BF00_0BA0(3, ab[35])
  ]
}

const rack14 = {
  nr: 14,
  serie: 'et200m',
  title: 'LS6',
  cards: [
    new S7_521_1BL00_0AB0(1, eb.slice(61, 65)),
    new S7_522_1BH01_0AB0(2, ab.slice(36, 38))
  ]
}

const rack15 = {
  nr: 15,
  serie: 'et200s',
  title: 'KKP6',
  cards: [
    new S7_131_6BF00_0BA0(1, eb[65]),
    new S7_131_6BF00_0BA0(2, eb[66]),
    new S7_132_6BF00_0BA0(3, ab[38])
  ]
}

const rack16 = {
  nr: 16,
  serie: 'et200s',
  title: 'SH6',
  cards: [
    new S7_131_6BF00_0BA0(1, eb[67]),
    new S7_131_6BF00_0BA0(2, eb[68]),
    new S7_131_6BF00_0BA0(3, eb[69]),
    new S7_131_6BF00_0BA0(4, eb[70]),
    new S7_131_6BF00_0BA0(5, eb[71]),
    new S7_132_6BF00_0BA0(1, ab[39]),
    new S7_132_6BF00_0BA0(2, ab[40]),
    new S7_132_6BF00_0BA0(3, ab[41])
  ]
}

exports.racks = [
  rack1,
  rack2,
  rack3,
  rack4,
  rack5,
  rack6,
  rack7,
  rack8,
  rack9,
  rack10,
  rack11,
  rack12,
  rack13,
  rack14,
  rack15,
  rack16
]

const merkers = generateBits('M', 0, 7)
exports.merkers = merkers
const mb = generateBytes(merkers)
exports.mb = mb

const cards = generateCards(def)
exports.cards = cards

const devices = generateDevices(def)
exports.devices = devices

const positions = generatePositions(def)
exports.positions = positions

const queue = generateQueue(def)
exports.queue = queue

const evt1 = require('./obj/evt1')
const evt2 = require('./obj/evt2')
const evt3 = require('./obj/evt3')
const ivt1 = require('./obj/ivt1')
const ivt2 = require('./obj/ivt2')
const ivt3 = require('./obj/ivt3')
exports.overview = {
  definitions: { cards: def.CARDS, stalls: def.STALLS },
  devices: [evt1, evt2, evt3, ivt1, ivt2, ivt3],
  exitQueue: {
    queueList: queue,
    exitButton: { enable: merkers.find(b => b.addr === 'M3.0') }
  }
}

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
  occupancy: { free: 0, busy: 0, locked: 0 }
}
