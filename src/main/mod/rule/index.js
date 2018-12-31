import { mergeBundle } from '../../util/objects';
import DictModel from '../../util/dict';
import * as Rule from './model';
import { MTR, RTM } from '../../../shared/model/ipc';

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

    client.on(RTM.RULE.COMMIT, (event, updateTime, rule) =>
      this.upsert(rule)
        .then(
          () => event.sender.send(MTR.RULE.COMMIT.SUCCESS, rule.id, updateTime),
          () => event.sender.send(MTR.RULE.COMMIT.FAILURE, rule.id, updateTime)));
    client.on(RTM.RULE.DELETE, (event, id) =>
      this.delete(id)
        .then(
          () => event.sender.send(MTR.RULE.DELETE.SUCCESS, id),
          () => event.sender.send(MTR.RULE.DELETE.FAILURE, id)));
    client.on(RTM.RULE.ACTIVE, (event, id, value) => this.setActive(id, value));
  }

  load() {
    return this._dict.load();
  }

  upsert({id, ...options}) {
    return this._dict.upsert(id, deserialize(id, options), 0);
  }

  delete(id) {
    return this._dict.delete(id);
  }

  setActive(id, value) {
    const rule = this.get(id);
    if (!rule) {
      return Promise.resolve();
    }
    rule.active = value;
    return this._dict.save(id);
  }

  // TODO: update order

  get(id) {
    return this._dict.get(id);
  }

  get state() {
    return this.rules;
  }

  get rules() {
    return this._dict.all;
  }

  get effects() {
    return this._dict.sequence()
      .filter(r => r.active)
      .map(this._effectsOfRule.bind(this))
      .fold({}, mergeBundle);
  }

  _effectsOfRule(rule) {
    // cache on rule object
    return rule._effects || (rule._effects = rule.effects);
  }

}
