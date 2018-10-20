import SimpleEffect from './simple';
import Userscript from './userscript';

const list = [
  {
    type: 'asset',
    clazz: SimpleEffect
  },
  {
    type: 'injectable',
    clazz: SimpleEffect
  },
  {
    type: 'userscript',
    clazz: Userscript
  },
];

const hash = list
  .sequence()
  .fold({}, (acc, {type, clazz}) => (acc[type] = clazz) && acc);

export function create(type, options) {
  const effect = new (hash[type] || SimpleEffect)(options);
  // Object.defineProperty(effect, '_type', {value: type});
  return effect;
}
