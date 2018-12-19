import { prefixValues as pv } from '../util';

export const RTM = pv('rtm.', {
  SESSION: pv('session.', {
    OPEN: 'open',
    CLOSE: 'close',
    URL: 'url'
  }),
  RULE: pv('rule.', {
    SAVE: 'save',
    DELETE: 'delete',
    ACTIVE: 'active'
  }),
  CONSOLE: pv('console.', {
    EVAL: 'eval'
  }),
  UI: pv('ui.', {
    BODY: 'body'
  })
});

export const MTR = pv('mtr.', {
  LOAD: 'load',
  SESSION: pv('session.', {
    OPEN: 'open',
    PROXY_URL: 'proxy-url'
  }),
  RULE: pv('rule.', {
    SAVE: pv('save.', {
      SUCCESS: 'success',
      FAILURE: 'failure'
    }),
    DELETE: pv('delete.', {
      SUCCESS: 'success',
      FAILURE: 'failure'
    })
  }),
  CONSOLE: pv('console.', {
    EVAL: 'eval',
    MESSAGE: 'message',
    ERROR: 'error'
  })
});
