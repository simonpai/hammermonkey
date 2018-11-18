import {ipcRenderer as ipcr} from 'electron';
import nanoid from 'nanoid/generate';
import {type as rootType} from './root';

const ALPHABET = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const {LOAD} = rootType;

const OPEN_REQUEST = 'session.open.request';
const OPEN_SUCCESS = 'session.open.success';
const OPEN_FAILURE = 'session.open.failure';
const URL_REQUEST = 'session.url.request';
const URL_SUCCESS = 'session.url.success';
const URL_FAILURE = 'session.url.failure';

// action //
export const action = {
  open: () => ({type: OPEN_REQUEST}),
  url: (id, url) => ({type: URL_REQUEST, id, url})
};

// ipc //
export const ipc = {
  'open': (event, id, data) => ({type: OPEN_SUCCESS, id, data}),
  'proxyUrl': (event, id, proxyUrl) => ({type: URL_SUCCESS, id, proxyUrl})
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
function update(state, id, obj) {
  return {
    ...state,
    hash: {
      ...state.hash,
      [id]: obj
    }
  };
}

export function reducer(state = initialState, action = {}) {
  const {id} = action;
  const session = id && state.hash[id];
  switch (action.type) {
    case LOAD:
      return action.data.sessions.sequence()
        .fold({hash: {}, ids: []}, (acc, session) => {
          const {id} = session;
          acc.hash[id] = session;
          acc.ids.push(id);
          return acc;
        });
    case OPEN_REQUEST:
      // TODO: create a placeholder session
      var newId = nanoid(ALPHABET, 8);
      ipcr.send('session.open', {id: newId});
      return state;
    case OPEN_SUCCESS:
      return {
        ...update(state, id, {id}),
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
        return update(state, id, {
          ...session,
          url: url,
          proxyUrl: undefined
        });
      }
      ipcr.send('session.url', id, url.indexOf('://') < 0 ? ('http://' + url) : url);
      return update(state, id, {
        ...session,
        url: url
      });
    case URL_SUCCESS:
      return update(state, id, {
        ...session,
        proxyUrl: action.proxyUrl
      });
    case URL_FAILURE:
      // TODO
      return state;
    default:
      return state;
  }
}
