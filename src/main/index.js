import { ipcMain as ipc } from 'electron';
import internalIp from 'internal-ip';

import Hammerhead from '../hammerhead';
import EffectEngine from './effect/engine';

import SessionService from './mod/session';
import RuleManager from './rule/manager';
import AssetManager from './mod/asset';
import InjectableManager from './mod/injectable';
import ConsoleService from './mod/console';

class Client {
  constructor(main) {
    this._main = main;
  }
  on() {
    return ipc.on(...arguments);
  }
  send() {
    if (!this._main._win) {
      return;
    }
    this._main._win.webContents.send(...arguments);
  }
}

class ModContext {

  constructor(main) {
    this.hammerhead = main._hammerhead;
    this.effects = main._effects;
    this.client = main._client;
    Object.freeze(this);
  }

}

export default class Main {

  constructor() {
    const ip = this._ip = internalIp.v4.sync();

    this._hammerhead = new Hammerhead(ip, {});
    this._effects = new EffectEngine();
    this._client = new Client(this);

    const modContext = new ModContext(this);

    this._sessions = new SessionService(modContext);
    this._rules = new RuleManager(modContext);
    this._assets = new AssetManager(modContext);
    this._injectables = new InjectableManager(modContext);
    this._consoles = new ConsoleService(modContext);
  }

  start() {
    this._load();
    this._hammerhead.start();
    this._listenIpc();
    this._sessions.openSession();
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
    this._client.on('rule.save', (event, updateTime, rule) => 
      this.saveRule(rule)
        .then(() => !event.sender.isDestroyed() && event.sender.send('rule.save.success', rule.id, updateTime)));
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
    this._client.send('load', {
      rules: this._rules.rules,
      sessions: this._hammerhead.sessions.map(({id, options}) => ({id, options}))
    });
  }

  saveRule(id, type, data) {
    this._rules.update(id, type, data);
    return Promise.resolve();
  }

  stop() {
    this._hammerhead.close();
  }

}
