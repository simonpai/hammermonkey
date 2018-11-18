import {ipcRenderer as ipcr} from 'electron';
import nanoid from 'nanoid/generate';
import {type as rootType} from './root';
import createDict from '../util/dict';

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
const $d = createDict();
export const initialState = $d({}).state;

// selector //
export const selector = {
  $d: $d
};

// reducer //
export function reducer(state = initialState, action = {}) {
  const {id} = action;
  const dict = $d(state);
  const session = id && dict.get(id);
  switch (action.type) {
    case LOAD:
      return $d(action.data.sessions.map(session => ([session.id, session]))).state;
    case OPEN_REQUEST:
      // TODO: create a placeholder session
      var newId = nanoid(ALPHABET, 8);
      ipcr.send('session.open', {id: newId});
      return state;
    case OPEN_SUCCESS:
      return dict.upsert(id, action.data).state;
    case OPEN_FAILURE:
      // TODO
      return state;
    case URL_REQUEST:
      // TODO: rename: shall be update
      var url = action.url.trim();
      if (!url) {
        return dict.upsert(id, {
          ...session,
          url: url,
          proxyUrl: undefined
        }).state;
      }
      // TODO: should this be handled at main side?
      ipcr.send('session.url', id, url.indexOf('://') < 0 ? ('http://' + url) : url);
      return dict.upsert(id, {
        ...session,
        url: url
      }).state;
    case URL_SUCCESS:
      return dict.upsert(id, {
        ...session,
        proxyUrl: action.proxyUrl
      }).state;
    case URL_FAILURE:
      // TODO
      return state;
    default:
      return state;
  }
}
