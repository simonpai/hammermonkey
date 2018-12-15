export function prefixValues(prefix, obj) {
  switch(typeof obj) {
    case 'string':
      return prefix + obj;
    case 'object':
      var fn = t => prefixValues(prefix, t);
      return Array.isArray(obj) ? obj.map(fn) : Object.entries(obj)
        .reduce((acc, [key, value]) => {
          acc[key] = fn(value);
          return acc;
        }, {});
  }
  throw new Error('Non-string value: ' + obj);
}
