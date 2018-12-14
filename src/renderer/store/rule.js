import { ipcRenderer as ipcr } from 'electron';
import uuid from 'uuid/v1';
import equal from 'fast-deep-equal';
import createDict from '../util/dict';
import { augment } from '../util/objects';

import { LOAD, RULE } from './types';
const { CREATE, UPDATE, SET_ACTIVE, SAVE, DELETE, UI } = RULE;

// action //
export const action = {
  create: () => ({type: CREATE}),
  update: (id, obj) => ({type: UPDATE, id, obj}),
  save: (id) => ({type: SAVE.REQUEST, id}),
  delete: (id) => ({type: DELETE.REQUEST, id}),
  ui: {
    setSection: (id, value) => ({type: UI.SET_SECTION, id, value})
  }
};

// ipc //
export const ipc = {
  'save.success': (event, id, updateTime) => ({type: SAVE.SUCCESS, id, updateTime}),
  'delete.success': (event, id) => ({type: DELETE.SUCCESS, id})
};

// selector //
function $r(rule) {
  return augment(rule, {
    get saved() {
      const {data, savedData} = this;
      return savedData !== undefined && equal(data, savedData);
    }
  });
}
export const $ = createDict({
  mapping: $r
});

// initial state //
export const initialState = $({}).state;

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
    saving: false,
    ui: {}
  };
}

export function reducer(state = initialState, action = {}) {
  const currentTime = Date.now();
  const {id} = action;
  const dict = $(state);
  const $rule = id && dict.get(id);
  const rule = $rule && $rule.state;
  switch (action.type) {
    case LOAD:
      return $(action.data.rules.map(rule => ([rule.id, {...rule, saving: false, savedData: rule.data}]))).state;
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
    case SET_ACTIVE:
      // TODO
      return state;
    case SAVE.REQUEST:
      var {type, data, active} = rule;
      ipcr.send('rule.save', currentTime, {id, type, data, active});
      return dict.upsert(id, {
        ...rule,
        updateTime: currentTime,
        savedData: data,
        saving: true
      }).state;
    case SAVE.SUCCESS:
      if (rule.updateTime === action.updateTime) {
        return dict.upsert(id, {
          ...rule,
          saving: false
        }).state;
      } else {
        return state;
      }
    case SAVE.FAILURE:
      // TODO
      return state;
    case DELETE.REQUEST:
      ipcr.send('rule.delete', id);
      return dict.delete(id).state;
    case DELETE.FAILURE:
      // TODO
      return state;
    case DELETE.SUCCESS:
      return state; // do nothing
    case UI.SET_SECTION:
      return dict.upsert(id, {
        ...rule,
        ui: {
          ...rule.ui,
          section: action.value
        }
      }).state;
    default:
      return state;
  }
}
