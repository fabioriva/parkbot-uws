const fs = require('fs')

const FILE = 'generated.js'

// const args = process.argv.slice(2)

// generate(args[0], args[1], args[2], args[3])

fs.writeFileSync(FILE, '// generate I/O\n')

// generate('inputs1', 'E', 0, 9)
// generate('inputs2', 'E', 10, 17)
// generate('outputs1', 'A', 0, 5)
// generate('outputs2', 'A', 10, 13)

fs.writeFileSync(FILE, '// generate Alarms\n')

generateAlarms('ALARMS', 1, 128)

function generate (exports, type, from, to) {
  fs.appendFileSync(FILE, `exports.${exports} = [\n`)
  for (let byte = from; byte <= to; byte++) {
    for (let bit = 0; bit < 8; bit++) {
      fs.appendFileSync(FILE, `{ addr: '${type}${byte}.${bit}', label: '' },\n`)
    }
  }
  fs.appendFileSync(FILE, ']\n')
}

function generateAlarms (exports, from, to) {
  fs.appendFileSync(FILE, `exports.${exports} = [\n`)
  for (let al = from; al <= to; al++) {
      fs.appendFileSync(FILE, `{ id: ${al}, key: '', query: {} },\n`)
  }
  fs.appendFileSync(FILE, ']\n')
}

console.log(fs.readFileSync(FILE, 'utf8'))
