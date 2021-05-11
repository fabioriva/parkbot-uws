const obj = require('../obj')

const silomat = [
  obj.inputs.find(b => b.addr === 'E612.0'),
  obj.inputs.find(b => b.addr === 'E612.1'),
  obj.inputs.find(b => b.addr === 'E612.2'),
  obj.inputs.find(b => b.addr === 'E612.3'),
  obj.inputs.find(b => b.addr === 'E612.4'),
  obj.inputs.find(b => b.addr === 'E612.5'),
  obj.inputs.find(b => b.addr === 'E612.6'),
  obj.inputs.find(b => b.addr === 'E612.7'),
  obj.outputs.find(b => b.addr === 'A611.1'),
  obj.outputs.find(b => b.addr === 'A611.2'),
  obj.outputs.find(b => b.addr === 'A611.3'),
  obj.outputs.find(b => b.addr === 'A611.4'),
  obj.outputs.find(b => b.addr === 'A611.5'),
  obj.outputs.find(b => b.addr === 'A611.6')
]

const info = [
  obj.inputs.find(b => b.addr === 'E603.3'),
  obj.outputs.find(b => b.addr === 'A600.7'),
  obj.outputs.find(b => b.addr === 'A600.6'),
  obj.inputs.find(b => b.addr === 'E612.3'),
  obj.merkers.find(b => b.addr === 'M0.1'),
  obj.merkers.find(b => b.addr === 'M0.2')
]

const device = {
  a: obj.devices[5],
  b: obj.positions.slice(14, 18),
  c: info,
  d: [],
  e: silomat
}

module.exports = device
