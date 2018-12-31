import { prefixValues } from '../util/stores';

const pv = prefixValues('.');

const RQ = {
  REQUEST: 'request',
  SUCCESS: 'success',
  FAILURE: 'failure'
};

export const LOAD = 'load';

export const RULE = pv('rule', {
  CREATE: 'create',
  UPDATE: 'update',
  SET_ACTIVE: 'set-active',
  COMMIT: pv('commit', RQ),
  DELETE: pv('delete', RQ),
  UI: pv('ui', {
    SET_SECTION: 'set-section'
  })
});

export const SESSION = pv('session', {
  OPEN: pv('open', RQ),
  CLOSE: 'close',
  SET_URL: pv('url', RQ),
  UI: pv('ui', {
    SET_SECTION: 'set-section'
  })
});

export const CONSOLE = pv('console', {
  EVAL: pv('eval', {
    REQUEST: 'request',
    RESPONSE: 'response'
  }),
  MESSAGE: 'message',
  ERROR: 'error'
});

export const UI = pv('ui', {
  SET_BODY: 'set-body',
  CONFIRM: 'confirm'
});
