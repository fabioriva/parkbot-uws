const obj = require('./obj')
const { generateBits } = require('../../models/bits')
const { Flap } = require('../../models/motors')

const merkers = generateBits('M', 0, 0)

const flap = new Flap(
  1,
  { key: 'mot-flap', query: { nr: 1 } },
  { ...obj.inputs.find(b => b.addr === 'E112.0') },
  { ...obj.inputs.find(b => b.addr === 'E112.1') },
  { ...obj.inputs.find(b => b.addr === 'E112.2') },
  { ...obj.inputs.find(b => b.addr === 'E112.3') },
  merkers[0],
  merkers[1],
  merkers[2],
  merkers[3],
  [
    obj.inputs.find(b => b.addr === 'E111.0'),
    obj.inputs.find(b => b.addr === 'E111.1')
  ],
  [obj.inputs.find(b => b.addr === 'E111.2')]
)

console.log(flap)
flap.diagnostic()
flap.motion()
flap.position()
