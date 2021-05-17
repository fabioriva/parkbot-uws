const obj = require('./obj')
const { generateBits } = require('../../models/bits')
const { Flap } = require('../../models/motors')

const merkers = generateBits('M', 0, 0)
// console.log(merkers)

const FTXV = obj.inputs.find(b => b.addr === 'E111.6')
const FTXH = obj.inputs.find(b => b.addr === 'E111.7')
const EM = obj.inputs.find(b => b.addr === 'E111.0')
const LC = [FTXV, FTXH, EM]

// const ECA = obj.inputs.find(b => b.addr === 'E110.0')
// const ECB = obj.inputs.find(b => b.addr === 'E110.1')
const AMC = obj.inputs.find(b => b.addr === 'E110.2')
// const SCA = { ...obj.outputs.find(b => b.addr === 'A111.2'), i18n: 'motion-up' }
// const SCB = obj.outputs.find(b => b.addr === 'A111.3')

// console.log(SCA)

const M1 = new Flap(
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
  [...LC],
  [AMC]
)

console.log(M1.info)

const M2 = new Flap(
  2,
  { key: 'mot-flap', query: { nr: 2 } },
  { ...obj.inputs.find(b => b.addr === 'E112.0') },
  { ...obj.inputs.find(b => b.addr === 'E112.1') },
  { ...obj.inputs.find(b => b.addr === 'E112.2') },
  { ...obj.inputs.find(b => b.addr === 'E112.3') },
  merkers[4],
  merkers[5],
  merkers[6],
  merkers[7],
  [
    obj.inputs.find(b => b.addr === 'E111.0'),
    obj.inputs.find(b => b.addr === 'E111.1')
  ],
  [obj.inputs.find(b => b.addr === 'E111.2')]
)

module.exports = [M1, M2]
