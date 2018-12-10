import { memoize as memoizeFn } from './functions';

export function memoize(target, name, descriptor) {
  if (typeof descriptor.value === 'function') {
    descriptor.value = memoizeFn(name, descriptor.value);
  }
  if (descriptor.get) {
    descriptor.get = memoizeFn(name, descriptor.get);
  }
}
