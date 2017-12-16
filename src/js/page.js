const html = require('./html.js')
const ul = html.get('sounds-list')

function addSoundItem (filename, filepath) {
  // Create elements
  let li = document.createElement('li')
  let span = document.createElement('span')
  let b = document.createElement('b')
  let a = document.createElement('a')
  let p1 = document.createElement('p')
  let p2 = document.createElement('p')

  // Prepare elements
  // List item
  li.setAttribute('id', filename)
  li.setAttribute('class', 'collection-item avatar')
  // Span
  span.setAttribute('class', 'title')
  // A tags
  a.setAttribute('class', 'secondary-content')
  a.setAttribute('href', '#')
  a.setAttribute('onclick', `renderer.fileRemoved(this.parentNode.id, '${filename}')`)

  // Append elements
  li.insertAdjacentHTML('afterbegin', `<i class="material-icons circle indigo">play_arrow</i>`)
  li.appendChild(span)
  span.appendChild(b)
  b.innerHTML = filename
  span.appendChild(p1)
  p1.innerHTML = `<audio controls id="audio-${filename}"><source src="${filepath}"></audio>`
  span.appendChild(p2)
  p2.innerHTML = `
  <a class="waves-effect waves-light btn indigo" onclick="page.fadeOut('audio-${filename}'); log('info', 'Fading out ${filename}')">Fade out (5 sec)</a>
  <a class="waves-effect waves-light btn indigo" onclick="document.getElementById('audio-${filename}').volume = 1; log('info', 'Fade reset on item ${filename}')">Reset fade</a>
  `
  li.appendChild(a)
  a.innerHTML = '<i class="material-icons indigo-text">close</i>'
  ul.appendChild(li)
}

function resizeCollections () {
  let screenSize = _detectWindowSize()
  html.get('console').setAttribute('style', `height: ${screenSize}px;`)
  html.get('sounds-list').setAttribute('style', `height: ${screenSize}px;`)
}

function _detectWindowSize () {
  let h = window.screen.height
  let w = window.screen.width
  if (w > 1366 && h > 768) return 380
  else if (w <= 1366 && h <= 768) return 290
}

function fadeOut (elementid) {
  let elem = html.get(elementid)
  let fadeAudio = setInterval(() => {
    let newVol = elem.volume -= 0.01
    newVol = newVol.toFixed(2)
    if (elem.volume === 0.00) {
      clearInterval(fadeAudio)
      elem.pause()
    } else elem.volume = newVol
  }, 55)
}
exports.addSoundItem = addSoundItem
exports.resizeCollections = resizeCollections
exports.fadeOut = fadeOut
