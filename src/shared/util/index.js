function _prefixValues(divider, prefix, obj) {
  switch(typeof obj) {
    case 'string':
      return prefix + divider + obj;
    case 'object':
      var fn = t => _prefixValues(divider, prefix, t);
      return Array.isArray(obj) ? obj.map(fn) : Object.entries(obj)
        .reduce((acc, [key, value]) => {
          acc[key] = fn(value);
          return acc;
        }, {});
  }
  throw new Error('Non-string value: ' + obj);
}

export function prefixValues(divider) {
  return (prefix, obj) => _prefixValues(divider, prefix, obj);
}
