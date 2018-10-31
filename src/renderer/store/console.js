import {ipcRenderer as ipcr} from 'electron';
import uuid from 'uuid/v1';

const EVAL_REQUEST = 'console.eval.request';
const EVAL_RESPONSE = 'console.eval.response';
const CONSOLE_RECEIVED = 'console.console.received';
const ERROR_RECEIVED = 'console.error.received';

// action //
export const action = {
  eval: (sessionId, expr) => ({type: EVAL_REQUEST, sessionId, expr})
};

// ipc //
export const ipc = {
  'eval': (event, sessionId, value) => ({type: EVAL_RESPONSE, sessionId, value}),
  'console': (event, sessionId, value) => ({type: CONSOLE_RECEIVED, sessionId, value}),
  'error': (event, sessionId, error) => ({type: ERROR_RECEIVED, sessionId, error}),
};

// initial state //
export const initialState = {
  hash: {}
};

// reducer //
function getEntryType(action) {
  switch (action.type) {
    case EVAL_REQUEST:
      return 'eval.request';    
    case EVAL_RESPONSE:
      return 'eval.received';    
    case CONSOLE_RECEIVED:
      return 'console.' + action.value.type;
  }
  throw new Error();
}

function getEntryArgs(action) {
  switch (action.type) {
    case EVAL_REQUEST:
      return [action.expr];
    case EVAL_RESPONSE:
      return [action.value];
    case CONSOLE_RECEIVED:
      return action.value.args;
  }
  throw new Error();
}

export function reducer(state = initialState, action = {}) {
  const {sessionId} = action;
  const session = state.hash[sessionId] || [];
  switch (action.type) {
    case EVAL_REQUEST:
      ipcr.send('console.eval', sessionId, action.expr);
      // no break: eslint-disable-next-line no-fallthrough
    case EVAL_RESPONSE:
    case CONSOLE_RECEIVED:
      return {
        ...state,
        hash: {
          ...state.hash,
          [sessionId]: [
            ...session,
            {
              uuid: uuid(),
              type: getEntryType(action),
              args: getEntryArgs(action)
            }
          ]
        }
      };
    case ERROR_RECEIVED:
      return {
        ...state,
        hash: {
          ...state.hash,
          [sessionId]: [
            ...session,
            {
              uuid: uuid(),
              type: 'error',
              error: action.error
            }
          ]
        }
      };
    default:
      return state;
  }
}
