import BaseRule from './base';

export default class UserscriptRule extends BaseRule {

  constructor(options) {
    super('userscript', options);
  }

  get effects() {
    return {
      userscript: [
        {
          id: this.id,
          content: this.data.content
        }
      ]
    };
  }

}
