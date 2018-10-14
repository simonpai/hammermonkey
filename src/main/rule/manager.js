import EventEmitter from 'events';
import * as Rule from './model';

export default class RuleManager {

  constructor(db) {
    this._emitter = new EventEmitter();
    this._hash = {};
    this._ids = [];
    this._db = db;
  }

  get events() {
    return this._emitter;
  }

  load() {
    return this._db.load()
      // .then(v => console.log(v) || v)
      .then(({hash = {}, ids = []}) => {
        this._hash = hash;
        this._ids = ids;
        this._emitter.emit('change');
      });
  }

  update(id, data) {
    const rule = new (Rule[data.type])({...data, id});

    if (!this._hash[id]) {
      this._ids.splice(0, 0, id);
      this._saveMeta();
    }
    this._hash[id] = rule;
    this._db.upsert(id, data); // TODO: get this from Rule API

    this._doChange();
  }

  delete(id) {
    const i = this._ids.indexOf(id);
    if (i < 0) {
      return;
    }
    this._ids.splice(i, 1);
    delete this._hash[id];

    this._db.delete(id);
    this._doChange();
  }

  // TODO: update order

  get(id) {
    return this._rules[id];
  }

  get rules() {
    return this._sequence().toList();
  }

  get output() {
    return this._outputCache || (this._outputCache = this._computeOutput());
  }

  _saveMeta() {
    this._db.meta({ids: this._ids});
  }

  _doChange() {
    delete this._outputCache;
    this._emitter.emit('change');
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
      .map(id => this._hash[id]);
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
