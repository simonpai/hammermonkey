import {ipcRenderer as ipcr} from 'electron';

const OPEN_REQUEST = 'session.open.request';
const OPEN_SUCCESS = 'session.open.success';
const OPEN_FAILURE = 'session.open.failure';
const URL_REQUEST = 'session.url.request';
const URL_SUCCESS = 'session.url.success';
const URL_FAILURE = 'session.url.failure';

// action //
export const action = {
  open: () => ({type: OPEN_REQUEST}),
  url: (sessionId, url) => ({type: URL_REQUEST, sessionId, url})
};

// ipc //
export const ipc = {
  'session.open': (event, sessionId) => ({type: OPEN_SUCCESS, sessionId}),
  'session.url.success': (event, sessionId, url) => ({type: URL_SUCCESS, sessionId, url})
};

// initial state //
export const initialState = {
  hash: {},
  ids: []
};

// helpers //
export const helpers = {
  list: session => session.ids.map(id => session.hash[id])
};

// reducer //
export function reducer(state = initialState, action = {}) {
  const {sessionId} = action;
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
            sessionId
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
              ...state.hash[sessionId],
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
            ...state.hash[sessionId],
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
            ...state.hash[sessionId],
            proxyUrl: action.url
          }
        }
      };
    case URL_FAILURE:
      // TODO
      return state;
    default:
      return state;
  }
}
