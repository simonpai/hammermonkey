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
  map: {},
  ids: []
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
        map: {
          ...state.map,
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
      var url = action.url.trim();
      if (!url) {
        return state;
      }
      // TODO: throttle
      ipcr.send('session.url', sessionId, url);
      return {
        ...state,
        map: {
          ...state.map,
          [sessionId]: {
            ...state.map[sessionId],
            url: url
          }
        }
      };
    case URL_SUCCESS:
      return {
        ...state,
        map: {
          ...state.map,
          [sessionId]: {
            ...state.map[sessionId],
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
