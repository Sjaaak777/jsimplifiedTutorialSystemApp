const { app, BrowserWindow, ipcMain } = require('electron')
const os = require('os')
const path = require('path')
require('electron-reload')(__dirname)
app.whenReady().then(main)

let window

async function main() {
  window = new BrowserWindow({
    icon: path.join(__dirname, './myico.ico'),
    width: 700,
    height: 580,
    autoHideMenuBar: true,
    frame: false,
    webPreferences: {
      //devTools: false
      preload: path.join(__dirname + '/backend/preload.js'),
    },
    show: false,
    //frame: false,
  })

  // window.webContents.openDevTools()

  window.on('ready-to-show', window.show)
  window.loadFile(path.join(__dirname, '/app/index.html'))
}

ipcMain.handle('cpu/get',async (_, data) => {
  console.log(data)

  return 'here would be some data'
})

ipcMain.on('app/close', ()=>{
  app.quit()
})

ipcMain.on('app/minimize', ()=>{
  window.minimize()
})
