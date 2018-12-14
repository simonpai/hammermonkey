import {ipcRenderer as ipcr} from 'electron';
import uuid from 'uuid/v1';

import { CONSOLE } from './types';
const { EVAL, MESSAGE, ERROR } = CONSOLE;

// action //
export const action = {
  eval: (sessionId, expr) => ({type: EVAL.REQUEST, sessionId, expr})
};

// ipc //
export const ipc = {
  eval: (event, sessionId, {value, error}) => ({type: EVAL.RESPONSE, sessionId, value, error}),
  console: (event, sessionId, value) => ({type: MESSAGE, sessionId, value}),
  error: (event, sessionId, error) => ({type: ERROR, sessionId, error}),
};

// selector //
class ConsoleSelector {

  constructor({hash = {}}) {
    this._hash = hash;
  }

  get state() {
    return {
      hash: this._hash
    };
  }

  get(sessionId) {
    return this._hash[sessionId] || [];
  }

  append(sessionId, obj) {
    return new ConsoleSelector({
      hash: {
        ...this._hash,
        [sessionId]: [
          ...this._hash[sessionId] || [],
          {
            uuid: uuid(),
            ...obj
          }
        ]
      }
    });
  }
}

export const $ = state => new ConsoleSelector(state);

// initial state //
export const initialState = $({}).state;

// reducer //
export function reducer(state = initialState, action = {}) {
  const {sessionId} = action;
  const append = obj => $(state).append(sessionId, obj).state;

  switch (action.type) {
    case EVAL.REQUEST:
      ipcr.send('console.eval', sessionId, action.expr);
      return append({
        type: 'eval.request',
        expr: action.expr
      });
    case EVAL.RESPONSE:
      return append({
        type: 'eval.response',
        value: action.value,
        error: action.error
      });
    case MESSAGE:
      return append({
        type: 'console.' + action.value.type,
        args: action.value.args
      });
    case ERROR:
      return append({
        type: 'error',
        error: action.error
      });
    default:
      return state;
  }
}
