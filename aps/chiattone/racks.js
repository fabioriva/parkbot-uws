const { ab, eb } = require('./obj')
const {
  S7_521_1BL00_0AB0,
  S7_522_1BL01_0AB0,
  S7_521_1BH00_0AB0
} = require('../../models/modules')

const rack1 = {
  nr: 1,
  serie: 'et200m',
  title: 'LS',
  cards: [
    new S7_521_1BL00_0AB0(1, eb.slice(0, 4)),
    new S7_521_1BL00_0AB0(2, eb.slice(4, 8)),
    new S7_521_1BH00_0AB0(3, eb.slice(8, 10)),
    new S7_522_1BL01_0AB0(4, ab.slice(0, 4)),
    new S7_521_1BL00_0AB0(5, eb.slice(10, 14)),
    new S7_522_1BL01_0AB0(6, ab.slice(4, 8))
  ]
}

const rack2 = {
  nr: 2,
  serie: 'et200m',
  title: 'SH2',
  cards: [
    new S7_521_1BL00_0AB0(1, eb.slice(14, 18)),
    new S7_522_1BL01_0AB0(2, ab.slice(8, 12))
  ]
}

const rack3 = {
  nr: 3,
  serie: 'et200m',
  title: 'SH3',
  cards: [
    new S7_521_1BL00_0AB0(1, eb.slice(18, 22)),
    new S7_522_1BL01_0AB0(2, ab.slice(12, 16))
  ]
}

module.exports = [rack1, rack2, rack3]
