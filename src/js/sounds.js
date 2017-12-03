const play = require('audio-play')
const load = require('audio-loader')
const db = require('../db/database.js')
const html = require('./html.js')
const page = require('./page.js')

function playSound (soundpath, soundname) {
  page.updatePlayerStatus('playing', soundname)
  load(soundpath).then((buffer) => {
    play(buffer, {
      volume: 100,
      rate: 1
    }, () => { page.updatePlayerStatus('ready') }).play()
  })
}

function soundCheck () {
  page.updatePlayerStatus('checking')
  playSound('./src/res/soundtest.wav', './src/res/soundtest.wav') // The path here is relative to main app file
}

function addSound (inputid) {
  let fileList = html.get(inputid).files
  for (let i = 0; i < fileList.length; i++) {
    page.addSoundItem(fileList[i].name)
  }
}

function removeSound (inputid) {
  let toRemove = html.get(inputid)
  return toRemove.parentNode.removeChild(toRemove)
}

function loadSound (soundname) {
  let icon = html.get('sound-indicator')
  let sound = db.getSound(soundname)
  icon.setAttribute('onclick', `sounds.playSound('${sound.path}', '${sound.name}')`)
  page.updatePlayerStatus('ready', sound.name)
}

exports.addSound = addSound
exports.removeSound = removeSound
exports.loadSound = loadSound
exports.playSound = playSound
exports.soundCheck = soundCheck
