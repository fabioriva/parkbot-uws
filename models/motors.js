const util = require('util')
const { generateBits } = require('./bits')

class Motor {
  constructor (id, name, inputs = [], outputs = []) {
    this.id = id
    this.name = name
    this.inputs = inputs
    this.outputs = outputs
    this.motor = generateBits('M', 0, 0)
    this.flags = generateBits('M', 1, 1)
  }

  get json () {
    return {
      id: this.id,
      name: this.name,
      motion: this.motion(),
      position: this.position(),
      inputs: this.inputs,
      outputs: this.outputs
    }
  }

  motion () {
    const m1 = this.motor[0]
    const m2 = this.motor[1]
    if (!m1.status && !m2.status) {
      return { id: 0, i18n: 'motion-no' }
    } else if (m1.status && !m2.status) {
      return { id: 1, i18n: this.motion_[0] }
    } else if (m2.status && !m1.status) {
      return { id: 2, i18n: this.motion_[1] }
    } else {
      return { id: 3, i18n: 'motion-err' }
    }
  }

  position () {
    const p1 = this.motor[2]
    const p2 = this.motor[3]
    if (!p1.status && !p2.status) {
      return { id: 0, i18n: 'position-no' }
    } else if (p1.status && !p2.status) {
      return { id: 1, i18n: this.position_[0] }
    } else if (p2.status && !p1.status) {
      return { id: 2, i18n: this.position_[1] }
    } else {
      return { id: 3, i18n: 'position-err' }
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
      if (this.flags[i].status !== undefined) {
        this.flags[i].status = buffer[1] & mask ? 1 : 0
      }
      mask *= 2
    }
  }
}

class Flap extends Motor {
  constructor (id, name, inputs = [], outputs = []) {
    super(id, name, inputs, outputs)
    this.motion_ = ['motion-down', 'motion-up']
    this.position_ = ['position-high', 'position-low']
  }
}

class Lock extends Motor {
  constructor (id, name, inputs = [], outputs = []) {
    super(id, name, inputs, outputs)
    this.motion_ = ['motion-lock', 'motion-unlock']
    this.position_ = ['position-locked', 'position-unlocked']
  }
}

const updateMotors = util.promisify(
  (start, buffer, offset, motors, callback) => {
    let byte = start
    for (let i = 0; i < motors.length; i++) {
      motors[i].update(buffer.slice(byte, byte + offset))
      byte += offset
    }
    callback(null, motors)
  }
)

module.exports = { updateMotors, Flap, Lock }
