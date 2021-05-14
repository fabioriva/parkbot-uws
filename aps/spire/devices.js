const obj = require('./obj')

const silomat1 = [
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

const info1 = [
  obj.inputs.find(b => b.addr === 'E103.3'),
  obj.outputs.find(b => b.addr === 'A100.7'),
  obj.outputs.find(b => b.addr === 'A100.6'),
  obj.inputs.find(b => b.addr === 'E112.3'),
  obj.merkers.find(b => b.addr === 'M0.1'),
  obj.merkers.find(b => b.addr === 'M0.2')
]

const device1 = {
  a: obj.devices[0],
  b: obj.positions.slice(0, 2),
  c: info1,
  d: [],
  e: silomat1
}

const silomat2 = [
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

const info2 = [
  obj.inputs.find(b => b.addr === 'E203.3'),
  obj.outputs.find(b => b.addr === 'A200.7'),
  obj.outputs.find(b => b.addr === 'A200.6'),
  obj.inputs.find(b => b.addr === 'E212.3'),
  obj.merkers.find(b => b.addr === 'M0.1'),
  obj.merkers.find(b => b.addr === 'M0.2')
]

const device2 = {
  a: obj.devices[1],
  b: obj.positions.slice(2, 4),
  c: info2,
  d: [],
  e: silomat2
}

const silomat3 = [
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

const info3 = [
  obj.inputs.find(b => b.addr === 'E303.3'),
  obj.outputs.find(b => b.addr === 'A300.7'),
  obj.outputs.find(b => b.addr === 'A300.6'),
  obj.inputs.find(b => b.addr === 'E312.3'),
  obj.merkers.find(b => b.addr === 'M0.1'),
  obj.merkers.find(b => b.addr === 'M0.2')
]

const device3 = {
  a: obj.devices[2],
  b: obj.positions.slice(4, 6),
  c: info3,
  d: [],
  e: silomat3
}

const silomat4 = [
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

const info4 = [
  obj.inputs.find(b => b.addr === 'E401.3'),
  obj.outputs.find(b => b.addr === 'A400.7'),
  obj.outputs.find(b => b.addr === 'A400.6'),
  obj.inputs.find(b => b.addr === 'E412.3'),
  obj.merkers.find(b => b.addr === 'M0.1'),
  obj.merkers.find(b => b.addr === 'M0.2')
]

const device4 = {
  a: obj.devices[3],
  b: obj.positions.slice(6, 10),
  c: info4,
  d: [],
  e: silomat4
}

const silomat5 = [
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

const info5 = [
  obj.inputs.find(b => b.addr === 'E501.3'),
  obj.outputs.find(b => b.addr === 'A500.7'),
  obj.outputs.find(b => b.addr === 'A500.6'),
  obj.inputs.find(b => b.addr === 'E512.3'),
  obj.merkers.find(b => b.addr === 'M0.1'),
  obj.merkers.find(b => b.addr === 'M0.2')
]

const device5 = {
  a: obj.devices[4],
  b: obj.positions.slice(10, 14),
  c: info5,
  d: [],
  e: silomat5
}

const silomat6 = [
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

const info6 = [
  obj.inputs.find(b => b.addr === 'E601.3'),
  obj.outputs.find(b => b.addr === 'A600.7'),
  obj.outputs.find(b => b.addr === 'A600.6'),
  obj.inputs.find(b => b.addr === 'E612.3'),
  obj.merkers.find(b => b.addr === 'M0.1'),
  obj.merkers.find(b => b.addr === 'M0.2')
]

const device6 = {
  a: obj.devices[5],
  b: obj.positions.slice(14, 18),
  c: info6,
  d: [],
  e: silomat6
}

module.exports = [device1, device2, device3, device4, device5, device6]
