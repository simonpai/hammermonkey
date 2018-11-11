import {ipcRenderer as ipcr} from 'electron';
import uuid from 'uuid/v1';
import equal from 'fast-deep-equal';
import {type as rootType} from './root';
import createDict from '../util/dict';

const {LOAD} = rootType;

const CREATE = 'rule.create';
const UPDATE = 'rule.update';

const SAVE_REQUEST = 'rule.save.request';
const SAVE_SUCCESS = 'rule.save.success';
const SAVE_FAILURE = 'rule.save.failure';

const DELETE_REQUEST = 'rule.delete.request';
const DELETE_SUCCESS = 'rule.delete.success';
const DELETE_FAILURE = 'rule.delete.failure';

// action //
export const action = {
  create: () => ({type: CREATE}),
  update: (id, obj) => ({type: UPDATE, id, obj}),
  save: (id) => ({type: SAVE_REQUEST, id}),
  delete: (id) => ({type: DELETE_REQUEST, id})
};

// ipc //
export const ipc = {
  'save.success': (event, id, updateTime) => ({type: SAVE_SUCCESS, id, updateTime}),
  'delete.success': (event, id) => ({type: DELETE_SUCCESS, id})
};

// initial state //
const $d = createDict();
export const initialState = $d({}).state;

// selector //
export const selector = {
  $d: $d,
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

export function reducer(state = initialState, action = {}) {
  const currentTime = Date.now();
  const {id} = action;
  const dict = $d(state);
  const rule = id && dict.get(id);
  switch (action.type) {
    case LOAD:
      return $d(action.data.rules.map(rule => ([rule.id, {...rule, saving: false, savedData: rule.data}]))).state;
    case CREATE:
      var newId = uuid();
      return dict.upsert(newId, create(newId, currentTime), 0).state;
    case UPDATE:
      return dict.upsert(id, {
        ...rule,
        data: {
          ...rule.data,
          ...action.obj
        },
        updateTime: currentTime
      }).state;
    case SAVE_REQUEST:
      var {type, data, active} = rule;
      ipcr.send('rule.save', currentTime, {id, type, data, active});
      return dict.upsert(id, {
        ...rule,
        updateTime: currentTime,
        savedData: data,
        saving: true
      }).state;
    case SAVE_SUCCESS:
      if (rule.updateTime === action.updateTime) {
        return dict.upsert(id, {
          ...rule,
          saving: false
        }).state;
      } else {
        return state;
      }
    case SAVE_FAILURE:
      // TODO
      return state;
    case DELETE_REQUEST:
      ipcr.send('rule.delete', id);
      return dict.delete(id).state;
    case DELETE_FAILURE:
      // TODO
      return state;
    case DELETE_SUCCESS: // do nothing
    default:
      return state;
  }
}
