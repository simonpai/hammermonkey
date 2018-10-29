import { render } from 'mustache';

export default class InjectableManager {

  constructor({hammerhead, effects}) {
    this._effects = effects;
    this._host = hammerhead.host;

    hammerhead.events.on('session.create', this._redefineInjectable.bind(this));
  }

  _redefineInjectable(session) {
    Object.defineProperty(session.injectable, 'userscripts', {
      get: () => this._getResource(session, 'script')
    });
    Object.defineProperty(session.injectable, 'userstyles', {
      get: () => this._getResource(session, 'style')
    });
  }

  _getResource(session, type) {
    const sessionId = session.id;
    const host = this._host;
    return (this._effects.effects.injectable || [])
      .sequence()
      .filter(inj => inj.type === type)
      .map(({path}) => render(path, {sessionId, host}))
      .toList();
  }

}
