import { mergeBundle } from '../util/objects';

export default class Processor {

  constructor(factory) {
    this._factory = factory;
  }

  construct(type, options) {
    return this._factory(type, options);
  }

  derive(settings) {
    return Object.keys(settings)
      .sequence()
      .flatMap(type => settings[type]
        .sequence()
        .map(options => this.construct(type, options))
        .map(effect => [this.derive(effect.sideEffects), {[type]: [effect]}])
        .flatten())
      .fold({}, mergeBundle);
  }

}
