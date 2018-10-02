import EventEmitter from 'events';
import internalIp from 'internal-ip';
import Hammerhead from '../hammerhead';
import bridgeFn from './bridge';
import RuleManager from './rule';
import AssetServer from './asset';

export default class Main {

  constructor() {
    const ip = this._ip = internalIp.v4.sync();
    this._emitter = new EventEmitter();
    this._rules = new RuleManager();
    this._assets = new AssetServer(this._rules);
    this._hammerhead = new Hammerhead(ip, this._assets, {});

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
    // console.log(session);
    this._emitter.emit('session.open', session.id);
  }

  getProxyUrl(sessionId, url) {
    const proxyUrl = this._hammerhead.getProxyUrl(sessionId, url);
    // console.log(url + ' => ' + proxyUrl);
    return Promise.resolve(proxyUrl);
  }

  saveRule(id, rule) {
    console.log(id, rule);
    this._rules.update(id, rule);
    return Promise.resolve();
  }

  stop() {
    this._hammerhead.close();
    this._assets.close();
  }

}
