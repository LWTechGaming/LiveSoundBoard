const html = require('./html.js')
const page = require('./page.js')
const load = require('audio-loader')
const play = require('audio-play/browser')

function soundCheck () {
  load('http://images.lwtechgaming.me/UncAJ9t.wav').then(buffer => {
    play(buffer, {
      volume: 100,
      rate: 1
    }, () => page.updatePlayerStatus('ready')).play()
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
