const memoizeMap0 = new WeakMap();
const memoizeMap1 = new WeakMap();

function _memoize(target, name, fn) {
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

export function memoize(target, name, descriptor) {
  if (typeof descriptor.value === 'function') {
    descriptor.value = _memoize(target, name, descriptor.value);
  }
  if (descriptor.get) {
    descriptor.get = _memoize(target, name, descriptor.get);
  }
}
