const obj = require('../obj')

const silomat = [
  obj.inputs.find(b => b.addr === 'E112.0'),
  obj.inputs.find(b => b.addr === 'E112.1'),
  obj.inputs.find(b => b.addr === 'E112.2'),
  obj.inputs.find(b => b.addr === 'E112.3'),
  obj.inputs.find(b => b.addr === 'E112.4'),
  obj.inputs.find(b => b.addr === 'E112.5'),
  obj.inputs.find(b => b.addr === 'E112.6'),
  obj.inputs.find(b => b.addr === 'E112.7'),
  obj.outputs.find(b => b.addr === 'A100.0'),
  obj.outputs.find(b => b.addr === 'A110.2'),
  obj.outputs.find(b => b.addr === 'A110.3'),
  obj.outputs.find(b => b.addr === 'A110.4'),
  obj.outputs.find(b => b.addr === 'A110.5'),
  obj.outputs.find(b => b.addr === 'A110.6')
]

const info = [
  obj.inputs.find(b => b.addr === 'E103.3'),
  obj.outputs.find(b => b.addr === 'A100.7'),
  obj.outputs.find(b => b.addr === 'A100.6'),
  obj.inputs.find(b => b.addr === 'E112.3'),
  obj.merkers.find(b => b.addr === 'M0.1'),
  obj.merkers.find(b => b.addr === 'M0.2')
]

const device = {
  a: obj.devices[0],
  b: obj.positions.slice(0, 2),
  c: info,
  d: [],
  e: silomat
}

module.exports = device
