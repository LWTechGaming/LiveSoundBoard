const html = require('./html.js')
const ul = html.get('sounds-list')

function addSoundItem (filename) {
  // Create elements
  let li = document.createElement('li')
  let span = document.createElement('span')
  let b = document.createElement('b')
  let a = document.createElement('a')

  // Prepare elements
  // List item
  li.setAttribute('id', filename)
  li.setAttribute('class', 'collection-item avatar')
  // Span
  span.setAttribute('class', 'title')
  // A tags
  a.setAttribute('class', 'secondary-content btn indigo')
  a.setAttribute('onclick', `renderer.fileRemoved(this.parentNode.id, '${filename}')`)

  // Append elements
  li.insertAdjacentHTML('afterbegin', `<i class="waves-effect waves-light material-icons circle indigo" onclick="sounds.loadSound('${filename}')">play_arrow</i>`)
  li.appendChild(span)
  span.appendChild(b)
  b.innerHTML = filename
  li.appendChild(a)
  a.innerHTML = '<i class="material-icons">close</i>'
  ul.appendChild(li)
}

function updatePlayerStatus (status, soundname) {
  let baseClass = 'material-icons waves-effect waves-light circle '
  let icon = html.get('sound-indicator')
  let title = html.get('sound-title')
  let indicator = html.get('sound-status')

  switch (status) {
    case 'paused':
      icon.setAttribute('class', baseClass + 'gray')
      icon.innerHTML = 'pause'
      title.innerHTML = soundname
      indicator.innerHTML = 'Paused'
      break
    case 'ready': // Used for the soundcheck and intermediary
      icon.setAttribute('class', baseClass + 'green')
      icon.innerHTML = 'play_arrow'
      title.innerHTML = 'Ready to play'
      if (!soundname) {
        indicator.innerHTML = 'Ready'
        icon.onclick = ''
      } else {
        indicator.innerHTML = soundname
      }
      break
    case 'checking':
      icon.setAttribute('class', baseClass + 'orange')
      icon.innerHTML = 'sync'
      title.innerHTML = 'Performing sound check...'
      indicator.innerHTML = 'Checking'
      break
    case 'playing':
      icon.setAttribute('class', baseClass + 'red')
      icon.innerHTML = 'play_arrow'
      title.innerHTML = soundname
      indicator.innerHTML = 'Playing'
      break
    case 'stopped':
      icon.setAttribute('class', baseClass + 'gray')
      icon.innerHTML = 'stop'
      title.innerHTML = soundname
      indicator.innerHTML = 'Stopped'
      break
    case 'failed':
      icon.setAttribute('class', baseClass + 'red')
      icon.innerHTML = 'clear'
      title.innerHTML = 'Sound check failed'
      indicator.innerHTML = 'Please check the console for details'
      break
    default:
      console.error('Unknown status type: ' + status)
      break
  }
}

exports.addSoundItem = addSoundItem
exports.updatePlayerStatus = updatePlayerStatus
