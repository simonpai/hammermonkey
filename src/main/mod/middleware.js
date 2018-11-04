import express from 'express';

export default class MiddlewareService {

  constructor({effects}) {
    this._effects = effects;
    effects.events.on('invalidate', () => {
      delete this._middlewareCache;
    });

    // go through the getter everytime
    Object.defineProperty(this, 'middleware', {
      value: (req, res, next) => this._middleware(req, res, next)
    })
  }

  get _middleware() {
    return this._middlewareCache || (this._middlewareCache = this._computeMiddleware());
  }

  _computeMiddleware() {
    return (this._effects.effects.middleware || [])
      .sequence()
      .fold(express(), (app, m) => {
        app.use(m.path, m.handler);
        return app;
      });
  }

  close() {}

}
