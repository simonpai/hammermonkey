import DictModel from '../../util/dict';

function serialize({_hhs, ...obj}) { // eslint-disable-line no-unused-vars
  return obj;
}

export default class SessionService {

  constructor({hammerhead, client}) {
    this._hammerhead = hammerhead;
    this._client = client;

    this._inject(hammerhead, this);

    this._dict = new DictModel({
      filename: 'sessions.db',
      serialize: serialize,
      deserialize: this._deserialize.bind(this)
    });

    client.on('session.open', (event, options) => this.open(options));
    client.on('session.url', (event, id, url) => this.setUrl(id, url));
  }

  _inject(hammerhead) {
    this._openSession = hammerhead.openSession.bind(hammerhead);
    hammerhead.openSession = this.open.bind(this);

    Object.defineProperty(hammerhead, 'sessions', {
      value: this
    });
  }

  _deserialize(id, options) {
    const session = this.get(id);
    const _hhs = (session && session._hhs) || this._openSession(options);
    return {
      ...options,
      _hhs
    };
  }

  get(id) {
    return this._dict.get(id);
  }

  get sessions() {
    return this._dict.items;
  }

  load() {
    return this._dict.load();
  }

  open(options = {}) {
    // TODO: separate id?
    const {id} = options;
    const session = this._deserialize(id, options);
    this._dict.upsert(id, session);

    this._client.send('session.open', id, serialize(session));
  }

  setUrl(id, url) {
    const session = this.get(id);
    const proxyUrl = session && session._hhs && session._hhs.getProxyUrl(url);
    this._dict.upsert(id, {
      ...session,
      url,
      proxyUrl
    });

    this._client.send('session.proxyUrl', id, proxyUrl);
  }

}
