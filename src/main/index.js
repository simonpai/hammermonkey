import { ipcMain as ipc } from 'electron';
import internalIp from 'internal-ip';

import Hammerhead from './hammerhead';
import EffectEngine from './effect';

import SessionService from './mod/session';
import RuleService from './mod/rule';
import AssetService from './mod/asset';
import InjectableService from './mod/injectable';
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
    this._rules = new RuleService(modContext);
    this._assets = new AssetService(modContext);
    this._injectables = new InjectableService(modContext);
    this._consoles = new ConsoleService(modContext);
  }

  start() {
    this._load();
    this._hammerhead.start();
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

  stop() {
    this._hammerhead.close();
  }

}
