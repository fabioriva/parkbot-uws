exports.APS = 'Spire'
exports.PORT = 49009
exports.HOST =
  process.env.NODE_ENV !== 'production'
    ? process.env.DEVELOPMENT_SERVER
    : process.env.PRODUCTION_SERVER
exports.HTTP = 9001
exports.PLC = {
  ip: '192.168.67.2',
  rack: 0,
  slot: 1,
  polling_time: 500
}

exports.QUEUE_LEN = 5

const ALARM_LEN = 8
exports.ALARM_LEN = ALARM_LEN
exports.DB_ALARM_INIT = 4
exports.DB_ALARM_LEN = 64 * ALARM_LEN
exports.DBS_ALARM = [531, 532, 533, 534, 535, 536]

const CARDS = 266
const CARD_LEN = 10
exports.CARDS = CARDS
exports.CARD_LEN = CARD_LEN

const DB_DATA = 505
const DB_DATA_LEN = 434
exports.DB_DATA_INIT_DEVICE = 32
exports.DB_DATA_INIT_POS = 128
exports.DB_DATA_INIT_QUEUE = 200
exports.DB_DATA_INIT_SCREEN = 240
exports.DB_DATA_INIT_AB = 270
exports.DB_DATA_INIT_EB = 328
exports.DB_DATA_INIT_MB = 426
exports.DATA_READ = {
  area: 0x84,
  dbNumber: DB_DATA,
  start: 0,
  amount: DB_DATA_LEN,
  wordLen: 0x02
}

const DB_MAP = 510
exports.DB_MAP = DB_MAP
const STALLS = 276
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
  start: 403 * 8 + 6, // Offset 403.6 (M7.6)
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
  start: 438,
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
  start: 434,
  amount: 4,
  wordLen: 0x02
}
exports.QUEUE_DELETE = {
  area: 0x84,
  dbNumber: DB_DATA,
  start: 442,
  amount: 4,
  wordLen: 0x02
}
exports.REQ_0 = {
  area: 0x84,
  dbNumber: DB_DATA,
  start: 446,
  amount: 2,
  wordLen: 0x02
}

const DB_DIAG = 506
const DB_DIAG_LEN = 222
exports.DB_DIAG_INIT_MOT = 0
exports.DB_DIAG_INIT_VFD = 54
exports.DB_DIAG_INIT_SIL = 174
exports.DIAG_READ = {
  area: 0x84,
  dbNumber: DB_DIAG,
  start: 0,
  amount: DB_DIAG_LEN,
  wordLen: 0x02
}

// exports.DSS_READ = { area: 0x84, dbNumber: 540, start: 0, amount: 30, wordLen: 0x02 }
