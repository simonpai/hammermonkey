import hammerhead  from 'testcafe-hammerhead';
import * as urlUtils from 'testcafe-hammerhead/lib/utils/url';
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

  openSession(session, externalProxySettings) {
    session.proxy = this;
    this.openSessions[session.id] = session;
    if (externalProxySettings) {
      session.setExternalProxySettings(externalProxySettings);
    }
  }

  getProxyUrl(session, url) {
    url = urlUtils.prepareUrl(url);
    
    return urlUtils.getProxyUrl(url, {
      proxyHostname: this.server1Info.hostname,
      proxyPort: this.server1Info.port,
      proxyProtocol: this.server1Info.protocol,
      sessionId: session.id
    });
  }

  get mitm() {
    // return this._mitm || (this._mitm = mitm());
    return {};
  }

}
