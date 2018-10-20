import { readFileSync } from 'fs';
import { render } from 'mustache';
import bodyParser from 'body-parser';

const USERSCRIPT = readFileSync(require.resolve('./console-userscript')).toString();

export default class ConsoleService {

  constructor(hammerhead, effects) {
    effects.add({
      userscript: [
        {
          id: 'plugin.console.core',
          content: render(USERSCRIPT, {host: hammerhead.host})
        }
      ]
    });
    hammerhead.app.post('/:sessionId/http://__host__/error', bodyParser.text(), this._handleError.bind(this));
  }

  _handleError(req, res) {
    const {sessionId} = req.params;
    console.log('error', sessionId, req.body);
    res.end();
  }

  close() {}

}
