export default class SimpleEffect {

  constructor(options) {
    Object.assign(this, options);
  }

  get sideEffects() {
    return {};
  }

}