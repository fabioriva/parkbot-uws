const fs = require('fs')

const FILE = 'generated.js'

// const args = process.argv.slice(2)

// generate(args[0], args[1], args[2], args[3])

fs.writeFileSync(FILE, '// generate I/O\n')

generate('inputs1', 'E', 0, 1)
generate('inputs2', 'E', 100, 103)
generate('inputs3', 'E', 110, 115)
generate('inputs4', 'E', 120, 125)
generate('inputs5', 'E', 200, 203)
generate('inputs6', 'E', 210, 215)
generate('inputs7', 'E', 220, 225)
generate('inputs8', 'E', 300, 303)
generate('inputs9', 'E', 310, 315)
generate('inputs10', 'E', 320, 325)

generate('outputs1', 'A', 0, 1)
generate('outputs2', 'A', 100, 101)
generate('outputs3', 'A', 110, 113)
generate('outputs4', 'A', 120, 123)
generate('outputs5', 'A', 200, 201)
generate('outputs6', 'A', 210, 213)
generate('outputs7', 'A', 220, 223)
generate('outputs8', 'A', 300, 301)
generate('outputs9', 'A', 310, 313)
generate('outputs10', 'A', 320, 323)

// fs.writeFileSync(FILE, '// generate Alarms\n')

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
