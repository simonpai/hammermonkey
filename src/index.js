import { app, BrowserWindow } from 'electron';
import open from 'open';
import Main from './main';

// main //
const main = new Main();
main.start();


// renderer //
let win;

function createWindow$() {
  return new Promise((resolve) => {
    // TODO: size
    win = new BrowserWindow({
      width: 800,
      height: 600
    });

    win.loadFile('src/renderer/index.html');

    win.on('closed', () => {
      win = undefined;
    });

    const webContents = win.webContents;

    webContents.openDevTools();

    // open new window w/ external browser
    webContents.on('new-window', (event, url) => {
      event.preventDefault();
      open(url);
    });

    webContents.once('dom-ready', resolve);
  });
}


// life cycle //
app.on('ready', () => {
  createWindow$()
    .then(() => {
      main.bridge(win);
      // TODO
      /*
      win.webContents.send('info', {
        test: 'test'
      });
      */
    })
    .catch((err) => {
      console.error(err);
    });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (win === undefined) {
    createWindow$()
      .catch((err) => {
        console.error(err);
      });
  }
});

app.on('quit', () => {
  main.stop();
});
