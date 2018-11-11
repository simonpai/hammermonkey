import { mergeBundle } from '../../util/objects';
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

    const dict = this._dict = new DictModel({
      filename: 'rules.db',
      serialize,
      deserialize
    });
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

  load() {
    return this._dict.load();
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
