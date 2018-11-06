import { readFileSync } from 'fs';

const USERSCRIPT = readFileSync(require.resolve('./userscript')).toString();

class Push {

  constructor(service, session) {
    this._service = service;
    this._sessionId = session.id;
    this._messages = [];
  }

  add(...args) {
    this._messages.push(args);
    setTimeout(this._tryDispatch0.bind(this), 0);
  }

  update(...args) {
    const messages = this._messages;
    for (var i = messages.length - 1; i >= 0; i--) {
      if (messages[i][0] === args[0]) {
        messages[i] = args;
        return; // no need to try dispatch
      }
    }
    this.push(...args);
  }

  _tryDispatch0() {
    const messages = this._messages;
    if (!messages.length) {
      return;
    }
    this._tryDispatch1();
  }

  _tryDispatch1() {
    const response = this._response;
    if (!response) {
      return;
    }
    delete this._response;
    const responseTimeoutId = this._responseTimeoutId;
    if (responseTimeoutId) {
      clearTimeout(responseTimeoutId);
      delete this._responseTimeoutId;
    }
    this._dispatch(response);
  }

  _dispatch(response) {
    response.send(JSON.stringify(this._messages));
    this._messages = [];
  }

  _dispatchOrHold(response) {
    if (this._messages.length) {
      this._dispatch(response);
    } else {
      this._response = response;
      this._responseTimeoutId = setTimeout(this._tryDispatch1.bind(this), 30000);
    }
  }

}

export default class PushService {

  constructor({hammerhead, effects, client}) {
    this._client = client;
    this._hammerhead = hammerhead;

    effects.add({
      userscript: [
        {
          id: 'plugin.push.core',
          content: USERSCRIPT
        }
      ]
    });

    const self = this;
    Object.defineProperty(hammerhead.Session.prototype, 'push', {
      get: function() {
        return this._push || (this._push = new Push(self, this));
      }
    });

    hammerhead.app
      .get('/:sessionId/http://__host__/api/push', this._handleGet.bind(this))
      .post('/:sessionId/http://__host__/api/push', this._handlePost.bind(this));
  }

  _handleGet(req, res) {
    const {sessionId} = req.params;
    const session = this._hammerhead.session(sessionId);
    session && session.push._dispatch(res);
  }

  _handlePost(req, res) {
    const {sessionId} = req.params;
    const session = this._hammerhead.session(sessionId);
    session && session.push._dispatchOrHold(res);
  }

}
