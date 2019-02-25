import { ipcRenderer as ipcr } from 'electron';
import nanoid from 'nanoid/generate';
import createDict from '../util/dict';

import { RTM, MTR } from '../../shared/model/ipc';
import { LOAD, SESSION } from './types';
const { OPEN, CLOSE, SET_URL } = SESSION;

const ALPHABET = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';

// action //
export const action = {
  open: () => ({type: OPEN.REQUEST}),
  close: (id) => ({type: CLOSE, id}),
  setUrl: (id, url) => ({type: SET_URL.REQUEST, id, url})
};

// ipc //
export const ipc = {
  [MTR.SESSION.OPEN]: (event, id, data) => ({type: OPEN.SUCCESS, id, data}),
  [MTR.SESSION.PROXY_URL]: (event, id, proxyUrl) => ({type: SET_URL.SUCCESS, id, proxyUrl})
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
  switch (action.type) {
    case LOAD:
      return $(action.data.sessions.map(session => ([session.id, session]))).state;
    case OPEN.REQUEST:
      // TODO: create a placeholder session
      var newId = nanoid(ALPHABET, 8);
      ipcr.send(RTM.SESSION.OPEN, {id: newId});
      return state;
    case OPEN.SUCCESS:
      return dict.upsert(id, action.data).state;
    case OPEN.FAILURE:
      // TODO
      return state;
    case CLOSE:
      ipcr.send(RTM.SESSION.CLOSE, id);
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
      ipcr.send(RTM.SESSION.URL, id, url.indexOf('://') < 0 ? ('http://' + url) : url);
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
    default:
      return state;
  }
}
