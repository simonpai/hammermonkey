export default class Events {

  constructor(emitter) {
    this._emitter = emitter;
  }

  on(name, callback) {
    this._emitter.on(name, callback);
  }

  off(name, callback) {
    this._emitter.off(name, callback);
  }

  once(name, callback) {
    this._emitter.once(name, callback);
  }

}
