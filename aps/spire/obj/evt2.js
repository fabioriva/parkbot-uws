const obj = require('../obj')

const silomat = [
  obj.inputs.find(b => b.addr === 'E212.0'),
  obj.inputs.find(b => b.addr === 'E212.1'),
  obj.inputs.find(b => b.addr === 'E212.2'),
  obj.inputs.find(b => b.addr === 'E212.3'),
  obj.inputs.find(b => b.addr === 'E212.4'),
  obj.inputs.find(b => b.addr === 'E212.5'),
  obj.inputs.find(b => b.addr === 'E212.6'),
  obj.inputs.find(b => b.addr === 'E212.7'),
  obj.outputs.find(b => b.addr === 'A200.0'),
  obj.outputs.find(b => b.addr === 'A210.2'),
  obj.outputs.find(b => b.addr === 'A210.3'),
  obj.outputs.find(b => b.addr === 'A210.4'),
  obj.outputs.find(b => b.addr === 'A210.5'),
  obj.outputs.find(b => b.addr === 'A210.6')
]

const info = [
  obj.inputs.find(b => b.addr === 'E203.3'),
  obj.outputs.find(b => b.addr === 'A200.7'),
  obj.outputs.find(b => b.addr === 'A200.6'),
  obj.inputs.find(b => b.addr === 'E212.3'),
  obj.merkers.find(b => b.addr === 'M0.1'),
  obj.merkers.find(b => b.addr === 'M0.2')
]

const device = {
  a: obj.devices[1],
  b: obj.positions.slice(2, 4),
  c: info,
  d: [],
  e: silomat
}

module.exports = device
