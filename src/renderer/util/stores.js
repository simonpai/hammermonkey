import { combineReducers } from 'redux';
import { memoize } from './functions';

export function flock(propName, obj) {
  return Object.keys(obj)
    .reduce((acc, key) => {
      const v = obj[key] !== undefined && obj[key][propName];
      if (v !== undefined) {
        acc[key] = v;
      }
      return acc;
    }, {});
}

export function prefixKeys(prefix, obj) {
  return Object.entries(obj)
    .reduce((acc, [key, value]) => {
      acc[prefix + key] = value;
      return acc;
    }, {});
}

export function combineIpc(obj) {
  return Object.assign(...Object.entries(obj)
    .sequence()
    .map(([key, value]) => prefixKeys(key + '.', value))
    .toArray());
}

const selectorCache = new WeakMap();

export function combine$(obj) {
  return state => selectorCache.computeIfAbsent(state, () => Object.entries(obj)
    .reduce((acc, [key, $]) => {
      Object.defineProperty(acc, key, {
        get: memoize(key, () => $(state[key]))
      });
      return acc;
    }, {}));
}

export function duck(obj, extra = {}) {
  return {
    action: Object.assign({}, flock('action', obj), extra.action),
    $: combine$(flock('$', obj)),
    ipc: Object.assign({}, combineIpc(flock('ipc', obj)), extra.ipc),
    initialState: flock('initialState', obj),
    reducer: combineReducers(flock('reducer', obj))
  };
}