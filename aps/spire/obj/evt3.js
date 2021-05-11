const obj = require('../obj')

const silomat = [
  obj.inputs.find(b => b.addr === 'E312.0'),
  obj.inputs.find(b => b.addr === 'E312.1'),
  obj.inputs.find(b => b.addr === 'E312.2'),
  obj.inputs.find(b => b.addr === 'E312.3'),
  obj.inputs.find(b => b.addr === 'E312.4'),
  obj.inputs.find(b => b.addr === 'E312.5'),
  obj.inputs.find(b => b.addr === 'E312.6'),
  obj.inputs.find(b => b.addr === 'E312.7'),
  obj.outputs.find(b => b.addr === 'A300.0'),
  obj.outputs.find(b => b.addr === 'A310.2'),
  obj.outputs.find(b => b.addr === 'A310.3'),
  obj.outputs.find(b => b.addr === 'A310.4'),
  obj.outputs.find(b => b.addr === 'A310.5'),
  obj.outputs.find(b => b.addr === 'A310.6')
]

const info = [
  obj.inputs.find(b => b.addr === 'E303.3'),
  obj.outputs.find(b => b.addr === 'A300.7'),
  obj.outputs.find(b => b.addr === 'A300.6'),
  obj.inputs.find(b => b.addr === 'E312.3'),
  obj.merkers.find(b => b.addr === 'M0.1'),
  obj.merkers.find(b => b.addr === 'M0.2')
]

const device = {
  a: obj.devices[2],
  b: obj.positions.slice(4, 6),
  c: info,
  d: [],
  e: silomat
}

module.exports = device
