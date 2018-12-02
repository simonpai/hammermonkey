import { readFileSync } from 'fs';
import bodyParser from 'body-parser';
// import { render } from 'mustache';

const USERSCRIPT = readFileSync(require.resolve('./userscript')).toString();

export default class ConsoleService {

  constructor({hammerhead, effects, client}) {
    this._hammerhead = hammerhead;
    this._client = client;

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
      .post('/:sessionId/http://__host__/api/console/error', bodyParser.json(), this._handleError.bind(this))
      .post('/:sessionId/http://__host__/api/console/eval', bodyParser.json(), this._handleEvalResponse.bind(this));

    client.on('console.eval', this._handleEvalRequest.bind(this));
  }

  _handleEvalRequest(event, sessionId, expr) {
    const session = this._hammerhead.sessions.get(sessionId);
    if (!session) {
      return;
    }
    // session.push.add('console.eval', expr);
  }

  _handleConsole(req, res) {
    const {sessionId} = req.params;
    this._client.send('console.console', sessionId, req.body);
    res.sendStatus(204);
  }

  _handleError(req, res) {
    const {sessionId} = req.params;
    this._client.send('console.error', sessionId, req.body);
    res.sendStatus(204);
  }

  _handleEvalResponse(req, res) {
    const {sessionId} = req.params;
    this._client.send('console.eval', sessionId, req.body);
    res.sendStatus(204);
  }

}
