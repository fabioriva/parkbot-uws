exports.PORT = 49009
exports.HOST =
  process.env.NODE_ENV !== 'production'
    ? process.env.DEVELOPMENT_SERVER
    : process.env.PRODUCTION_SERVER
exports.HTTP = 9001
exports.PLC = {
  ip: '192.168.200.55',
  rack: 0,
  slot: 1,
  polling_time: 600
}

exports.QUEUE_LEN = 5

const ALARM_LEN = 8
exports.ALARM_LEN = ALARM_LEN
exports.DB_ALARM_INIT = 4
exports.DB_ALARM_LEN = 64 * ALARM_LEN
exports.DBS_ALARM = [531, 532, 533, 534, 535, 536]

const CARDS = 266
const CARD_LEN = 12
exports.CARDS = CARDS
exports.CARD_LEN = CARD_LEN

const DB_DATA = 506
const DB_DATA_LEN = 508
exports.DB_DATA_INIT_DEVICE = 32
exports.DB_DATA_INIT_POS = 248
exports.DB_DATA_INIT_QUEUE = 320
exports.DB_DATA_INIT_AB = 360
exports.DB_DATA_INIT_EB = 402
exports.DB_DATA_INIT_MB = 474
exports.DATA_READ = {
  area: 0x84,
  dbNumber: DB_DATA,
  start: 0,
  amount: DB_DATA_LEN,
  wordLen: 0x02
}

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

exports.CARD_READ = {
  area: 0x84,
  dbNumber: 512,
  start: 0,
  amount: CARDS * CARD_LEN,
  wordLen: 0x02
}
exports.CARD_EDIT = {
  area: 0x84,
  dbNumber: DB_DATA,
  start: 524,
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
  start: 520,
  amount: 4,
  wordLen: 0x02
}
exports.QUEUE_DELETE = {
  area: 0x84,
  dbNumber: DB_DATA,
  start: 528,
  amount: 4,
  wordLen: 0x02
}
exports.REQ_0 = {
  area: 0x84,
  dbNumber: DB_DATA,
  start: 532,
  amount: 2,
  wordLen: 0x02
}

const DB_DIAG = 509
const DB_DIAG_LEN = 150
exports.DB_DIAG_INIT_MOT = 0
exports.DB_DIAG_INIT_VFD = 30
exports.DIAG_READ = {
  area: 0x84,
  dbNumber: DB_DIAG,
  start: 0,
  amount: DB_DIAG_LEN,
  wordLen: 0x02
}
