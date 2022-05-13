exports.APS = 'Jameson House (North)'
exports.PORT = 49024
exports.HOST =
  process.env.NODE_ENV !== 'production'
    ? process.env.DEVELOPMENT_SERVER
    : process.env.PRODUCTION_SERVER
exports.HTTP = 9019
const POLL_TIME = 600
exports.PLC = {
  ip: '140.80.15.12',
  rack: 0,
  slot: 2,
  polling_time: POLL_TIME
}

exports.QUEUE_LEN = 5

const ALARM_LEN = 8
exports.ALARM_LEN = ALARM_LEN
exports.DB_ALARM_INIT = 6
exports.DB_ALARM_LEN = 64 * ALARM_LEN
exports.DBS_ALARM = [531, 532, 533]

const DB_CARDS = 441
const CARDS = 242 // 292
const CARD_LEN = 10
exports.CARDS = CARDS
exports.CARD_LEN = CARD_LEN

const DB_DATA = 505
const DB_DATA_LEN = 148
exports.DB_DATA_INIT_DEVICE = 32
exports.DB_DATA_INIT_POS = 80
exports.DB_DATA_INIT_QUEUE = 96
exports.DB_DATA_INIT_AB = 116
exports.DB_DATA_INIT_EB = 126
exports.DB_DATA_INIT_MB = 140
exports.DATA_READ = {
  area: 0x84,
  dbNumber: DB_DATA,
  start: 0,
  amount: DB_DATA_LEN,
  wordLen: 0x02
}

const DB_MAP = 440
exports.DB_MAP = DB_MAP
const STALLS = 161
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
  dbNumber: DB_CARDS,
  start: 0,
  amount: CARDS * CARD_LEN,
  wordLen: 0x02
}
exports.CARD_EDIT = {
  area: 0x84,
  dbNumber: DB_DATA,
  start: 158,
  amount: 4,
  wordLen: 0x02
}
exports.MAP_READ = {
  area: 0x84,
  dbNumber: DB_MAP,
  start: 0,
  amount: STALLS * STALL_LEN,
  wordLen: 0x02
}
exports.MAP_EDIT = {
  area: 0x84,
  dbNumber: DB_DATA,
  start: 154,
  amount: 4,
  wordLen: 0x02
}
exports.QUEUE_DELETE = {
  area: 0x84,
  dbNumber: DB_DATA,
  start: 162,
  amount: 4,
  wordLen: 0x02
}
exports.REQ_0 = {
  area: 0x84,
  dbNumber: DB_DATA,
  start: 166,
  amount: 2,
  wordLen: 0x02
}

/**
 * PLC SH
 */

exports.PLC_SH = {
  ip: '140.80.15.13',
  rack: 0,
  slot: 2,
  polling_time: POLL_TIME
}
exports.DB_DATA_INIT_AB_SH = 32
exports.DB_DATA_INIT_EB_SH = 36
exports.DB_DATA_INIT_MB_SH = 42
exports.DATA_READ_SH = {
  area: 0x84,
  dbNumber: 505,
  start: 0,
  amount: 49,
  wordLen: 0x02
}
