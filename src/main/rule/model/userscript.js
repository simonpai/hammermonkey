import BaseRule from './base';

export default class UserscriptRule extends BaseRule {

  constructor({content, ...options}) {
    super('userscript', options);
    this.content = content;
  }

  get output() {
    return {
      injectables: [
        {
          type: 'script',
          path: '/{{sessionId}}/http://{{auxHost}}/asset/' + this.id
        }
      ],
      assets: [
        {
          id: this.id,
          headers: {
            'Content-Type': 'text/javascript; charset=utf-8'
          },
          content: '(function(){\n' + this.content + '\n})();'
        }
      ]
    };
  }

}
