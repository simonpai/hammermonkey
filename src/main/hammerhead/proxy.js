import hammerhead  from 'testcafe-hammerhead';
import * as urlUtils from 'testcafe-hammerhead/lib/utils/url';

const _onRequest = hammerhead.Proxy.prototype._onRequest;

export default class Proxy extends hammerhead.Proxy {

  constructor(hostname, port1, port2) {
    super(hostname, port1, port2);
  }

  _onRequest(req, res/*, serverInfo*/) {
    const next = () => _onRequest.apply(this, arguments);
    if (this.app) {
      this.app(req, res, next);
    } else {
      next();
    }
  }

  openSession(session, externalProxySettings) {
    session.proxy = this;
    this.openSessions.set(session.id, session);
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

}
