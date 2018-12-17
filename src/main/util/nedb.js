import pathAPI from 'path';
import { app } from 'electron';
import _Datastore from 'nedb';

const ROOT_PATH = app.getPath('userData');

class DataStore {

  constructor(options) {
    const {filename, autoload} = options;
    if (filename) {
      options.filename = pathAPI.join(ROOT_PATH, filename);
    }
    options.autoload = autoload !== false; // default true
    this._db = new _Datastore(options);
  }

  insert(data) {
    return new Promise((resolve, reject) =>
      this._db.insert(data, (err, newData) => err ? reject(err) : resolve(newData)));
  }

  find(options, projection) {
    return new Promise((resolve, reject) =>
      this._db.find(options, projection, (err, docs) => err ? reject(err) : resolve(docs)));
  }

  findOne(options, projection) {
    return new Promise((resolve, reject) =>
      this._db.findOne(options, projection, (err, docs) => err ? reject(err) : resolve(docs)));
  }

  // TODO: Cursor

  // TODO: count

  update(query, update, options = {}) {
    return new Promise((resolve, reject) =>
      this._db.update(query, update, options, (err, numReplaced, upsert) => err ? reject(err) : resolve(numReplaced, upsert)));
  }

  remove(query, options = {}) {
    return new Promise((resolve, reject) =>
      this._db.remove(query, options, (err, numRemoved) => err ? reject(err) : resolve(numRemoved)));
  }

  // TODO: ensureIndex

}

class Collection {

  constructor(filename) {
    this._db = new DataStore({filename});
  }

  load() {
    // TODO: sanity check on hash and ids consistency, fix data with warning
    return this._db.find({})
      // .then(v => console.log(v) || v)
      .then(docs => docs.sequence()
        .fold({hash: {}}, (acc, {_id: id, ...doc}) => {
          if (id === '_meta') {
            acc.meta = doc;
          } else {
            acc.hash[id] = {id, ...doc};
          }
          return acc;
        }));
  }

  upsert(id, doc) {
    return this._db.update({_id: id}, {_id: id, ...doc}, {upsert: true})
      .then(() => undefined);
  }

  delete(id) {
    return this._db.remove({_id: id})
      .then(n => n > 0);
  }

  saveMeta(meta) {
    return this._db.update({_id: '_meta'}, {_id: '_meta', ...meta}, {upsert: true})
      .then(() => undefined);
  }

}

DataStore.Collection = Collection;

export default DataStore;


