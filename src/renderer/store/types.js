import { requestTypes as rt, prefixValues as pv } from '../util/stores';

export const LOAD = 'load';

export const RULE = pv('rule.', {
  CREATE: 'create',
  UPDATE: 'update',
  SET_ACTIVE: 'set-active',
  SAVE: rt('save'),
  DELETE: rt('delete'),
  UI: pv('ui.', {
    SET_SECTION: 'set-section'
  })
});

export const SESSION = pv('session.', {
  OPEN: rt('open'),
  CLOSE: 'close',
  SET_URL: rt('url'),
  UI: pv('ui.', {
    SET_SECTION: 'set-section'
  })
});

export const CONSOLE = pv('console.', {
  EVAL: pv('eval.', {
    REQUEST: 'request',
    RESPONSE: 'response'
  }),
  MESSAGE: 'message',
  ERROR: 'error'
});

export const UI = pv('ui.', {
  SET_BODY: 'set-body',
  CONFIRM: 'confirm'
});
