import { app } from 'electron';
import Datastore from './util/nedb';

class Collection {

  constructor(filename) {
    console.log(filename);
    this._db = new Datastore({filename, autoload: true});
  }

  load() {
    return this._db.find({})
      .then(v => console.log(v) || v)
      .then(docs => docs.sequence()
        .fold({hash: {}}, (acc, {_id: id, ...doc}) => {
          if (id === '_meta') {
            Object.assign(acc, doc);
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

  meta(meta) {
    return this._db.update({_id: '_meta'}, {_id: '_meta', ...meta}, {upsert: true})
      .then(() => undefined);
  }

}

export default class Persistence {

  constructor() {
    const rootPath = app.getPath('userData');
    this.rules = new Collection(rootPath + '/rules.db');
  }

}
