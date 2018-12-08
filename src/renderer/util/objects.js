export function augment(obj, ...rest) {
  return Object.create(obj, Object.assign({}, ...[{
    get state() {
      return obj;
    }
  }, ...rest].map(Object.getOwnPropertyDescriptors)));
}
