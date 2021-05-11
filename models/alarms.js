const format = require('date-fns/format')
const util = require('util')
const { getPlcDateTime } = require('../lib/utils7')

class Alarm {
  constructor (id, device, status) {
    this.id = id
    this.device = device
    this.status = status
  }

  get _i18n () {
    return this.i18n
  }

  set _i18n (obj) {
    if (obj) {
      this.i18n = obj
    }
  }

  update (buffer) {
    this.status = (buffer[0] & 1) === 1
    this.date = format(
      getPlcDateTime(buffer.readInt16BE(2), buffer.readInt32BE(4)),
      'yyyy-MM-dd HH:mm:ss:SSS'
    )
  }
}

class Alarms {
  constructor (alarms = [], name) {
    this.alarms = alarms
    this.name = name
  }

  get _active () {
    return this.alarms
      .filter(item => item.status !== false)
      .sort((a, b) => new Date(b.date) - new Date(a.date))
  }

  set _active (alarms) {
    this.active = alarms.filter(item => item.status !== false)
  }
}

const generateAlarms = (device, min, max, str) => {
  const alarms = []
  for (let i = min; i <= max; i++) {
    alarms.push(new Alarm(i, device, false))
  }
  alarms.forEach((alarm, index) => {
    alarm.label = str[index].label
    alarm._i18n = str[index].i18n
  })
  return alarms
}

const updateAlarms = util.promisify(
  (start, buffer, offset, alarms, callback) => {
    let byte = start
    for (let i = 0; i < alarms.length; i++) {
      alarms[i].update(buffer.slice(byte, byte + offset))
      byte += offset
    }
    callback(null, alarms)
  }
)

const countAlarms = alarms => {
  let count = 0
  alarms.forEach(group => {
    count += group._active.length
  })
  return count
}

module.exports = { Alarms, countAlarms, generateAlarms, updateAlarms }
