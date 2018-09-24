import { ipcMain as ipc } from 'electron';

// https://github.com/electron/electron/blob/master/docs/api/ipc-main.md
export default function(main, webContents) {
  // renderer -> main //
  ipc.on('session.open', main.openSession.bind(main));
  ipc.on('session.url', (event, sessionId, url) => main.getProxyUrl(sessionId, url));

  // main -> renderer //
  main.events.on('session.open', (sessionId) => {
    webContents.send('session.open', sessionId);
  });

  main.events.on('session.url', (sessionId, url) => {
    webContents.send('session.url', sessionId, url);
  });

}
