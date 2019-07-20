// Modules to control application life and create native browser window
const { app, BrowserWindow } = require('electron')
const {dialog} = require('electron')
const { Menu, Tray } = require('electron')
const path = require('path');
const settings = require('electron-settings');
var renderer = require('./scripts/renderer.js');
var contextMenu = "";
var timerValue = 60000;

let trayChuck = null
app.on('ready', () => {
  generateTray();
  setMenuSettingsDefault();

  if (settings.has('timer.value')) {
    timerValue = settings.get('timer.value')
  }

  //Por defecto es 1min
  renderer.startCallsToYourBoss(timerValue);
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

function generateTray(){
  trayChuck = new Tray(path.join('./assets/icono.ico'))
  contextMenu = Menu.buildFromTemplate([
    {
      label: '1min',
      type: 'radio',
      checked: false,
      click: function () {
        settings.set('timer', {
          value: 60000,
        });
        renderer.startCallsToYourBoss(60000);
      }
    },
    {
      label: '5min',
      type: 'radio',
      checked: false,
      click: function () {
        settings.set('timer', {
          value: 300000,
        });
        renderer.startCallsToYourBoss(300000);
      }
    },
    {
      label: '10min',
      type: 'radio',
      checked: false,
      click: function () {
        settings.set('timer', {
          value: 600000,
        });
        renderer.startCallsToYourBoss(600000);
      }
    },
    {
      label: '30min',
      type: 'radio',
      checked: false,
      click: function () {
        settings.set('timer', {
          value: 1800000,
        });
        renderer.startCallsToYourBoss(1800000);
      }
    },
    {
      label: 'Close',
      click: function () {
        app.quit();
      }
    }
  ])

  trayChuck.setContextMenu(contextMenu);
}

function setMenuSettingsDefault(){
  switch (settings.get('timer.value')) {
    case 300000:
      contextMenu.items[1].checked = true
      break;
    case 600000:
        contextMenu.items[2].checked = true
        break;
      case 1800000:
        contextMenu.items[3].checked = true
        break;
    default:
        contextMenu.items[0].checked = true
      break;
  }
}