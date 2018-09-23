import Proxy from './proxy';
import Session from './session';

export default class Hammerhead {

  constructor(ip, options) {
    options = options || {};
    this.ip = ip;
    this.port1 = options.port1 || 6464;
    this.port2 = options.port2 || (this.port1 && this.port1 + 1);
    this.uploadRoot = options.uploadRoot; // TODO
  }

  start() {
    if (this._started || this._closed) {
      console.error('Already ' + this._started ? 'started.' : 'closed.');
      return;
    }
    this._started = true;

    /*const proxy = */this.proxy = new Proxy(this.ip, this.port1, this.port2);
  }

  // TODO: mitm & script injection

  open(url) {
    if (!this._started || this._closed) {
      throw new Error(this._closed ? 'Already closed.' : 'Not started yet.');
    }

    const session = new Session(this.uploadRoot); // TODO
    const newURL = this.proxy.openSession(url, session);
    // TODO
    return {
      session,
      url: newURL
    };
  }

  close() {
    if (!this._started || this._closed) {
      console.error(this._closed ? 'Already closed.' : 'Not started yet.');
      return;
    }
    this._closed = true;

    try {
      this.proxy.close();
    } catch(err) {}
  }

}
