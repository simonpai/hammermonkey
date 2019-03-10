export function augment(obj, ...rest) {
  return Object.create(obj, Object.assign({}, ...[{
    get state() {
      return obj;
    }
  }, ...rest].map(Object.getOwnPropertyDescriptors)));
}

export function mapValue(obj, fn) {
  return Object.keys(obj).reduce((acc, key) => {
    acc[key] = fn(obj[key]);
    return acc;
  }, {});
}

export function disperse(obj, fn) {
  return typeof obj !== 'object' ? fn(obj) : mapValue(obj, v => disperse(v, fn));
}
