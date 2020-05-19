const http = require('http')
const fs = require('fs')

const read_stream = fs.createReadFileSync(__dirname + "/text1.txt", 'utf8')
const write_stream = fs.createWriteStream(__dirname + "/uppcaseFile.txt")

read_stream.on('data',(chunk)=>{
    console.log('New chunk received')
    const upper = chunk.toString().toUpperCase()
    write_stream.write(upper)
})

