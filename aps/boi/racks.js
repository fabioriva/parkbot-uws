const { ab, eb } = require('./obj')
const {
  S7_131_6BH01_0BA0,
  S7_132_6BH01_0BA0
} = require('../../models/modules')

const rack1 = {
  nr: 1,
  serie: 'et200s',
  title: 'Main',
  cards: [
    new S7_131_6BH01_0BA0(1, eb.slice(0, 2)),
    new S7_132_6BH01_0BA0(2, ab.slice(0, 2))
  ]
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
  title: 'KKE1',
  cards: [
    new S7_131_6BH01_0BA0(1, eb.slice(4, 6)),
    new S7_131_6BH01_0BA0(2, eb.slice(6, 8)),
    new S7_131_6BH01_0BA0(3, eb.slice(8, 10)),
    new S7_132_6BH01_0BA0(4, ab.slice(4, 6)),
    new S7_132_6BH01_0BA0(5, ab.slice(6, 8))
  ]
}

const rack4 = {
  nr: 4,
  serie: 'et200s',
  title: 'KKP1',
  cards: [
    new S7_131_6BH01_0BA0(1, eb.slice(10, 12)),
    new S7_131_6BH01_0BA0(2, eb.slice(12, 14)),
    new S7_132_6BH01_0BA0(3, ab.slice(8, 10))
  ]
}

const rack5 = {
  nr: 5,
  serie: 'et200s',
  title: 'LSA',
  cards: [
    new S7_131_6BH01_0BA0(1, eb.slice(14, 16)),
    new S7_132_6BH01_0BA0(2, ab.slice(10, 12))
  ]
}

const rack6 = {
  nr: 6,
  serie: 'et200s',
  title: 'KKPA',
  cards: [
    new S7_131_6BH01_0BA0(1, eb.slice(16, 18)),
    new S7_132_6BH01_0BA0(2, ab.slice(12, 14))
  ]
}

const rack7 = {
  nr: 7,
  serie: 'et200s',
  title: 'SHA',
  cards: [
    new S7_131_6BH01_0BA0(1, eb.slice(18, 20)),
    new S7_131_6BH01_0BA0(2, eb.slice(20, 22)),
    new S7_131_6BH01_0BA0(3, eb.slice(22, 24)),
    new S7_132_6BH01_0BA0(4, ab.slice(14, 16)),
    new S7_132_6BH01_0BA0(5, ab.slice(16, 18))
  ]
}

const rack8 = {
  nr: 8,
  serie: 'et200s',
  title: 'LS2',
  cards: [
    new S7_131_6BH01_0BA0(1, eb.slice(24, 26)),
    new S7_132_6BH01_0BA0(2, ab.slice(18, 20))
  ]
}

const rack9 = {
  nr: 9,
  serie: 'et200s',
  title: 'KKE2',
  cards: [
    new S7_131_6BH01_0BA0(1, eb.slice(26, 28)),
    new S7_131_6BH01_0BA0(2, eb.slice(28, 30)),
    new S7_131_6BH01_0BA0(3, eb.slice(30, 32)),
    new S7_132_6BH01_0BA0(4, ab.slice(20, 22)),
    new S7_132_6BH01_0BA0(5, ab.slice(22, 24))
  ]
}

const rack10 = {
  nr: 10,
  serie: 'et200s',
  title: 'KKP2',
  cards: [
    new S7_131_6BH01_0BA0(1, eb.slice(32, 34)),
    new S7_131_6BH01_0BA0(2, eb.slice(34, 36)),
    new S7_132_6BH01_0BA0(3, ab.slice(24, 26))
  ]
}

const rack11 = {
  nr: 11,
  serie: 'et200s',
  title: 'LSB',
  cards: [
    new S7_131_6BH01_0BA0(1, eb.slice(36, 38)),
    new S7_132_6BH01_0BA0(2, ab.slice(26, 28))
  ]
}

const rack12 = {
  nr: 12,
  serie: 'et200s',
  title: 'KKPB',
  cards: [
    new S7_131_6BH01_0BA0(1, eb.slice(38, 40)),
    new S7_132_6BH01_0BA0(2, ab.slice(28, 30))
  ]
}

const rack13 = {
  nr: 13,
  serie: 'et200s',
  title: 'SHB',
  cards: [
    new S7_131_6BH01_0BA0(1, eb.slice(40, 42)),
    new S7_131_6BH01_0BA0(2, eb.slice(42, 44)),
    new S7_131_6BH01_0BA0(3, eb.slice(44, 46)),
    new S7_132_6BH01_0BA0(4, ab.slice(30, 32)),
    new S7_132_6BH01_0BA0(5, ab.slice(32, 34))
  ]
}

module.exports = [rack1, rack2, rack3, rack4, rack5, rack6, rack7, rack8, rack9, rack10, rack11, rack12, rack13]
