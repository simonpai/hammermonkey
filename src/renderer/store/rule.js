import {ipcRenderer as ipcr} from 'electron';
import uuid from 'uuid/v1';
import equal from 'fast-deep-equal';
import {type as rootType} from './root';

const {LOAD} = rootType;

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
  'save.success': (event, id, updateTime) => ({type: SAVE_SUCCESS, id, updateTime}),
  // 'delete': (event, sessionId, url) => ({type: URL_SUCCESS, sessionId, url})
};

// initial state //
export const initialState = {
  hash: {},
  ids: []
};

// selector //
export const selector = {
  list: ({ids, hash}) => ids.map(id => hash[id]),
  isSaved: ({data, savedData}) => savedData !== undefined && equal(data, savedData)
};

// reducer //
function create(id, currentTime) {
  return {
    id,
    data: {
      name: '',
      content: ''
    },
    type: 'userscript',
    active: true,
    updateTime: currentTime,
    saving: false
  };
}

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
  const currentTime = Date.now();
  const {id} = action;
  const rule = id && state.hash[id];
  switch (action.type) {
    case LOAD:
      return action.data.rules.sequence()
        .fold({hash: {}, ids: []}, (acc, rule) => {
          const {id, data} = rule;
          acc.hash[id] = {...rule, saving: false, savedData: data};
          acc.ids.push(id);
          return acc;
        });
    case CREATE:
      var newId = uuid();
      return {
        ...update(state, newId, create(newId, currentTime)),
        ids: [newId].concat(state.ids)
      };
    case UPDATE:
      return update(state, id, {
        ...rule,
        data: {
          ...rule.data,
          ...action.obj
        },
        updateTime: currentTime
      });
    case DELETE:
      var {[id]: deleted, ...restHash} = state.hash; // eslint-disable-line no-unused-vars
      // TODO: send to main process
      return {
        ...state,
        hash: restHash,
        ids: state.ids.filter(id => id !== action.id)
      };
    case SAVE_REQUEST:
      var {type, data, active} = rule;
      ipcr.send('rule.save', currentTime, {id, type, data, active});
      return update(state, id, {
        ...rule,
        updateTime: currentTime,
        savedData: data,
        saving: true
      });
    case SAVE_SUCCESS:
      if (rule.updateTime === action.updateTime) {
        return update(state, id, {
          ...rule,
          saving: false
        });
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
