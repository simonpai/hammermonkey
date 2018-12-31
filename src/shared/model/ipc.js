import { prefixValues } from '../util';

const pv = prefixValues('.');

export const RTM = pv('rtm', {
  SESSION: pv('session', {
    OPEN: 'open',
    CLOSE: 'close',
    URL: 'url'
  }),
  RULE: pv('rule', {
    COMMIT: 'commit',
    DELETE: 'delete',
    ACTIVE: 'active'
  }),
  CONSOLE: pv('console', {
    EVAL: 'eval'
  }),
  UI: pv('ui', {
    BODY: 'body'
  })
});

export const MTR = pv('mtr', {
  LOAD: 'load',
  SESSION: pv('session', {
    OPEN: 'open',
    PROXY_URL: 'proxy-url'
  }),
  RULE: pv('rule', {
    COMMIT: pv('commit', {
      SUCCESS: 'success',
      FAILURE: 'failure'
    }),
    DELETE: pv('delete', {
      SUCCESS: 'success',
      FAILURE: 'failure'
    })
  }),
  CONSOLE: pv('console', {
    EVAL: 'eval',
    MESSAGE: 'message',
    ERROR: 'error'
  })
});
