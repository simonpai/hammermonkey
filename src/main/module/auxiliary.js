import express from 'express';

export default class AuxiliaryService {

  constructor(rules, {port}) {
    this._rules = rules;
    rules.events.on('change', () => {
      delete this._assetMapCache;
    });
    // this._port = port;

    const app = express();
    app.get('/asset/:id', this._handleAsset.bind(this));
    this._server = app.listen(port);
  }

  get _assetMap() {
    return this._assetMapCache || (this._assetMapCache = this._computeAssetMap());
  }

  _computeAssetMap() {
    return (this._rules.output.assets || [])
      .sequence()
      .fold({}, (acc, asset) => {
        acc[asset.id] = asset;
        return acc;
      });
  }

  _handleAsset(req, res) {
    const id = req.params.id;
    const asset = this._assetMap[id];
    if (asset) {
      const {headers = {}, content = ''} = asset;
      Object.keys(headers)
        .forEach(k => res.set(k, headers[k]));
      res.send(content);
      return;
    }
    res.status(404).end();
  }

  close() {
    try {
      this._server.close();
    } catch(err) {} // eslint-disable-line no-empty
  }

}
