const fs = require('fs')

const FILE = 'io.js'

// const args = process.argv.slice(2)

// generate(args[0], args[1], args[2], args[3])

fs.writeFileSync(FILE, '// generate I/O\n')

generate('inputs1', 'E', 0, 9)
generate('inputs2', 'E', 10, 17)
// generate('inputs23', 'E', 4040, 4040)

generate('outputs1', 'A', 0, 5)
generate('outputs2', 'A', 10, 13)
// generate('outputs22', 'A', 4050, 4050)

function generate (exports, type, from, to) {
  fs.appendFileSync(FILE, `exports.${exports} = [\n`)
  for (let byte = from; byte <= to; byte++) {
    for (let bit = 0; bit < 8; bit++) {
      fs.appendFileSync(FILE, `{ addr: '${type}${byte}.${bit}', label: '' },\n`)
    }
  }
  fs.appendFileSync(FILE, ']\n')
}

console.log(fs.readFileSync(FILE, 'utf8'))
