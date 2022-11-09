const { app, BrowserWindow } = require('electron');
const { isMac, isWindows } = require('./detect-platform');
const path = require('path');

const createWindow = () => {
  const win = new BrowserWindow({
    width: 232,
    height: 320,
    frame: false,
    resizable: false,
    titleBarStyle: 'hidden',
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js')
  }
  });

  win.loadFile('./dist/Angular-Calculator/index.html');
};

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

