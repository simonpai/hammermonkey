import {ipcRenderer as ipcr} from 'electron';
import uuid from 'uuid/v1';
import {type as rootType} from './root';

const {LOAD} = rootType;

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
  url: (id, url) => ({type: URL_REQUEST, id, url})
};

// ipc //
export const ipc = {
  'open': (event, id) => ({type: OPEN_SUCCESS, id}),
  'url.success': (event, id, url) => ({type: URL_SUCCESS, id, url}),
  'console': (event, id, value) => ({type: CONSOLE_RECEIVED, id, value}),
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
  const {id} = action;
  const session = id && state.hash[id];
  switch (action.type) {
    case LOAD:
      return action.data.sessions.sequence()
        .fold({hash: {}, ids: []}, (acc, session) => {
          const {id} = session;
          acc.hash[id] = {...session, consoleMsgs: []};
          acc.ids.push(id);
          return acc;
        });
    case OPEN_REQUEST:
      // TODO: create a placeholder session
      ipcr.send('session.open');
      return state;
    case OPEN_SUCCESS:
      return {
        ...state,
        hash: {
          ...state.hash,
          [id]: {
            id,
            consoleMsgs: []
          }
        },
        ids: [
          ...state.ids,
          id
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
            [id]: {
              ...session,
              url: url,
              proxyUrl: undefined
            }
          }
        };
      }
      ipcr.send('session.url', id, url.indexOf('://') < 0 ? ('http://' + url) : url);
      return {
        ...state,
        hash: {
          ...state.hash,
          [id]: {
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
          [id]: {
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
          [id]: {
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
          [id]: {
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
