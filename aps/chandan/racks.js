const { ab, eb } = require('./obj')
const {
  S7_523_1BL00_0AA0,
  S7_131_6BH01_0BA0,
  S7_132_6BH01_0BA0
} = require('../../models/modules')

const rack1 = {
  nr: 1,
  serie: 'et200m',
  title: 'CPU',
  cards: [new S7_523_1BL00_0AA0(1, eb.slice(0, 2))]
}

const rack2 = {
  nr: 2,
  serie: 'et200s',
  title: 'LS1',
  cards: [
    new S7_131_6BH01_0BA0(1, eb.slice(2, 4)),
    new S7_132_6BH01_0BA0(2, ab.slice(2, 4))
  ]
}

const rack3 = {
  nr: 3,
  serie: 'et200s',
  title: 'KK1',
  cards: [
    new S7_131_6BH01_0BA0(1, eb.slice(4, 6)),
    new S7_131_6BH01_0BA0(2, eb.slice(6, 8)),
    new S7_131_6BH01_0BA0(3, eb.slice(8, 10)),
    new S7_132_6BH01_0BA0(4, ab.slice(4, 6)),
    new S7_132_6BH01_0BA0(5, ab.slice(6, 8)),
    new S7_132_6BH01_0BA0(6, ab.slice(8, 10))
  ]
}

const rack4 = {
  nr: 4,
  serie: 'et200s',
  title: 'LS2',
  cards: [
    new S7_131_6BH01_0BA0(1, eb.slice(10, 12)),
    new S7_132_6BH01_0BA0(2, ab.slice(10, 12))
  ]
}

const rack5 = {
  nr: 5,
  serie: 'et200s',
  title: 'KK2',
  cards: [
    new S7_131_6BH01_0BA0(1, eb.slice(12, 14)),
    new S7_131_6BH01_0BA0(2, eb.slice(14, 16)),
    new S7_131_6BH01_0BA0(3, eb.slice(16, 18)),
    new S7_132_6BH01_0BA0(4, ab.slice(12, 14)),
    new S7_132_6BH01_0BA0(5, ab.slice(14, 16))
  ]
}

const rack6 = {
  nr: 6,
  serie: 'et200s',
  title: 'LSA',
  cards: [
    new S7_131_6BH01_0BA0(1, eb.slice(18, 20)),
    new S7_131_6BH01_0BA0(2, eb.slice(20, 22)),
    new S7_131_6BH01_0BA0(3, eb.slice(22, 24)),
    new S7_132_6BH01_0BA0(4, ab.slice(16, 18)),
    new S7_132_6BH01_0BA0(5, ab.slice(18, 20))
  ]
}

module.exports = [rack1, rack2, rack3, rack4, rack5, rack6]
