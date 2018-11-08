import {ipcRenderer as ipcr} from 'electron';
import uuid from 'uuid/v1';
import equal from 'fast-deep-equal';
import {type as rootType} from './root';
import createDict from '../util/dict';

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
      return $d(action.data.rules.map(rule => ({...rule, saving: false, savedData: rule.data}))).state;
    case CREATE:
      return dict.upsert(create(uuid(), currentTime)).state;
    case UPDATE:
      return dict.upsert({
        ...rule,
        data: {
          ...rule.data,
          ...action.obj
        },
        updateTime: currentTime
      }).state;
    case DELETE:
      return dict.delete(id).state;
    case SAVE_REQUEST:
      var {type, data, active} = rule;
      ipcr.send('rule.save', currentTime, {id, type, data, active});
      return dict.upsert({
        ...rule,
        updateTime: currentTime,
        savedData: data,
        saving: true
      }).state;
    case SAVE_SUCCESS:
      if (rule.updateTime === action.updateTime) {
        return dict.upsert({
          ...rule,
          saving: false
        }).state;
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
