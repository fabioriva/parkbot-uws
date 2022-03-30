const fs = require('fs')

const FILE = 'io.js'

// const args = process.argv.slice(2)

// generate(args[0], args[1], args[2], args[3])

fs.writeFileSync(FILE, '// generate I/O\n')

generate('inputs1', 'E', 0, 7)
generate('inputs1', 'E', 10, 15)
generate('outputs1', 'A', 0, 5)
generate('outputs1', 'A', 10, 13)

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
