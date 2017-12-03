const path = require('path')
const sounds = require('./js/sounds.js')
const db = require('./db/database.js')
const Dispatcher = require('./js/dispatcher.js').Dispatcher
const Events = new Dispatcher()

// Event triggers

function fileAdded (inputid, filelist) {
  Events.emit('file-added', inputid)
  Events.emit('load-sound', filelist)
}

function fileRemoved (fileid, filename) {
  Events.emit('file-removed', fileid)
  Events.emit('remove-sound', filename)
}

// Event listeners

Events.on('file-added', inputid => {
  sounds.addSound(inputid)
})

Events.on('file-removed', fileid => {
  sounds.removeSound(fileid)
})

Events.on('load-sound', filelist => {
  for (let i = 0; i < filelist.length; i++) {
    // The regex fixes the path issues on Windows
    let query = db.storeSound(filelist[i].name, filelist[i].path.replace(/\\/g, '/'), filelist[i].type)
    if (query === false) console.error(`Unable to load file ${filelist[i].name} - unsupported format.`)
  }
})

Events.on('remove-sound', filename => {
  let query = db.removeSound(filename)
  if (query === 0) console.log(`File record ${filename} was not removed from database - not found.`)
})

exports.fileAdded = fileAdded
exports.fileRemoved = fileRemoved
