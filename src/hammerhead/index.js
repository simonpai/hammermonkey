import express from 'express';
import EventEmitter from 'events';
import Events from '../main/util/events';

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
    this._sessions = {};
    this._sessionIds = [];
    this.app = express();
  }

  start() {
    if (this._started || this._closed) {
      console.error('Already ' + this._started ? 'started.' : 'closed.'); // eslint-disable-line no-console
      return;
    }
    this._started = true;

    this.proxy = new Proxy(this.ip, this.port1, this.port2);
    this.proxy.app = this.app;
  }

  get sessions() {
    return this._sessionIds.map(id => this._sessions[id]);
  }

  openSession(options) {
    this._assertInteractive();
    
    this._emitter.emit('session.befroreCreate', options);
    const session = new Session(this.uploadRoot, options);
    this._emitter.emit('session.create', session);

    const {id} = session;
    this.proxy.openSession(session);

    this._sessions[id] = session;
    this._sessionIds.push(id);

    this._emitter.emit('session.open', session);
    return session;
  }

  // TODO: closeSession(sessionId) {}

  getProxyUrl(sessionId, url) {
    this._assertInteractive();

    const session = this._sessions[sessionId];
    if (!session) {
      throw new Error('Session not found: ' + sessionId);
    }
    return this.proxy.getProxyUrl(session, url);
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
