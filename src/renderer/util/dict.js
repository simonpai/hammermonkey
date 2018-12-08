import { identity, nullable } from './functions';

class Dict {

  constructor({ids = [], hash = {}}, options = {}) {
    this._ids = ids;
    this._hash = hash;
    this._options = options;

    this._mapping = nullable(nullable)(options.mapping) || identity();
    this.get = this.get.bind(this);
    this.contains = this.contains.bind(this);

    Object.freeze(this);
  }

  get state() {
    return {
      ids: this._ids,
      hash: this._hash
    };
  }

  get sequence() {
    return this._ids.sequence().map(this.get);
  }

  get items() {
    return this._ids.map(this.get);
  }

  get length() {
    return this._ids.length;
  }

  get(id) {
    return this._mapping(this._hash[id]);
  }

  contains(id) {
    return this._hash.hasOwnProperty(id);
  }

  upsert(id, item, index) {
    return new Dict({
      ids: this.contains(id) ? this._ids :
        (index === undefined || index >= this.length) ? [...this._ids, id] :
        [...this._ids.slice(0, index), id, ...this._ids.slice(index)],
      hash: {...this._hash, [id]: item}
    }, this._options);
  }

  delete(id) {
    const {[id]: deletedId, ...restHash} = this._hash; // eslint-disable-line no-unused-vars
    return new Dict({
      ids: this._ids.filter(x => x !== id),
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
