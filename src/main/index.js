import { ipcMain as ipc } from 'electron';
import internalIp from 'internal-ip';

import Hammerhead from './hammerhead';
import EffectEngine from './effect';

import SessionService from './mod/session';
import RuleService from './mod/rule';
// import PushService from './mod/push';
import AssetService from './mod/asset';
import InjectableService from './mod/injectable';
import ConsoleService from './mod/console';
import SettingsService from './mod/settings';

import { MTR } from '../shared/model/ipc';

function patchEvent(event) {
  const _send = event.sender.send;
  event.sender.send = function() {
    return this.isDestroyed() ? undefined : _send.apply(this, arguments);
  }
  return event;
}

class Client {
  constructor(main) {
    this._main = main;
  }
  on(name, callback) {
    return ipc.on(name, (event, ...args) => callback(patchEvent(event), ...args));
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
    // this._pushes = new PushService(modContext);
    this._assets = new AssetService(modContext);
    this._injectables = new InjectableService(modContext);
    this._consoles = new ConsoleService(modContext);
    this._settings = new SettingsService(modContext);
  }

  start() {
    this._load();
    this._hammerhead.start();
  }

  _load() {
    return Promise.all([
      this._rules.load(),
      this._sessions.load(),
      this._settings.load()
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
    this._client.send(MTR.LOAD, {
      rules: this._rules.state,
      sessions: this._sessions.state,
      settings: this._settings.state
    });
  }

  stop() {
    this._hammerhead.close();
  }

}
