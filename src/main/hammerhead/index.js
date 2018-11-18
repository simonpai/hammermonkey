import express from 'express';
import EventEmitter from 'events';
import Events from '../util/events';

import './shim';
import Proxy from './proxy';
import Session from './session';

export default class Hammerhead {

  constructor(ip, options) {
    options = options || {};
    this.ip = ip;
    this.port1 = options.port1 || 8964;
    this.port2 = options.port2 || (this.port1 && this.port1 + 1);
    this.uploadRoot = options.uploadRoot; // TODO
    this.host = ip + ':' + this.port1;

    this.events = new Events(this._emitter = new EventEmitter());
    this.app = express();

    this.Session = Session;
    this.Proxy = Proxy;
  }

  start() {
    if (this._started || this._closed) {
      console.error('Already ' + this._started ? 'started.' : 'closed.'); // eslint-disable-line no-console
      return;
    }
    this._started = true;

    this.proxy = new Proxy(this.ip, this.port1, this.port2);
    this.proxy.app = this.app;

    this._emitter.emit('start');
  }

  openSession(options) {
    this._assertInteractive();
    
    this._emitter.emit('session.befroreCreate', options);
    const session = new Session(this.uploadRoot, options);
    this._emitter.emit('session.create', session);

    this.proxy.openSession(session);

    this._emitter.emit('session.open', session);
    return session;
  }

  close() {
    if (!this._started || this._closed) {
      console.error(this._closed ? 'Already closed.' : 'Not started yet.'); // eslint-disable-line no-console
      return;
    }
    this._closed = true;

    try {
      this.proxy.close();
    } catch(err) {} // eslint-disable-line no-empty
  }

  _assertInteractive() {
    if (!this._started) {
      throw new Error('Not started yet.');
    }
    if (this._closed) {
      throw new Error('Already closed.');
    }
  }

}
