import { combineReducers } from 'redux';

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

export function duck(obj, extra = {}) {
  return {
    action: Object.assign({}, flock('action', obj), extra.action),
    $: Object.assign({}, flock('$', obj), extra.$),
    ipc: Object.assign({}, combineIpc(flock('ipc', obj)), extra.ipc),
    initialState: flock('initialState', obj),
    reducer: combineReducers(flock('reducer', obj))
  };
}
