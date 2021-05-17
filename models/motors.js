const util = require('util')
const { generateBits } = require('./bits')

class Motor {
  constructor (id, name, m1, m2, p1, p2, en, bwd, fwd, th, enable, thermic) {
    this.id = id
    this.name = name
    this.motor = [m1, m2, p1, p2, en, bwd, fwd, th]
    this.enable = enable // .map(bit => Object.assign({}, bit))
    this.thermic = thermic // .map(bit => Object.assign({}, bit))
  }

  get info () {
    return {
      id: this.id,
      name: this.name,
      motion: this.motion,
      position: this.position,
      enable: this.enable.filter(item => item.status !== false),
      thermic: this.thermic.filter(item => item.status !== false)
    }
  }

  diagnostic () {
    const en = this.motor[4]
    // if ((!en.status && bwd.status) || (!en.status && fwd.status)) {
    if (!en.status) {
      this.enable.forEach((item, key) => console.log(item, key))
    }
    const th = this.motor[7]
    if (!th.status) {
      this.thermic.forEach((item, key) => console.log(item, key))
    }
  }

  motion_ (bwd, fwd) {
    const m1 = this.motor[0]
    const m2 = this.motor[1]
    if (!m1.status && !m2.status) {
      this.motion = { id: 0, i18n: 'motion-no' }
    } else if (m1.status && !m2.status) {
      this.motion = { id: 1, i18n: bwd }
    } else if (m2.status && !m1.status) {
      this.motion = { id: 2, i18n: fwd }
    } else {
      this.motion = { id: 3, i18n: 'motion-err' }
    }
    // console.log(this.name, this.motion)
  }

  position_ (pos1, pos2) {
    const p1 = this.motor[2]
    const p2 = this.motor[3]
    if (!p1.status && !p2.status) {
      this.position = { id: 0, i18n: 'position-no' }
    } else if (p1.status && !p2.status) {
      this.position = { id: 1, i18n: pos1 }
    } else if (p2.status && !p1.status) {
      this.position = { id: 2, i18n: pos2 }
    } else {
      this.position = { id: 3, i18n: 'position-err' }
    }
    // console.log(this.name, this.position)
  }

  update (buffer) {
    let mask
    mask = 1
    for (let i = 0; i < this.motor.length; i++) {
      this.motor[i].status = buffer[0] & mask ? 1 : 0
      mask *= 2
    }
    mask = 1
    for (let i = 0; i < this.enable.length; i++) {
      if (this.enable[i].status !== undefined) {
        this.enable[i].status = buffer[1] & mask ? 1 : 0
      }
      mask *= 2
    }
  }
}

class Flap extends Motor {
  motion__ () {
    this.motion_('motion-down', 'motion-up')
  }

  position__ () {
    this.position_('position-high', 'position-low')
  }
}

const updateMotors = util.promisify(
  (start, buffer, offset, motors, callback) => {
    let byte = start
    for (let i = 0; i < motors.length; i++) {
      // console.log(motors[i])
      motors[i].update(buffer.slice(byte, byte + offset))
      motors[i].motion__()
      motors[i].position__()
      byte += offset
    }
    callback(null, motors)
  }
)

module.exports = { updateMotors, Flap }
