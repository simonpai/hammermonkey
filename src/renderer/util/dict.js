import { identity, nullable } from './functions';
import { memoize } from './decorators';

class Dict {

  constructor({ids = [], hash = {}}, options = {}) {
    this.state = {ids, hash};
    this._options = options;

    this._mapping = nullable(nullable)(options.mapping) || identity();
    this.get = this.get.bind(this);
    this.contains = this.contains.bind(this);

    Object.freeze(this);
  }

  get sequence() {
    return this.state.ids.sequence().map(this.get);
  }

  @memoize
  get all() {
    return this.state.ids.map(this.get);
  }

  get length() {
    return this.state.ids.length;
  }

  @memoize
  get(id) {
    return this._mapping(this.state.hash[id]);
  }

  contains(id) {
    return this.state.hash.hasOwnProperty(id);
  }

  upsert(id, item, index) {
    const {ids, hash} = this.state;
    return new Dict({
      ids: this.contains(id) ? ids :
        (index === undefined || index >= this.length) ? [...ids, id] :
        [...ids.slice(0, index), id, ...ids.slice(index)],
      hash: {...hash, [id]: item}
    }, this._options);
  }

  delete(id) {
    const {[id]: deletedId, ...restHash} = this.state.hash; // eslint-disable-line no-unused-vars
    return new Dict({
      ids: this.state.ids.filter(x => x !== id),
      hash: restHash,
    }, this._options);
  }

}

export default function dict(options = {}) {
  // make EMPTY singleton
  const EMPTY = new Dict({}, options);

  return (items = []) => {
    if (items === []) {
      return EMPTY;
    }
    if (Array.isArray(items)) {
      const state = items.reduce((acc, [id, item]) => {
        const {ids, hash} = acc;
        ids.push(id);
        hash[id] = item;
        return acc;
      }, {
        ids: [],
        hash: {}
      });
      return new Dict(state, options);
    }
    if (typeof items === 'object') {
      return new Dict(items, options);
    }
    throw new Error('Illegal argument: ' + items);
  };
}
