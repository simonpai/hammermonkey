import { ipcMain as ipc } from 'electron';
import internalIp from 'internal-ip';
import Hammerhead from '../hammerhead';
import EffectManager from './effect/manager';
import RuleManager from './rule/manager';
import Persistence from './persistence';

import AssetManager from './module/asset';
import InjectableManager from './module/injectable';
import ConsoleService from './module/console';

export default class Main {

  constructor() {
    const ip = this._ip = internalIp.v4.sync();

    const hammerhead = this._hammerhead = new Hammerhead(ip, {});
    const effects = this._effects = new EffectManager();

    const persistence = this._persistence = new Persistence();
    this._rules = new RuleManager(persistence.rules, effects);

    this._assets = new AssetManager(hammerhead, effects);
    this._injectables = new InjectableManager(hammerhead, effects);
    this._console = new ConsoleService(hammerhead, effects);

    this._console.events.on('console', (sessionId, value) => this._sendIpc('session.console', sessionId, value));
    this._console.events.on('error', (sessionId, value) => this._sendIpc('session.error', sessionId, value));
  }

  start() {
    this._load();
    this._hammerhead.start();
    this._listenIpc();
  }

  _load() {
    return Promise.all([
      this._rules.load()
    ]).then(() => {
      this._loaded = true;
      if (this._syncToClientRequested) {
        delete this._syncToClientRequested;
        this._syncToClient();
      }
    });
  }

  _listenIpc() {
    ipc.on('session.open', this.openSession.bind(this));

    // TODO: shall be updating the session model, maybe even persisting them, so they live across client lifecycle
    ipc.on('session.url', (event, sessionId, url) => 
      this.getProxyUrl(sessionId, url)
        .then(proxyUrl => event.sender.send('session.url.success', sessionId, proxyUrl)));

    ipc.on('rule.save', (event, updateTime, rule) => 
      this.saveRule(rule)
        .then(() => event.sender.send('rule.save.success', rule.id, updateTime)));
  }

  _sendIpc() {
    if (!this._win) {
      return;
    }
    this._win.webContents.send(...arguments);
  }

  openClient(win) {
    this._win = win;
    this.syncToClient();
  }

  closeClient() {
    delete this._win;
  }

  syncToClient() {
    if (!this._loaded) {
      this._syncToClientRequested = true;
    } else {
      this._syncToClient();
    }
  }

  _syncToClient() {
    this._sendIpc('load', {
      rules: this._rules.rules,
      sessions: this._hammerhead.sessions.map(({id, options}) => ({id, options}))
    });
  }

  openSession() {
    const session = this._hammerhead.openSession();
    this._injectables.redefineInjectable(session);
    // console.log(session);
    this._sendIpc('session.open', session.id);
  }

  getProxyUrl(sessionId, url) {
    const proxyUrl = this._hammerhead.getProxyUrl(sessionId, url);
    // console.log(url + ' => ' + proxyUrl);
    return Promise.resolve(proxyUrl);
  }

  saveRule(id, type, data) {
    this._rules.update(id, type, data);
    return Promise.resolve();
  }

  stop() {
    this._injectables.close();
    this._assets.close();
    this._hammerhead.close();
  }

}
