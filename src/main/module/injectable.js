import { render } from 'mustache';

export default class InjectableManager {

  constructor(rules, {ip, auxPort}) {
    this._rules = rules;
    this._ip = ip;
    this._auxPort = auxPort;
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
    const auxHost = this._ip + ':' + this._auxPort;
    return (this._rules.output.injectables || [])
      .sequence()
      .filter(inj => inj.type === type)
      .map(({path}) => render(path, {sessionId, auxHost}))
      .toList();
  }

  close() {}

}
