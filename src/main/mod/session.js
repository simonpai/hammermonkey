export default class SessionService {

  constructor({hammerhead, client}) {
    this._hammerhead = hammerhead;
    this._client = client;

    client.on('session.open', this.openSession.bind(this));

    // TODO: shall be updating the session model, maybe even persisting them, so they live across client lifecycle
    client.on('session.url', (event, sessionId, url) => 
      this.getProxyUrl(sessionId, url)
        .then(proxyUrl => !event.sender.isDestroyed() && event.sender.send('session.url.success', sessionId, proxyUrl)));
  }

  openSession() {
    const session = this._hammerhead.openSession();
    // console.log(session);
    this._client.send('session.open', session.id);
  }

  getProxyUrl(sessionId, url) {
    const proxyUrl = this._hammerhead.getProxyUrl(sessionId, url);
    // console.log(url + ' => ' + proxyUrl);
    return Promise.resolve(proxyUrl);
  }

}
