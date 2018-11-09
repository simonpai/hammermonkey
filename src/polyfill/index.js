import electron from 'electron';
import { asSequence } from 'sequency';

// unify global variable
try {
  window.global = window;
} catch(e) {} // eslint-disable-line no-empty

// expose DEV flag
const DEV = global.DEV = !(electron.remote ? electron.remote.app : electron.app).isPackaged;

// array.sequence()
Array.prototype.sequence = function() {
  return asSequence(this);
};

function _inspect(f, name, mode) {
  return function() {
    /* eslint-disable no-console */
    (mode & 1) && console.log('[' + name + '] arguments:', ...arguments);
    try {
      const r = f.apply(this, arguments);
      (mode & 2) && console.log('[' + name + '] return:', r);
      return r && typeof r.then === 'function' && typeof r.catch === 'function' ?
        r.catch((err) => {
          console.log('[' + name + '] error:', err);
          throw err;
        }) :
        r;
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

Object.defineProperty(global, 'inspect', {
  value: DEV ? inspect : () => {}
});
