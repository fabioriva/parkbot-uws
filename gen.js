const fs = require('fs')

const BYTE_LEN = 8
const FILE = './chandan.js'

/**
 * PLC I/O
 */
generateBits('E', 0, 1, 'inputs1')
generateBits('E', 10, 17, 'inputs2')
generateBits('E', 20, 27, 'inputs3')
generateBits('E', 30, 35, 'inputs4')

generateBits('A', 0, 1, 'outputs1')
generateBits('A', 10, 17, 'outputs2')
generateBits('A', 20, 25, 'outputs3')
generateBits('A', 30, 33, 'outputs4')

function generateBits (type, min, max, name) {
  fs.appendFileSync(FILE, `exports.${name} = [\r\n`)
  for (let e = min; e <= max; e++) {
    for (let b = 0; b < BYTE_LEN; b++) {
      fs.appendFileSync(FILE, `  { addr: '${type}${e}.${b}', label: '' },\r\n`)
    }
  }
  fs.appendFileSync(FILE, ']\r\n')
}

/**
 * Alarms
 */
generateAlarms('1', 0, 64, 'alarms1')
generateAlarms('2', 0, 64, 'alarms2')
generateAlarms('A', 0, 64, 'alarms3')
function generateAlarms (group, min, max, name) {
  fs.appendFileSync(FILE, `exports.${name} = [\r\n`)
  for (let a = min; a < max; a++) {
    fs.appendFileSync(
      FILE,
      `  { class: '${group}', label: 'AL${a +
        1}', i18n: { key: '', query: {} } },\r\n`
    )
  }
  fs.appendFileSync(FILE, ']\r\n')
}
