export default class BaseRule {

  constructor(type, {id, active, data}) {
    this.type = type;
    this.id = id;
    this.active = active;
    this.data = data;
  }

  get output() {
    return {};
  }

}
