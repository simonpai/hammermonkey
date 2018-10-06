import EventEmitter from 'events';
import * as Rule from './model';

export default class RuleManager {

  constructor() {
    this._emitter = new EventEmitter();
    this._pool = {};
    this._ids = [];
  }

  get events() {
    return this._emitter;
  }

  update(id, rule) {
    rule = new (Rule[rule.type])({...rule, id});

    if (!this._pool[id]) {
      this._ids.splice(0, 0, id);
    }
    this._pool[id] = rule;

    delete this._outputCache;
    this._emitter.emit('change');
  }

  // TODO: delete

  get(id) {
    return this._rules[id];
  }

  get rules() {
    return this._sequence().toList();
  }

  get output() {
    return this._outputCache || (this._outputCache = this._computeOutput());
  }

  _computeOutput() {
    return this._sequence()
      .map(this._outputOfRule.bind(this))
      .flatten()
      .fold({}, (acc, {_type, ...obj}) => {
        (acc[_type] || (acc[_type] = [])).push(obj);
        return acc;
      });
  }

  _sequence() {
    return this._ids
      .sequence()
      .map(id => this._pool[id]);
  }

  _outputOfRule(rule) {
    // cache on rule object
    return rule._output || (rule._output = this._computeOutputOfRule(rule));
  }

  _computeOutputOfRule(rule) {
    const {includes = [], ...output} = rule.output;
    const inclusionPart = includes
      .sequence()
      .map(this._outputOfRule.bind(this))
      .flatten();
    const ownPart = Object.keys(output)
      .sequence()
      .flatMap(k => output[k]
        .sequence()
        .map(obj => ({...obj, _type: k})));
    return inclusionPart.plus(ownPart).toList();
  }

}
