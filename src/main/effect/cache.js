import EventEmitter from 'events';

export default class EffectsCache {

  constructor(source) {
    this._source = source;
    this._emitter = new EventEmitter();

    this.interfaceForSource = Object.freeze({
      invalidate: this.invalidate.bind(this)
    });
  }

  get events() {
    return this._emitter;
  }

  get effects() {
    return this._effects || (this._effects = this._source.effects);
  }

  invalidate() {
    delete this._effects;
    this._emitter.emit('invalidate');
  }

}
