import { render } from 'mustache';

export default class InjectableManager {

  constructor(hammerhead, rules) {
    this._rules = rules;
    this._host = hammerhead.host;
  }

  redefineInjectable(session) {
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
    return (this._rules.output.injectables || [])
      .sequence()
      .filter(inj => inj.type === type)
      .map(({path}) => render(path, {sessionId, host}))
      .toList();
  }

  close() {}

}
