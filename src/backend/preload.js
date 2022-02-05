const os = require('os')
const { ipcRenderer, contextBridge } = require('electron')

const API = {
  cpuInfo: os.cpus(),
  getPlatform: () => os.platform(),
  cpusUsage: ()=> ipcRenderer.invoke('cpu/get', 'hello from renderer'),
  window: {
    close: () => ipcRenderer.send('app/close'),
    minimize: () => ipcRenderer.send('app/minimize')
  },
}

function platform() {
  return os.platform()
}
contextBridge.exposeInMainWorld('app', API)
