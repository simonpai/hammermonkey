export function mergeBundle(target = {}) {
  // console.log(arguments);
  for (let i = 1, len = arguments.length, source; i < len; i++) {
    source = arguments[i];
    for (let key in source) {
      target[key] = (target[key] || []).concat(source[key]);
    }
  }
  // console.log(target);
  return target;
}
