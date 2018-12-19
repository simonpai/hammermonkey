import DataStore from '../util/nedb';
import { RTM } from '../../shared/model/ipc';

export default class SettingsService {

  constructor({client}) {
    this._hash = {};
    this._db = new DataStore({filename: 'settings.db'});

    client.on(RTM.UI.BODY, (event, value) => this.set('ui.body', value));
  }

  get state() {
    return this._hash;
  }

  load() {
    return this._db.find({})
      .then(docs => docs.reduce((acc, {_id: key, value}) => {
        acc[key] = value;
        return acc;
      }, {}))
      .then(hash => {
        this._hash = hash;
      });
  }

  set(key, value) {
    this._hash[key] = value;
    this._db.update({_id: key}, {_id: key, value: value}, {upsert: true});
  }

}