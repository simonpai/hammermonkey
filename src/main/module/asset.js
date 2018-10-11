export default class AssetManager {

  constructor(hammerhead, rules) {
    this._rules = rules;
    rules.events.on('change', () => {
      delete this._assetMapCache;
    });

    hammerhead.app.get('/asset/:id', this._handleAsset.bind(this));
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

  _handleAsset(req, res, next) {
    const id = req.params.id;
    const asset = this._assetMap[id];
    if (asset) {
      const {headers = {}, content = ''} = asset;
      Object.keys(headers)
        .forEach(k => res.set(k, headers[k]));
      res.send(content);

    } else {
      next();
    }
  }

  close() {
    try {
      this._server.close();
    } catch(err) {} // eslint-disable-line no-empty
  }

}
