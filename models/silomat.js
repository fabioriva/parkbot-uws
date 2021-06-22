const { generateBits } = require('./bits')

class Silomat {
  constructor (id, name, inputs = [], outputs = [], sensors = []) {
    this.id = id
    this.name = name
    this.inputs = inputs
    this.outputs = outputs
    this.sensors = sensors
    this.motor = generateBits('M', 0, 0)
    this.flags = generateBits('M', 1, 1)
  }

  motion () {
    const T2 = this.outputs[0].status
    const TRA = this.outputs[1].status
    const TRB = this.outputs[2].status
    const KCS = this.outputs[3].status
    const KCV = this.outputs[4].status
    const KCH = this.outputs[5].status
    if (!T2 && !TRA && !TRB) {
      return { id: 0, i18n: 'motion-no' }
    } else if (T2) {
      return { id: 0, i18n: 'motion-traveling' }
    } else if (TRA && KCS) {
      return { id: 0, i18n: 'motion-up' }
    } else if (TRB && KCS) {
      return { id: 0, i18n: 'motion-down' }
    } else if (TRA && (KCV || KCH)) {
      return { id: 0, i18n: 'motion-opening' }
    } else if (TRB && (KCV || KCH)) {
      return { id: 0, i18n: 'motion-closing' }
    } else {
      return { id: 0, i18n: 'motion-err' }
    }
  }

  update (buffer) {
    let mask
    mask = 1
    for (let i = 0; i < this.motor.length; i++) {
      this.motor[i].status = buffer[0] & mask ? 1 : 0
      mask *= 2
    }
    mask = 1
    for (let i = 0; i < this.flags.length; i++) {
      this.flags[i].status = buffer[1] & mask ? 1 : 0
      mask *= 2
    }
  }
}

module.exports = { Silomat }
