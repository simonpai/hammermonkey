export function propOf(key) {
  return obj => obj[key];
}

export function mappedBy(obj) {
  return typeof obj === 'function' ? obj : propOf(obj);
}
