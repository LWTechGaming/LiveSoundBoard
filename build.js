// This file will take the built app from ~/dist and create a ZIP archive, then put the ZIP in ~/releases
const fs = require('fs')
const path = require('path')
const pack = require('./package.json')
const archiver = require('archiver')
const colors = require('colors') // eslint-disable-line no-unused-vars

// Stream and archive options

let file = fs.createWriteStream(path.resolve(__dirname, 'releases', `${pack.productName}-${pack.version}.zip`))

let archive = archiver('zip', {
  zlib: { level: 9 }
})

// Event handlers

file.on('close', () => {
  console.log(`Data writing finalized. (${archive.pointer()} bytes)`.green)
})

file.on('end', () => {
  console.log('Data writing has ended.'.green)
})

archive.on('warning', (err) => {
  if (err.code === 'ENOENT') console.warn(`File not found: ${err.message}`.yellow)
  else console.error(`An error occurred: ${err.message}`.red)
})

archive.on('error', (err) => {
  console.error(`An error occurred while writing archive data:\n${err}`.red)
})

// Data to include

archive.directory('dist/', false)
archive.directory('licenses/', 'LICENSES')

// Pipe data and finalize

archive.pipe(file)

archive.finalize()
