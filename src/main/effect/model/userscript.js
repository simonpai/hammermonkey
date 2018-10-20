export default class UserscriptEffect {

  constructor({id, content}) {
    this.id = id;
    this.content = content;
  }

  get sideEffects() {
    return {
      injectable: [
        {
          type: 'script',
          path: '/{{sessionId}}/http://{{host}}/asset/' + this.id
        }
      ],
      asset: [
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