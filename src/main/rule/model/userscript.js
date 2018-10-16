import BaseRule from './base';

export default class UserscriptRule extends BaseRule {

  constructor(options) {
    super('userscript', options);
  }

  get output() {
    return {
      injectables: [
        {
          type: 'script',
          path: '/{{sessionId}}/http://{{host}}/asset/' + this.id
        }
      ],
      assets: [
        {
          id: this.id,
          headers: {
            'Content-Type': 'text/javascript; charset=utf-8'
          },
          content: '(function(){\n' + this.data.content + '\n})();'
        }
      ]
    };
  }

}
