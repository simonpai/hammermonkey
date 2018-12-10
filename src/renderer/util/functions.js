export function propOf(key) {
  return obj => obj[key];
}

export function mappedBy(obj) {
  return typeof obj === 'function' ? obj : propOf(obj);
}

function _identity(v) {
  return v;
}

export function identity() {
  return _identity;
}

export function nullable(fn) {
  return v => v === undefined ? v : fn(v);
}

const memoizeMap0 = new WeakMap();
const memoizeMap1 = new WeakMap();

export function memoize(name, fn) {
  return function(arg) {
    switch (arguments.length) {
      case 0:
        var m0 = memoizeMap0.computeIfAbsent(this, () => ({}));
        return m0[name] || (m0[name] = fn.call(this));
      case 1:
        switch (typeof arg) {
          case 'undefined':
          case 'boolean':
          case 'number':
          case 'string':
            var m1 = memoizeMap1.computeIfAbsent(this, () => ({}));
            var v = m1[name] || (m1[name] = {});
            return v[arg] || (v[arg] = fn.call(this, arg));
        }
        break;
    }
    return fn.apply(this, arguments);
  }
}
