import EventEmitter from 'events';
import { mergeBundle } from '../util/objects';
import { create } from './model';
import Processor from './processor';
import Cache from './cache';

export default class EffectEngine {

  constructor() {
    this._emitter = new EventEmitter();
    this._processor = new Processor(this._construct.bind(this));
    this._sources = [];
    this._settings = [];
  }

  get events() {
    return this._emitter;
  }

  add(settings) {
    this._settings.push(settings);
    this._invalidate();
  }

  register(source) {
    const cache = new Cache(source);
    this._sources.push(cache);
    cache.events.on('invalidate', this._invalidate.bind(this));

    this._invalidate();
    return cache.interfaceForSource;
  }

  get effects() {
    return this._effects || (this._effects = this._computeEffects());
  }

  _invalidate() {
    if (!this._effects) {
      return;
    }
    delete this._effects;
    this._emitter.emit('invalidate');
  }

  _computeEffects() {
    return this._settings
      .sequence()
      .map(this._processor.derive.bind(this._processor))
      .plus(this._sources
        .sequence()
        .map(this._getEffectsFromSource.bind(this)))
      .fold({}, mergeBundle);
  }

  _getEffectsFromSource(source) {
    return source._effects || (source._effects = this._processor.derive(source.effects));
  }

  _construct(type, options) {
    return create(type, options);
  }

}
