import { ipcMain as ipc } from 'electron';

// https://github.com/electron/electron/blob/master/docs/api/ipc-main.md
export default function(main, webContents) {
  // renderer -> main //
  ipc.on('session.open', (event, url) => {
    main.open(url);
  });

  // main -> renderer //
  main.events.on('session.open', (url, sessionId) => {
    webContents.send('session.open', url, sessionId);
  });
}
