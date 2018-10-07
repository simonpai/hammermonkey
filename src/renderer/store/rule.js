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
  save: (id) => ({type: SAVE_REQUEST, id}),
  // delete: (id) => ({type: DELETE_REQUEST, id})
};

// ipc //
export const ipc = {
  'rule.save.success': (event, id, updateTime) => ({type: SAVE_SUCCESS, id, updateTime}),
  // 'rule.delete': (event, sessionId, url) => ({type: URL_SUCCESS, sessionId, url})
};

// initial state //
export const initialState = {
  hash: {},
  ids: []
};

// helpers //
export const helpers = {
  list: rule => rule.ids.map(id => rule.hash[id])
};

// reducer //
function _createRule(id, currentTime) {
  return {
    id,
    name: '',
    type: 'userscript',
    content: '',
    active: true,
    updateTime: currentTime,
    saving: false
  };
}

export function reducer(state = initialState, action = {}) {
  const currentTime = Date.now();
  const rule = action.id && state.hash[action.id];
  switch (action.type) {
    case CREATE:
      var id = uuid();
      return {
        ...state,
        hash: {
          ...state.hash,
          [id]: _createRule(id, currentTime)
        },
        ids: [id].concat(state.ids)
      };
    case UPDATE:
      return {
        ...state,
        hash: {
          ...state.hash,
          [action.id]: {
            ...rule,
            ...action.obj,
            updateTime: currentTime
          }
        }
      };
    case DELETE:
      var { [action.id]: deleted, ...resthash } = state.hash; // eslint-disable-line no-unused-vars
      // TODO: send to main process
      return {
        ...state,
        hash: resthash,
        ids: state.ids.filter(id => id !== action.id)
      };
    case SAVE_REQUEST:
      ipcr.send('rule.save', action.id, currentTime, rule);
      return {
        ...state,
        hash: {
          ...state.hash,
          [action.id]: {
            ...rule,
            updateTime: currentTime,
            savedObj: {
              name: rule.name,
              content: rule.content
            },
            saving: true
          }
        }
      };
    case SAVE_SUCCESS:
      if (rule.updateTime === action.updateTime) {
        return {
          ...state,
          hash: {
            ...state.hash,
            [action.id]: {
              ...rule,
              saving: false
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
