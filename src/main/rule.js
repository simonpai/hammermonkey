export default class RuleManager {

  constructor() {
    this._rules = {};
  }

  update(id, rule) {
    this._rules[id] = rule;
  }

  get userscripts() {
    return this.list('userscript');
  }

  list(type) {
    return Object.keys(this._rules)
      .map(id => this._rules[id])
      .filter(rule => rule.type === type);
  }

  get(id) {
    return this._rules[id];
  }

}
