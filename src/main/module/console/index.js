import EventEmitter from 'events';
import { readFileSync } from 'fs';
import bodyParser from 'body-parser';
// import { render } from 'mustache';

const USERSCRIPT = readFileSync(require.resolve('./userscript')).toString();

export default class ConsoleService {

  constructor(hammerhead, effects) {
    this._emitter = new EventEmitter();

    effects.add({
      userscript: [
        {
          id: 'plugin.console.core',
          content: USERSCRIPT
        }
      ]
    });

    hammerhead.app
      .post('/:sessionId/http://__host__/api/console/console', bodyParser.json(), this._handleConsole.bind(this))
      .post('/:sessionId/http://__host__/api/console/error', bodyParser.json(), this._handleError.bind(this));
  }

  get events() {
    return this._emitter;
  }

  _handleConsole(req, res) {
    const {sessionId} = req.params;
    this._emitter.emit('console', sessionId, req.body);
    res.sendStatus(204);
  }

  _handleError(req, res) {
    const {sessionId} = req.params;
    this._emitter.emit('error', sessionId, req.body);
    res.sendStatus(204);
  }

  close() {}

}
