import { readFileSync } from 'fs';
import bodyParser from 'body-parser';
// import { render } from 'mustache';

const USERSCRIPT = readFileSync(require.resolve('./userscript')).toString();

export default class ConsoleService {

  constructor(hammerhead, effects) {
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

  _handleConsole(req, res) {
    const {sessionId} = req.params;
    console.log('console', sessionId, req.body);
    res.sendStatus(204);
  }

  _handleError(req, res) {
    const {sessionId} = req.params;
    console.log('error', sessionId, req.body);
    res.sendStatus(204);
  }

  close() {}

}
