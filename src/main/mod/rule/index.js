/*
import EventEmitter from 'events';
import Events from '../../util/events';
*/
import { mergeBundle } from '../../util/objects';
// import DataStore from '../../util/nedb';
import DictModel from '../../util/dict';
import * as Rule from './model';

function serialize(rule) {
  return rule.serialized;
}

function deserialize(id, {type, ...options}) {
  return new (Rule[type])({id, ...options});
}

export default class RuleService {

  constructor({effects, client}) {
    const effectCache = this._effectsCache = effects.register(this);

    // this.events = new Events(this._emitter = new EventEmitter());
    const dict = this._dict = new DictModel({
      filename: 'rules.db',
      serialize,
      deserialize
    });
    /*
    this._db = new DataStore.Collection('rules.db');
    this._hash = {};
    this._ids = [];
    */

    dict.events.on('change', effectCache.invalidate.bind(effectCache));

    client.on('rule.save', (event, updateTime, rule) => 
      this.upsert(rule)
        .then(
          () => event.sender.send('rule.save.success', rule.id, updateTime),
          () => event.sender.send('rule.save.failure', rule.id, updateTime)));
    client.on('rule.delete', (event, id) =>
      this.delete(id)
        .then(
          () => event.sender.send('rule.delete.success', id),
          () => event.sender.send('rule.delete.failure', id)));
  }

  /*
  _constructRule(type, options) {
    return new (Rule[type])(options);
  }
  */

  load() {
    return this._dict.load();
    /*
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
    */
  }

  upsert({id, type, ...options}) {
    return this._dict.upsert(id, deserialize(id, {type, ...options}), 0);
  }

  delete(id) {
    return this._dict.delete(id);
  }

  // TODO: update order

  get(id) {
    return this._dict.get(id);
  }

  get rules() {
    return this._dict.items;
  }

  get effects() {
    return this._dict.sequence()
      .map(this._effectsOfRule.bind(this))
      .fold({}, mergeBundle);
  }

  _effectsOfRule(rule) {
    // cache on rule object
    return rule._effects || (rule._effects = rule.effects);
  }

}
