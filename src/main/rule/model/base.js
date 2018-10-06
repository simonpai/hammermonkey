export default class BaseRule {

  constructor(type, {id, active}) {
    this.type = type;
    this.id = id;
    this.active = active;
  }

  get output() {
    return {};
  }

}
