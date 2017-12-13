const html = require('./html.js')
const page = require('./page.js')
const log = require('./logger.js').log
const path = require('path')
const load = require('audio-loader')
const play = require('audio-play/browser')

function soundCheck () {
  log('info', 'Performing sound check')
  load(path.resolve(__dirname, '..', 'res', 'soundtest.wav')).then(buffer => {
    play(buffer, {
      rate: 1,
      volume: 0.7
    }, () => { log('log', 'Sound check succeeded programmatically') }).play()
  })
}

function addSound (inputid) {
  let fileList = html.get(inputid).files
  for (let i = 0; i < fileList.length; i++) {
    page.addSoundItem(fileList[i].name, fileList[i].path)
  }
}

function removeSound (inputid) {
  let toRemove = html.get(inputid)
  return toRemove.parentNode.removeChild(toRemove)
}

exports.addSound = addSound
exports.removeSound = removeSound
exports.soundCheck = soundCheck
