const fs = require('fs')

const FILE = 'io.js'

// const args = process.argv.slice(2)

// generate(args[0], args[1], args[2], args[3])

fs.writeFileSync(FILE, '// generate I/O\n')

generate('inputs21', 'E', 4000, 4001)
generate('inputs22', 'E', 4020, 4020)
generate('inputs23', 'E', 4040, 4040)

generate('outputs20', 'A', 4010, 4010)
generate('outputs21', 'A', 4030, 4030)
generate('outputs22', 'A', 4050, 4050)

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
