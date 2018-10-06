import './shim';
import Proxy from './proxy';
import Session from './session';

export default class Hammerhead {

  constructor(ip, options) {
    options = options || {};
    this.ip = ip;
    this.port1 = options.port1 || 6464;
    this.port2 = options.port2 || (this.port1 && this.port1 + 1);
    this.uploadRoot = options.uploadRoot; // TODO

    this._sessions = {};
  }

  start() {
    if (this._started || this._closed) {
      console.error('Already ' + this._started ? 'started.' : 'closed.'); // eslint-disable-line no-console
      return;
    }
    this._started = true;

    /*const proxy = */this.proxy = new Proxy(this.ip, this.port1, this.port2);
  }

  // TODO: mitm & script injection

  openSession() {
    this._assertInteractive();
    
    // TODO: fixed session id
    const session = new Session(this.uploadRoot); // TODO
    this.proxy.openSession(session);

    this._sessions[session.id] = session;

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
