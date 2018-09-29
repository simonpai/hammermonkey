import {ipcRenderer as ipcr} from 'electron';
import uuid from 'uuid/v1';

const CREATE = 'rule.create';
const UPDATE = 'rule.update';
const DELETE = 'rule.delete';

const SAVE_REQUEST = 'rule.save.request';
const SAVE_SUCCESS = 'rule.save.success';
const SAVE_FAILURE = 'rule.save.failure';

// action //
export const action = {
  create: () => ({type: CREATE}),
  update: (id, obj) => ({type: UPDATE, id, obj}),
  delete: (id) => ({type: DELETE, id}),
  save: (id, obj) => ({type: SAVE_REQUEST, id, obj}),
  // delete: (id) => ({type: DELETE_REQUEST, id})
};

// ipc //
export const ipc = {
  'rule.sync.success': (event, id, vid) => ({type: SAVE_SUCCESS, id, vid}),
  // 'rule.delete': (event, sessionId, url) => ({type: URL_SUCCESS, sessionId, url})
};

// initial state //
export const initialState = {
  pool: {},
  list: []
};

// reducer //
export function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case CREATE:
      var id = uuid();
      return {
        ...state,
        pool: {
          ...state.pool,
          [id]: {
            pendingSaves: 0,
            svid: undefined,
            vid: uuid()
          }
        },
        list: [id].concat(state.list)
      };
    case UPDATE:
      return {
        ...state,
        pool: {
          ...state.pool,
          [action.id]: {
            ...action.obj,
            svid: state.pool[action.id].svid,
            vid: uuid()
          }
        }
      };
    case DELETE:
      var { [action.id]: deleted, ...restPool } = state.pool; // eslint-disable-line no-unused-vars
      // TODO: send to main process
      return {
        ...state,
        pool: restPool,
        list: state.list.filter(id => id === action.id)
      };
    case SAVE_REQUEST:
      ipcr.send('rule.sync', action.id, action.obj);
      return {
        ...state,
        pool: {
          ...state.pool,
          [action.id]: {
            ...state.pool[action.id],
            pendingSaves: state.pool[action.id].pendingSaves + 1
          }
        }
      };
    case SAVE_SUCCESS:
      if (state.pool[action.id].vid === action.svid) {
        return {
          ...state,
          pool: {
            ...state.pool,
            [action.id]: {
              ...state.pool[action.id],
              pendingSaves: state.pool[action.id].pendingSaves - 1,
              svid: action.vid
            }
          }
        };
      } else {
        return state;
      }
    case SAVE_FAILURE:
      // TODO
      return state;
    default:
      return state;
  }
}
