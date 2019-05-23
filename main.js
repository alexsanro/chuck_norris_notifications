// Modules to control application life and create native browser window
const { app, BrowserWindow } = require('electron')
const { Menu, Tray } = require('electron')
const path = require('path');
var renderer = require('./renderer.js')

let trayChuck = null
app.on('ready', () => {
  /*trayChuck = new Tray(path.join(__dirname, 'icons/icono.ico'))
  const contextMenu = Menu.buildFromTemplate([
    {
      label: 'Close',
      click: function () {
        app.quit();
      }
    },
  ])

  // Llama esto otra vez en Linux debido a que modificamos el menú de contexto
  trayChuck.setContextMenu(contextMenu)*/

  mainWindow = new BrowserWindow({
    width: 600,
    height: 600,
    alwaysOnTop:true,
    webPreferences: {
      nodeIntegration: true
    }
  })

  // and load the index.html of the app.
  mainWindow.loadFile('index.html')

  renderer.startCallsToYourBoss();
})

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') app.quit()
})

app.on('activate', function () {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) createWindow()
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
