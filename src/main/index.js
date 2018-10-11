import EventEmitter from 'events';
import internalIp from 'internal-ip';
import Hammerhead from '../hammerhead';
import bridgeFn from './bridge';
import RuleManager from './rule/manager';

import AssetManager from './module/asset';
import InjectableManager from './module/injectable';

export default class Main {

  constructor() {
    const ip = this._ip = internalIp.v4.sync();
    this._emitter = new EventEmitter();
    const rules = this._rules = new RuleManager();
    const hammerhead = this._hammerhead = new Hammerhead(ip, {});

    this._assets = new AssetManager(hammerhead, rules);
    this._injectables = new InjectableManager(hammerhead, rules);

    Object.defineProperty(this, 'events', {
      value: this._emitter
    });
  }

  start() {
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

  saveRule(id, rule) {
    this._rules.update(id, rule);
    return Promise.resolve();
  }

  stop() {
    this._injectables.close();
    this._assets.close();
    this._hammerhead.close();
  }

}
