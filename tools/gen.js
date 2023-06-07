const fs = require('fs')

const FILE = 'generated.js'

// const args = process.argv.slice(2)

// generate(args[0], args[1], args[2], args[3])

fs.writeFileSync(FILE, '// generate I/O\n')

generate('inputs1', 'E', 0, 11)
generate('inputs2', 'E', 12, 13)
generate('inputs3', 'E', 14, 19)
// generate('inputs4', 'E', 30, 33)
// generate('inputs5', 'E', 40, 45)
// generate('inputs6', 'E', 50, 54)
// generate('inputs7', 'E', 1000, 1001)
// generate('inputs8', 'E', 1020, 1021)
// generate('inputs9', 'E', 1040, 1040)
// generate('inputs10', 'E', 1060, 1060)
// generate('inputs11', 'E', 1080, 1081)
// generate('inputs12', 'E', 1100, 1100)
// generate('inputs13', 'E', 1120, 1120)

generate('outputs1', 'A', 0, 7)
generate('outputs2', 'A', 12, 13)
generate('outputs3', 'A', 14, 17)
// generate('outputs4', 'A', 30, 32)
// generate('outputs5', 'A', 40, 42)
// generate('outputs6', 'A', 50, 52)
// generate('outputs7', 'A', 1010, 1010)
// generate('outputs8', 'A', 1030, 1030)
// generate('outputs9', 'A', 1050, 1050)
// generate('outputs10', 'A', 1070, 1070)
// generate('outputs11', 'A', 1090, 1090)
// generate('outputs12', 'A', 1110, 1110)
// generate('outputs13', 'A', 1130, 1130)

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
