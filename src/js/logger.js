const html = require('./html.js')
const $ = require('jquery')

const buttons = {
  icons: {
    log: 'sms',
    info: 'info',
    warn: 'warning',
    error: 'error'
  },
  colors: {
    log: 'green',
    info: 'indigo',
    warn: 'orange',
    error: 'red'
  }
}

function log (type, message, error) {
  switch (type) {
    case 'log':
      console.log(message)
      _generateErrorCard('log', message)
      break
    case 'info':
      console.info(message)
      _generateErrorCard('info', message)
      break
    case 'warn':
      console.warn(message)
      _generateErrorCard('warn', message)
      break
    case 'error':
      console.error(`${error === undefined ? message : error}`)
      _generateErrorCard('error', message)
      break
    default:
      console.log('Unknown log type: ' + type)
      break
  }
  let feed = document.getElementById('console')
  feed.scrollTop = feed.scrollHeight
}

function _generateErrorCard (type, msg) {
  let feed = html.get('console')

  // Create elements and append
  let li = document.createElement('li')
  li.setAttribute('class', 'collection-item avatar')

  let span = document.createElement('span')
  span.setAttribute('class', 'title')
  span.setAttribute('style', 'font-weight: bold;')
  li.appendChild(span)

  let p = document.createElement('p')
  li.appendChild(p)

  // Adapt icon and message
  switch (type) {
    case 'log':
      li.insertAdjacentHTML('afterbegin', `<i class="material-icons circle ${buttons.colors.log}">${buttons.icons.log}</i>`)
      span.innerHTML = 'Log'
      p.innerHTML = msg
      feed.appendChild(li)
      break
    case 'info':
      li.insertAdjacentHTML('afterbegin', `<i class="material-icons circle ${buttons.colors.info}">${buttons.icons.info}</i>`)
      span.innerHTML = 'Info'
      p.innerHTML = msg
      feed.appendChild(li)
      break
    case 'warn':
      li.insertAdjacentHTML('afterbegin', `<i class="material-icons circle ${buttons.colors.warn}">${buttons.icons.warn}</i>`)
      span.innerHTML = 'Warn'
      p.innerHTML = msg
      feed.appendChild(li)
      break
    case 'error':
      li.insertAdjacentHTML('afterbegin', `<i class="material-icons circle ${buttons.colors.error}">${buttons.icons.error}</i>`)
      span.innerHTML = 'Error'
      p.innerHTML = msg
      feed.appendChild(li)
      break
    default:
      console.error('Unknown log type: ' + type)
      break
  }
}

exports.log = log
