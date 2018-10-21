export function flock(propName, obj) {
  return Object.keys(obj)
    .reduce((acc, key) => {
      const v = obj[key] !== undefined && obj[key][propName];
      if (v !== undefined) {
        acc[key] = v;
      }
      return acc;
    }, {});
}
