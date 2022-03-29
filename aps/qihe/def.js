exports.PORT = 49018
exports.HOST =
  process.env.NODE_ENV !== 'production'
    ? process.env.DEVELOPMENT_SERVER
    : process.env.PRODUCTION_SERVER
exports.HTTP = 9012
exports.PLC = {
  ip: '192.168.77.2',
  rack: 0,
  slot: 1,
  polling_time: 500
}

exports.QUEUE_LEN = 5

const ALARM_LEN = 8
exports.ALARM_LEN = ALARM_LEN
exports.DB_ALARM_INIT = 6
exports.DB_ALARM_LEN = 64 * ALARM_LEN
exports.DBS_ALARM = [531, 532, 533, 534, 535, 536, 537, 538, 539, 540]

const CARDS = 145
const CARD_LEN = 10
exports.CARDS = CARDS
exports.CARD_LEN = CARD_LEN

const DB_DATA = 505
const DB_DATA_LEN = 332
exports.DB_DATA_INIT_DEVICE = 32
exports.DB_DATA_INIT_POS = 192
exports.DB_DATA_INIT_QUEUE = 216
exports.DB_DATA_INIT_AB = 236
exports.DB_DATA_INIT_EB = 272
exports.DB_DATA_INIT_MB = 324
exports.DATA_READ = {
  area: 0x84,
  dbNumber: DB_DATA,
  start: 0,
  amount: DB_DATA_LEN,
  wordLen: 0x02
}

const STALLS = 145
const STALL_LEN = 10
exports.STALLS = STALLS
exports.STALL_LEN = STALL_LEN
exports.STALL_STATUS = {
  FREE: 0,
  PAPA: 997,
  RSVD: 998,
  LOCK: 999
}

exports.ACTIVATE = {
  area: 0x84,
  dbNumber: DB_DATA,
  start: 331 * 8 + 6, // Offset 331.6 (M7.6)
  amount: 1,
  wordLen: 0x01 // Bit (inside a word)
}

exports.CARD_READ = {
  area: 0x84,
  dbNumber: 511,
  start: 0,
  amount: CARDS * CARD_LEN,
  wordLen: 0x02
}
exports.CARD_EDIT = {
  area: 0x84,
  dbNumber: DB_DATA,
  start: 356,
  amount: 4,
  wordLen: 0x02
}
exports.MAP_READ = {
  area: 0x84,
  dbNumber: 510,
  start: 0,
  amount: STALLS * STALL_LEN,
  wordLen: 0x02
}
exports.MAP_EDIT = {
  area: 0x84,
  dbNumber: DB_DATA,
  start: 352,
  amount: 4,
  wordLen: 0x02
}
exports.QUEUE_DELETE = {
  area: 0x84,
  dbNumber: DB_DATA,
  start: 360,
  amount: 4,
  wordLen: 0x02
}
exports.REQ_0 = {
  area: 0x84,
  dbNumber: DB_DATA,
  start: 364,
  amount: 2,
  wordLen: 0x02
}
exports.REQ_1 = {
  area: 0x84,
  dbNumber: DB_DATA,
  start: 366,
  amount: 2,
  wordLen: 0x02
}
exports.REQ_2 = {
  area: 0x84,
  dbNumber: DB_DATA,
  start: 368,
  amount: 2,
  wordLen: 0x02
}
exports.REQ_3 = {
  area: 0x84,
  dbNumber: DB_DATA,
  start: 370,
  amount: 2,
  wordLen: 0x02
}
exports.REQ_4 = {
  area: 0x84,
  dbNumber: DB_DATA,
  start: 372,
  amount: 2,
  wordLen: 0x02
}
