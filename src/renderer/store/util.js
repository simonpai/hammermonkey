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

export function duck(obj) {
  return {
    action: flock('action', obj),
    ipc: combineIpc(flock('ipc', obj)),
    initialState: flock('initialState', obj),
    selector: flock('selector', obj),
    reducer: combineReducers(flock('reducer', obj))
  };
}
