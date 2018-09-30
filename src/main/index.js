import EventEmitter from 'events';
import internalIp from 'internal-ip';
import Hammerhead from '../hammerhead';
import bridgeFn from './bridge';

export default class Main {

  constructor() {
    const ip = this._ip = internalIp.v4.sync();
    this._hammerhead = new Hammerhead(ip, {});
    this._emitter = new EventEmitter();

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

  saveRule(id, updateTime, rule) {
    console.log(id, updateTime, rule);
    return Promise.resolve();
  }

  stop() {
    this._hammerhead.close();
  }
}
