const { app, BrowserWindow, Menu } = require('electron')
const path = require('path')
const url = require('url')
const openAboutWindow = require('about-window').default

// Debugging tools
require('electron-debug')()
require('electron-unhandled')()

// Init main window
let mainWindow

let windowOptions = {
  width: 1920,
  height: 1080,
  center: true,
  resizable: true,
  fullscreenable: true,
  show: false, // To prevent white screen on startup
  title: 'Live Sound Board',
  icon: path.join(__dirname, 'res/mixer.ico')
}

let aboutOptions = {
  icon_path: path.join(__dirname, 'res/mixer.png'),
  copyright: 'Copyright (c) Linus Willner 2017',
  adjust_window_size: true
}

// When ready, create window
app.on('ready', () => {
  createWindow()
  createAboutWindow()
})

// Leave app in the dock on OS X
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// On activation, check that the main window hasn't been dereferenced
app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})

function createWindow () {
  // Create browser window
  mainWindow = new BrowserWindow(windowOptions)

  // White screen prevention
  mainWindow.once('ready-to-show', () => {
    mainWindow.show()
  })

  // Load HTML page
  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }))

  // Dereference main window on close
  mainWindow.on('closed', () => {
    mainWindow = null
  })
}

function createAboutWindow () {
  let aboutWindow = Menu.buildFromTemplate([
    {
      label: 'View',
      submenu: [
        { role: 'reload' },
        { role: 'forcereload' },
        { role: 'toggledevtools' },
        { type: 'separator' },
        { role: 'resetzoom' },
        { role: 'zoomin' },
        { role: 'zoomout' },
        { type: 'separator' },
        { role: 'togglefullscreen' }
      ]
    },
    {
      label: 'Window',
      submenu: [
        { role: 'minimize' },
        { role: 'close' }
      ]
    },
    {
      label: 'Help',
      submenu: [
        {
          label: 'About',
          click: () => openAboutWindow(aboutOptions)
        }
      ]
    }
  ])
  Menu.setApplicationMenu(aboutWindow)
}
