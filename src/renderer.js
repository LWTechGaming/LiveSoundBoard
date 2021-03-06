const html = require('./js/html.js')
const sounds = require('./js/sounds.js')
const db = require('./db/database.js')
const log = require('./js/logger.js').log
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
    // Replace backslashes with slashes to avoid strings breaking
    let query = db.storeSound(filelist[i].name, filelist[i].path.replace(/\\/g, '/'), filelist[i].type)
    if (query === false) log('error', `Unable to load file ${filelist[i].name} - unsupported format.`)
  }
})

Events.on('remove-sound', filename => {
  let query = db.removeSound(filename)
  if (query === 0) log('warn', `File record ${filename} was not removed from database - not found.`)
})

// Other functions

function loaded () {
  html.get('loader').setAttribute('style', 'display:none;')
  html.get('navbar').removeAttribute('style')
  html.get('index-banner').removeAttribute('style')
  html.get('container').removeAttribute('style')
}

exports.fileAdded = fileAdded
exports.fileRemoved = fileRemoved
exports.loaded = loaded
