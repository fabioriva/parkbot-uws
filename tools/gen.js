const fs = require('fs')

const FILE = 'generated.js'

// const args = process.argv.slice(2)

// generate(args[0], args[1], args[2], args[3])

// fs.writeFileSync(FILE, '// generate I/O\n')

// generate('inputs1', 'E', 0, 11)
// generate('inputs2', 'E', 24, 25)
// generate('inputs3', 'E', 0, 3)
// generate('inputs4', 'E', 4, 4)
// generate('outputs1', 'A', 4, 11)
// generate('outputs2', 'A', 24, 25)
// generate('outputs3', 'A', 0, 1)
// generate('outputs4', 'A', 4, 4)

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
