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
  eval: (event, sessionId, {value, error}) => ({type: EVAL_RESPONSE, sessionId, value, error}),
  console: (event, sessionId, value) => ({type: CONSOLE_RECEIVED, sessionId, value}),
  error: (event, sessionId, error) => ({type: ERROR_RECEIVED, sessionId, error}),
};

// initial state //
export const initialState = {
  hash: {}
};

// reducer //
function append(state, sessionId, obj) {
  return {
    ...state,
    hash: {
      ...state.hash,
      [sessionId]: [
        ...state.hash[sessionId] || [],
        {
          uuid: uuid(),
          ...obj
        }
      ]
    }
  };
}

export function reducer(state = initialState, action = {}) {
  const {sessionId} = action;
  switch (action.type) {
    case EVAL_REQUEST:
      ipcr.send('console.eval', sessionId, action.expr);
      return append(state, sessionId, {
        type: 'eval.request',
        expr: action.expr
      });
    case EVAL_RESPONSE:
      return append(state, sessionId, {
        type: 'eval.response',
        value: action.value,
        error: action.error
      });
    case CONSOLE_RECEIVED:
      return append(state, sessionId, {
        type: 'console.' + action.value.type,
        args: action.value.args
      });
    case ERROR_RECEIVED:
      return append(state, sessionId, {
        type: 'error',
        error: action.error
      });
    default:
      return state;
  }
}
