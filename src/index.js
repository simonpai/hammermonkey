import './shared/polyfill';
import { app, BrowserWindow, screen, globalShortcut } from 'electron';
import open from 'opn';
import Main from './main';

// fix userData path in dev mode
app.setPath('userData', app.getPath('userData').replace(/\/Electron$/, '/' + app.getName()));

const isDevelopment = !app.isPackaged;

// main //
const main = new Main();
const syncToClient = main.syncToClient.bind(main);

// renderer //
let win, winReload;
const WIN_RELOAD_KEYS = ['F5', 'CommandOrControl+R'];

function createWindow() {
  return new Promise((resolve) => {
    win = new BrowserWindow(screen.getPrimaryDisplay().workAreaSize);
    win.loadFile((isDevelopment ? 'src' : 'out') + '/renderer/index.html');

    // register reload shortcut in dev env
    if (isDevelopment) {
      winReload = function() {
        win.reload();
        win.webContents.once('dom-ready', syncToClient);
      };
      WIN_RELOAD_KEYS.forEach(key => globalShortcut.register(key, winReload));
    }

    win.on('closed', () => {
      if (isDevelopment) {
        WIN_RELOAD_KEYS.forEach(key => globalShortcut.unregister(key, winReload));
        winReload = undefined;
      }
      win = undefined;
      main.closeClient();
    });

    const webContents = win.webContents;

    if (isDevelopment) {
      webContents.openDevTools();
    }

    // open new window w/ external browser
    webContents.on('new-window', (event, url) => {
      event.preventDefault();
      open(url);
    });

    webContents.once('dom-ready', resolve);
  }).then(() => main.openClient(win));
}


// life cycle //
app.on('ready', () => {
  createWindow()
    .then(main.start.bind(main))
    .catch(console.error.bind(console)); // eslint-disable-line no-console
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (win === undefined) {
    createWindow()
      .catch(console.error.bind(console)); // eslint-disable-line no-console
  }
});

app.on('quit', () => {
  main.stop();
});
