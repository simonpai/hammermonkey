import EventEmitter from 'events';
import internalIp from 'internal-ip';
import Hammerhead from '../hammerhead';
import bridgeFn from './bridge';

export default class Main {

  constructor() {
    const ip = this._ip = internalIp.v4.sync();
    this._hammerhead = new Hammerhead(ip, {});
    this._emitter = new EventEmitter();
    this._sessions = [];

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

  accept(event, args) {
    if (!Array.isArray(args)) {
      return Promise.reject();
    }
    switch (args[0]) {
      case 'session.open':
        return Promise.resolve(this.open(args[1]));
    }
    return Promise.reject();
  }

  open(url) {
    const result = this._hammerhead.open(url);
    this._sessions.push(result.session);
    console.log(result.session);
    this._emitter.emit('session.open', result.url, result.session.id);
  }

  stop() {
    this._hammerhead.close();
  }
}
