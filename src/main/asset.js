import express from 'express';

export default class AssetServer {

  constructor(rules, options = {}) {
    this._rules = rules;

    const app = express();
    app.get('/asset/:id', this._handleAsset.bind(this));
    this._port = options.port || 6565;
    this._server = app.listen(this._port);
  }

  get userscripts() {
    return this._rules.userscripts.map(rule => 'http://localhost:' + this._port + '/asset/' + rule.id);
  }

  _handleAsset(req, res) {
    const id = req.params.id;
    const rule = this._rules.get(id);
    if (rule) {
      switch (rule.type) {
        case 'userscript':
          res.set('Content-Type', 'text/javascript; charset=utf-8');
          res.send(rule.content);
          return;
      }
    }
    res.status(404).end();
  }

  close() {
    try {
      this._server.close();
    } catch(err) {} // eslint-disable-line no-empty
  }

}
