import {ipcRenderer as ipcr} from 'electron';
import nanoid from 'nanoid/generate';
import createDict from '../util/dict';
import { LOAD, SESSION } from './types';
const { OPEN, CLOSE, SET_URL, UI } = SESSION;

const ALPHABET = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';

// action //
export const action = {
  open: () => ({type: OPEN.REQUEST}),
  close: (id) => ({type: CLOSE, id}),
  setUrl: (id, url) => ({type: SET_URL.REQUEST, id, url}),
  ui: {
    setSection: (id, value) => ({type: UI.SET_SECTION, id, value})
  }
};

// ipc //
export const ipc = {
  'open': (event, id, data) => ({type: OPEN.SUCCESS, id, data}),
  'proxyUrl': (event, id, proxyUrl) => ({type: SET_URL.SUCCESS, id, proxyUrl})
};

// selector //
export const $ = createDict();

// initial state //
export const initialState = $({}).state;

// reducer //
export function reducer(state = initialState, action = {}) {
  const {id} = action;
  const dict = $(state);
  const session = id && dict.get(id);
  // const session = $session && $session.state;
  switch (action.type) {
    case LOAD:
      return $(action.data.sessions.map(session => ([session.id, session]))).state;
    case OPEN.REQUEST:
      // TODO: create a placeholder session
      var newId = nanoid(ALPHABET, 8);
      ipcr.send('session.open', {id: newId});
      return state;
    case OPEN.SUCCESS:
      return dict.upsert(id, action.data).state;
    case OPEN.FAILURE:
      // TODO
      return state;
    case CLOSE:
      ipcr.send('session.close', id);
      return dict.delete(id).state;
    case SET_URL.REQUEST:
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
    case SET_URL.SUCCESS:
      return dict.upsert(id, {
        ...session,
        proxyUrl: action.proxyUrl
      }).state;
    case SET_URL.FAILURE:
      // TODO
      return state;
    case UI.SET_SECTION:
      return dict.upsert(id, {
        ...session,
        ui: {
          ...session.ui,
          section: action.value
        }
      }).state;
    default:
      return state;
  }
}
