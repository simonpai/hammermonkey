import DictModel from '../../util/dict';
import { MTR, RTM } from '../../../shared/model/ipc';

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

    client.on(RTM.SESSION.OPEN, (event, options) => this.open(options));
    client.on(RTM.SESSION.CLOSE, (event, id) => this.close(id));
    client.on(RTM.SESSION.URL, (event, id, url) => this.setUrl(id, url));
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

  get state() {
    return this.sessions;
  }

  get sessions() {
    return this._dict.all;
  }

  load() {
    return this._dict.load();
  }

  open(options = {}) {
    // TODO: separate id?
    const {id} = options;
    const session = this._deserialize(id, options);
    this._dict.upsert(id, session);

    this._client.send(MTR.SESSION.OPEN, id, serialize(session));
  }

  close(id) {
    const session = this.get(id);
    if (!session) {
      return;
    }
    this._dict.delete(id);
    session && session._hhs && session._hhs.close();
  }

  setUrl(id, url) {
    const session = this.get(id);
    const proxyUrl = session && session._hhs && session._hhs.getProxyUrl(url);
    this._dict.upsert(id, {
      ...session,
      url,
      proxyUrl
    });

    this._client.send(MTR.SESSION.PROXY_URL, id, proxyUrl);
  }

}
