import hammerhead  from 'testcafe-hammerhead';
// const mitm = require('./mitm');

const _onRequest = hammerhead.Proxy.prototype._onRequest;

export default class Proxy extends hammerhead.Proxy {

  constructor(hostname, port1, port2) {
    super(hostname, port1, port2);
  }

  _onRequest(req, res, serverInfo) {
    const next = () => _onRequest.apply(this, arguments);
    if (this._mitm) {
      this._mitm(req, res, next);
    } else {
      next();
    }
  }

  get mitm() {
    // return this._mitm || (this._mitm = mitm());
  }

}
