const { inputs, outputs } = require('./obj')
const { Flap, Lock } = require('../../models/motors')

const FTXV = inputs.find(b => b.addr === 'E111.6')
const FTXH = inputs.find(b => b.addr === 'E111.7')
const EM = inputs.find(b => b.addr === 'E111.0')
const LC = [FTXV, FTXH, EM]

/**
 * Flap
 */
const ECA = inputs.find(b => b.addr === 'E110.0')
const ECB = inputs.find(b => b.addr === 'E110.1')
const AMC = inputs.find(b => b.addr === 'E110.2')
const SCA = outputs.find(b => b.addr === 'A111.2')
const SCB = outputs.find(b => b.addr === 'A111.3')

const M1 = new Flap(
  1,
  { key: 'mot-flap', query: { nr: 1 } },
  [ECA, ECB, AMC, ...LC],
  [SCA, SCB]
)

/**
 * Lock
 */
const EOM = inputs.find(b => b.addr === 'E110.3')
const EZM = inputs.find(b => b.addr === 'E110.4')
const AMM = inputs.find(b => b.addr === 'E110.5')
const SMA = outputs.find(b => b.addr === 'A111.0')
const SMB = outputs.find(b => b.addr === 'A111.1')

const M2 = new Lock(
  2,
  { key: 'mot-lock', query: { nr: 1 } },
  [EOM, EZM, AMM, ...LC],
  [SMA, SMB]
)

module.exports = [M1, M2]
