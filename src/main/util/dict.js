import EventEmitter from 'events';
import DataStore from './nedb';
import Events from './events';

export default class DictModel {

  constructor({filename, serialize, deserialize}) {
    this.events = new Events(this._emitter = new EventEmitter());
    this._db = new DataStore.Collection(filename);
    this._serialize = serialize;
    this._deserialize = deserialize;
    this._hash = {};
    this._ids = [];

    this.get = this.get.bind(this);
    this.contains = this.contains.bind(this);
  }

  _doBeforeChange() {
    this._emitter.emit('before-change');
  }

  _doChange() {
    this._emitter.emit('change');
  }

  _doPersist() {
    this._emitter.emit('persist');
  }

  sequence() {
    return this._ids.sequence().map(this.get);
  }

  get items() {
    return this._ids.map(this.get);
  }

  get length() {
    return this._ids.length;
  }

  get(id) {
    return this._hash[id];
  }

  contains(id) {
    return this._hash.hasOwnProperty(id);
  }

  load() {
    this._doBeforeChange();

    return this._db.load()
      .then(({hash = {}, meta = {}}) => {
        // TODO: sanitize the data
        Object.keys(hash).forEach(id => {
          hash[id] = this._deserialize(id, hash[id]);
        });
        this._hash = hash;
        this._ids = meta.ids || [];

        this._doChange();
      });
  }

  upsert(id, item, index) {
    this._doBeforeChange();

    const persistences = [];
    if (index !== undefined && (index < 0 || index >= this._ids.length)) {
      index = undefined
    }
    if (!this._hash[id]) {
      if (index === undefined) {
        this._ids.push(id);
      } else {
        this._ids.splice(index, 0, id);
      }
      persistences.push(this._saveMeta());
    }
    this._hash[id] = item;

    this._doChange();

    // persist
    const {id: _id, ...data} = this._serialize(item); // eslint-disable-line no-unused-vars
    persistences.push(this._db.upsert(id, data));
    return Promise.all(persistences)
      .then(this._doPersist.bind(this));
  }

  // TODO
  // move(id, index)

  delete(id) {
    const i = this._ids.indexOf(id);
    if (i < 0) {
      return;
    }
    this._doBeforeChange();

    delete this._hash[id];
    this._ids.splice(i, 1);

    this._doChange();

    // persist
    return Promise.all(this._saveMeta(), this._db.delete(id))
      .then(this._doPersist.bind(this));
  }

  _saveMeta() {
    return this._db.saveMeta({ids: this._ids});
  }

}