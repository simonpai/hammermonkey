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
