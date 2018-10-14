import _Datastore from 'nedb';

export default class Datastore {

  constructor(options) {
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

  update(query, update, options) {
    return new Promise((resolve, reject) =>
      this._db.update(query, update, options, (err, numReplaced, upsert) => err ? reject(err) : resolve(numReplaced, upsert)));
  }

  remove(query, options) {
    return new Promise((resolve, reject) =>
      this._db.remove(query, options, (err, numRemoved) => err ? reject(err) : resolve(numRemoved)));
  }

  // TODO: ensureIndex

}