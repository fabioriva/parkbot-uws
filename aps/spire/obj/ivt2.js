const obj = require('../obj')

const silomat = [
  obj.inputs.find(b => b.addr === 'E512.0'),
  obj.inputs.find(b => b.addr === 'E512.1'),
  obj.inputs.find(b => b.addr === 'E512.2'),
  obj.inputs.find(b => b.addr === 'E512.3'),
  obj.inputs.find(b => b.addr === 'E512.4'),
  obj.inputs.find(b => b.addr === 'E512.5'),
  obj.inputs.find(b => b.addr === 'E512.6'),
  obj.inputs.find(b => b.addr === 'E512.7'),
  obj.outputs.find(b => b.addr === 'A511.1'),
  obj.outputs.find(b => b.addr === 'A511.2'),
  obj.outputs.find(b => b.addr === 'A511.3'),
  obj.outputs.find(b => b.addr === 'A511.4'),
  obj.outputs.find(b => b.addr === 'A511.5'),
  obj.outputs.find(b => b.addr === 'A511.6')
]

const info = [
  obj.inputs.find(b => b.addr === 'E503.3'),
  obj.outputs.find(b => b.addr === 'A500.7'),
  obj.outputs.find(b => b.addr === 'A500.6'),
  obj.inputs.find(b => b.addr === 'E512.3'),
  obj.merkers.find(b => b.addr === 'M0.1'),
  obj.merkers.find(b => b.addr === 'M0.2')
]

const device = {
  a: obj.devices[4],
  b: obj.positions.slice(10, 14),
  c: info,
  d: [],
  e: silomat
}

module.exports = device
