import EventEmitter from 'events';
import { mergeBundle } from '../util/objects';
import * as Rule from './model';

export default class RuleManager {

  constructor(db, effects) {
    this._emitter = new EventEmitter();
    this._hash = {};
    this._ids = [];
    this._db = db;

    this._effectsCache = effects.register(this);
  }

  get events() {
    return this._emitter;
  }

  _constructRule(type, options) {
    return new (Rule[type])(options);
  }

  load() {
    return this._db.load()
      // .then(v => console.log(v) || v)
      .then(({hash = {}, meta = {}}) => {
        Object.keys(hash).forEach(id => {
          const {type, ...options} = hash[id];
          hash[id] = this._constructRule(type, {id, ...options});
        });
        this._hash = hash;
        this._ids = meta.ids || [];

        // invalidate effects
        this._effectsCache.invalidate();
      });
  }

  update({id, type, ...options}) {
    const rule = this._constructRule(type, {id, ...options});

    if (!this._hash[id]) {
      this._ids.splice(0, 0, id);
      this._saveMeta();
    }
    this._hash[id] = rule;

    // persist
    this._db.upsert(id, {type, ...options}); // TODO: get this from rule model

    // invalidate effects
    this._effectsCache.invalidate();
  }

  delete(id) {
    const i = this._ids.indexOf(id);
    if (i < 0) {
      return;
    }
    this._ids.splice(i, 1);
    delete this._hash[id];

    // persist
    this._db.delete(id);

    // invalidate effects
    this._effectsCache.invalidate();
  }

  // TODO: update order

  get(id) {
    return this._rules[id];
  }

  get rules() {
    return this._sequence().toList();
  }

  get effects() {
    return this._sequence()
      .map(this._effectsOfRule.bind(this))
      .fold({}, mergeBundle);
  }

  _saveMeta() {
    this._db.saveMeta({ids: this._ids});
  }

  _sequence() {
    return this._ids
      .sequence()
      .map(id => this._hash[id]);
  }

  _effectsOfRule(rule) {
    // cache on rule object
    return rule._effects || (rule._effects = rule.effects);
  }

}
