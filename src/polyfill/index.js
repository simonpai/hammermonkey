import { asSequence } from 'sequency';

Array.prototype.sequence = function() {
  return asSequence(this);
};

let _global = undefined;
try {
  _global = window;
} catch(e) {
  _global = global;
}

function _inspect(f, name, mode) {
  return function() {
    /* eslint-disable no-console */
    (mode & 1) && console.log('[' + name + '] arguments:', ...arguments);
    try {
      const r = f.apply(this, arguments);
      (mode & 2) && console.log('[' + name + '] return:', r);
      return r;
    } catch(err) {
      console.log('[' + name + '] error:', err);
      throw err;
    }
    /* eslint-enable no-console */
  }
}

function inspect(target, name, descriptor) {
  const prefix = target.constructor.name + '.';
  if (typeof descriptor.value === 'function') {
    descriptor.value = _inspect(descriptor.value, prefix + name, 3);
  }
  if (descriptor.get) {
    descriptor.get = _inspect(descriptor.get, prefix + 'get ' + name, 2);
  }
  if (descriptor.set) {
    descriptor.set = _inspect(descriptor.set, prefix + 'set ' + name, 1);
  }
}

Object.defineProperty(_global, 'inspect', {
  value: inspect
});
