const { ab, eb } = require('./obj')
const {
  S7_521_1BL00_0AB0,
  S7_521_1BH00_0AB0,
  // S7_522_1BH01_0AB0,
  S7_522_1BL01_0AB0
} = require('../../models/modules')

const rack1 = {
  nr: 1,
  serie: 'et200m',
  title: 'Main',
  cards: [
    new S7_521_1BL00_0AB0(1, eb.slice(0, 4)),
    new S7_522_1BL01_0AB0(2, ab.slice(0, 4))
  ]
}

const rack2 = {
  nr: 2,
  serie: 'et200m',
  title: 'LS1',
  cards: [
    new S7_521_1BL00_0AB0(1, eb.slice(4, 8)),
    new S7_521_1BL00_0AB0(2, eb.slice(8, 12)),
    new S7_521_1BL00_0AB0(3, eb.slice(12, 16)),
    new S7_521_1BL00_0AB0(4, eb.slice(16, 20)),
    new S7_521_1BH00_0AB0(5, eb.slice(20, 22)),
    new S7_522_1BL01_0AB0(6, ab.slice(4, 8)),
    new S7_522_1BL01_0AB0(7, ab.slice(8, 12)),
    new S7_522_1BL01_0AB0(8, ab.slice(12, 16))
  ]
}

const rack3 = {
  nr: 3,
  serie: 'et200m',
  title: 'SH1',
  cards: [
    new S7_521_1BL00_0AB0(1, eb.slice(22, 26)),
    new S7_521_1BH00_0AB0(2, eb.slice(26, 28)),
    new S7_522_1BL01_0AB0(3, ab.slice(16, 20))
  ]
}

const rack4 = {
  nr: 4,
  serie: 'et200m',
  title: 'LS2',
  cards: [
    new S7_521_1BL00_0AB0(1, eb.slice(28, 32)),
    new S7_521_1BL00_0AB0(2, eb.slice(32, 36)),
    new S7_521_1BL00_0AB0(3, eb.slice(36, 40)),
    new S7_521_1BL00_0AB0(4, eb.slice(40, 44)),
    new S7_521_1BH00_0AB0(5, eb.slice(44, 46)),
    new S7_522_1BL01_0AB0(6, ab.slice(20, 24)),
    new S7_522_1BL01_0AB0(7, ab.slice(24, 28)),
    new S7_522_1BL01_0AB0(8, ab.slice(28, 32))
  ]
}

const rack5 = {
  nr: 5,
  serie: 'et200m',
  title: 'SH2',
  cards: [
    new S7_521_1BL00_0AB0(1, eb.slice(46, 50)),
    new S7_521_1BH00_0AB0(2, eb.slice(50, 52)),
    new S7_522_1BL01_0AB0(3, ab.slice(32, 36))
  ]
}

module.exports = [rack1, rack2, rack3, rack4, rack5]
