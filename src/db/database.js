const Loki = require('lokijs')
const db = new Loki('data.db')
const sounds = db.addCollection('sounds')

function storeSound (filename, filepath, filetype) {
  if (_checkFileType(filetype) !== false) {
    return sounds.insert({ name: filename, path: filepath })
  } else {
    return false
  }
}

function getSound (filename) {
  return sounds.find({ name: filename })[0]
}

function removeSound (filename) {
  sounds.findAndRemove({ name: filename })
}

function clearSounds () {
  sounds.clear()
}

function _checkFileType (filetype) {
  let type = filetype.split('/')[0]
  let format = filetype.split('/')[1]

  if (type === 'audio') {
    switch (format) {
      case 'webm': return true
      case 'ogg': return true
      case 'mp3': return true
      case 'wav': return true // NOTE: audio/wave is not supported in Chrome => Electron
      case 'x-wav': return true
      case 'x-pn-wav': return true
      case 'flac': return true
      case 'x-flac': return true
      default: return false
    }
  } else {
    return false
  }
}

exports.sounds = sounds
exports.storeSound = storeSound
exports.getSound = getSound
exports.removeSound = removeSound
exports.clearSounds = clearSounds

/* EXAMPLE FILE OBJECT
  lastModified: 1471784746362
  lastModifiedDate: Sun Aug 21 2016 16:05:46 GMT+0300 (FLE Summer Time)
  name: "DOOT.mp3"
  path: "C:\Users\%USER%\Music\Sounds\DOOT.mp3"
  size: 43680
  type: "audio/mp3"
  webkitRelativePath: ""
*/
