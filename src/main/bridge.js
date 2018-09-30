import { ipcMain as ipc } from 'electron';

// https://github.com/electron/electron/blob/master/docs/api/ipc-main.md
export default function(main, webContents) {
  // renderer -> main //
  ipc.on('session.open', main.openSession.bind(main));
  ipc.on('session.url', (event, sessionId, url) => 
    main.getProxyUrl(sessionId, url)
      .then(proxyUrl => webContents.send('session.url.success', sessionId, proxyUrl)));
  ipc.on('rule.save', (event, id, updateTime, rule) => 
    main.saveRule(id, updateTime, rule)
      .then(() => webContents.send('rule.save.success', id, updateTime)));

  // main -> renderer //
  main.events.on('session.open', webContents.send.bind(webContents, 'session.open'));
}
