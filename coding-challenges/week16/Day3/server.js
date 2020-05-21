const http = require('http')
const fs = require('fs')

const readfile = fs.readFileSync(__dirname + "/text1.txt", 'utf8')

fs.writeFileSync('uppcaseFile.txt', readfile.toUpperCase(), console.log('added text in uppcaseFile.txt file as UPPERCASE \n'))

const AddData = fs.readFileSync(__dirname + "/uppcaseFile.txt", 'utf8')

console.log(AddData)

