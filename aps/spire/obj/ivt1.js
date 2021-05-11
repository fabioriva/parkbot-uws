const obj = require('../obj')

const silomat = [
  obj.inputs.find(b => b.addr === 'E412.0'),
  obj.inputs.find(b => b.addr === 'E412.1'),
  obj.inputs.find(b => b.addr === 'E412.2'),
  obj.inputs.find(b => b.addr === 'E412.3'),
  obj.inputs.find(b => b.addr === 'E412.4'),
  obj.inputs.find(b => b.addr === 'E412.5'),
  obj.inputs.find(b => b.addr === 'E412.6'),
  obj.inputs.find(b => b.addr === 'E412.7'),
  obj.outputs.find(b => b.addr === 'A411.1'),
  obj.outputs.find(b => b.addr === 'A411.2'),
  obj.outputs.find(b => b.addr === 'A411.3'),
  obj.outputs.find(b => b.addr === 'A411.4'),
  obj.outputs.find(b => b.addr === 'A411.5'),
  obj.outputs.find(b => b.addr === 'A411.6')
]

const info = [
  obj.inputs.find(b => b.addr === 'E403.3'),
  obj.outputs.find(b => b.addr === 'A400.7'),
  obj.outputs.find(b => b.addr === 'A400.6'),
  obj.inputs.find(b => b.addr === 'E412.3'),
  obj.merkers.find(b => b.addr === 'M0.1'),
  obj.merkers.find(b => b.addr === 'M0.2')
]

const device = {
  a: obj.devices[3],
  b: obj.positions.slice(6, 10),
  c: info,
  d: [],
  e: silomat
}

module.exports = device
