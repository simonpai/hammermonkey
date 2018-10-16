import EventEmitter from 'events';
import internalIp from 'internal-ip';
import Hammerhead from '../hammerhead';
import bridgeFn from './bridge';
import RuleManager from './rule/manager';
import Persistence from './persistence';

import AssetManager from './module/asset';
import InjectableManager from './module/injectable';

export default class Main {

  constructor() {
    const ip = this._ip = internalIp.v4.sync();
    this._emitter = new EventEmitter();

    const hammerhead = this._hammerhead = new Hammerhead(ip, {});

    const persistence = this._persistence = new Persistence();
    const rules = this._rules = new RuleManager(persistence.rules);

    this._assets = new AssetManager(hammerhead, rules);
    this._injectables = new InjectableManager(hammerhead, rules);

    Object.defineProperty(this, 'events', {
      value: this._emitter
    });
  }

  start() {
    // load data from persistence
    this._rules.load()
      .then(() => this._emitter.emit('rule.load', this._rules.rules));

    this._hammerhead.start();
  }

  bridge(win) {
    bridgeFn(this, win.webContents);
  }

  openSession() {
    const session = this._hammerhead.openSession();
    this._injectables.redefineInjectable(session);
    // console.log(session);
    this._emitter.emit('session.open', session.id);
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
