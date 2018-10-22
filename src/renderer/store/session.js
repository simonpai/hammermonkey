import {ipcRenderer as ipcr} from 'electron';
import uuid from 'uuid/v1';

const OPEN_REQUEST = 'session.open.request';
const OPEN_SUCCESS = 'session.open.success';
const OPEN_FAILURE = 'session.open.failure';
const URL_REQUEST = 'session.url.request';
const URL_SUCCESS = 'session.url.success';
const URL_FAILURE = 'session.url.failure';

// const CONSOLE_SENT = 'session.console.sent';
const CONSOLE_RECEIVED = 'session.console.received';
const ERROR_RECEIVED = 'session.error.received';

// action //
export const action = {
  open: () => ({type: OPEN_REQUEST}),
  url: (sessionId, url) => ({type: URL_REQUEST, sessionId, url})
};

// ipc //
export const ipc = {
  'session.open': (event, sessionId) => ({type: OPEN_SUCCESS, sessionId}),
  'session.url.success': (event, sessionId, url) => ({type: URL_SUCCESS, sessionId, url}),
  'session.console': (event, sessionId, value) => ({type: CONSOLE_RECEIVED, sessionId, value}),
};

// initial state //
export const initialState = {
  hash: {},
  ids: []
};

// selector //
export const selector = {
  list: session => session.ids.map(id => session.hash[id])
};

// reducer //
export function reducer(state = initialState, action = {}) {
  const {sessionId} = action;
  const session = sessionId && state.hash[sessionId];
  switch (action.type) {
    case OPEN_REQUEST:
      // TODO: create a placeholder session
      ipcr.send('session.open');
      return state;
    case OPEN_SUCCESS:
      return {
        ...state,
        hash: {
          ...state.hash,
          [sessionId]: {
            sessionId,
            consoleMsgs: []
          }
        },
        ids: [
          ...state.ids,
          sessionId
        ]
      };
    case OPEN_FAILURE:
      // TODO
      return state;
    case URL_REQUEST:
      // TODO: rename: shall be update
      var url = action.url.trim();
      if (!url) {
        return {
          ...state,
          hash: {
            ...state.hash,
            [sessionId]: {
              ...session,
              url: url,
              proxyUrl: undefined
            }
          }
        };
      }
      ipcr.send('session.url', sessionId, url.indexOf('://') < 0 ? ('http://' + url) : url);
      return {
        ...state,
        hash: {
          ...state.hash,
          [sessionId]: {
            ...session,
            url: url
          }
        }
      };
    case URL_SUCCESS:
      return {
        ...state,
        hash: {
          ...state.hash,
          [sessionId]: {
            ...session,
            proxyUrl: action.url
          }
        }
      };
    case URL_FAILURE:
      // TODO
      return state;
    case CONSOLE_RECEIVED:
      if (!session) {
        return state;
      }
      return {
        ...state,
        hash: {
          ...state.hash,
          [sessionId]: {
            ...session,
            consoleMsgs: [
              ...session.consoleMsgs,
              {
                uuid: uuid(),
                type: 'console.' + action.value.type,
                args: action.value.args
              }
            ]
          }
        }
      };
    case ERROR_RECEIVED:
      if (!session) {
        return state;
      }
      return {
        ...state,
        hash: {
          ...state.hash,
          [sessionId]: {
            ...session,
            consoleMsgs: [
              ...session.consoleMsgs,
              {
                uuid: uuid(),
                type: 'error',
                error: action.value
              }
            ]
          }
        }
      };
    default:
      return state;
  }
}
