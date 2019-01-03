import { ipcRenderer as ipcr } from 'electron';
import uuid from 'uuid/v1';
import equal from 'fast-deep-equal';
import createDict from '../util/dict';
import { augment } from '../util/objects';

import { RTM, MTR } from '../../shared/model/ipc';
import { LOAD, RULE } from './types';
const { CREATE, UPDATE, SET_ACTIVE, COMMIT, DELETE, UI } = RULE;

// action //
export const action = {
  create: () => ({type: CREATE}),
  update: (id, obj) => ({type: UPDATE, id, obj}),
  commit: (id) => ({type: COMMIT.REQUEST, id}),
  delete: (id) => ({type: DELETE.REQUEST, id}),
  setActive: (id, value) => ({type: SET_ACTIVE, id, value}),
  ui: {
    setSection: (id, value) => ({type: UI.SET_SECTION, id, value})
  }
};

// ipc //
export const ipc = {
  [MTR.RULE.COMMIT.SUCCESS]: (event, id, updateTime) => ({type: COMMIT.SUCCESS, id, updateTime}),
  [MTR.RULE.DELETE.SUCCESS]: (event, id) => ({type: DELETE.SUCCESS, id})
};

// selector //
function $r(rule) {
  return augment(rule, {
    get committed() {
      const {data, committedData} = this;
      return committedData !== undefined && equal(data, committedData);
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
    committing: false,
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
      return $(action.data.rules.map(rule => ([rule.id, {...rule, committing: false, committedData: rule.data}]))).state;
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
      ipcr.send(RTM.RULE.ACTIVE, id, action.value);
      return dict.upsert(id, {
        ...rule,
        active: action.value
      }).state;
    case COMMIT.REQUEST:
      var {type, data, active} = rule;
      ipcr.send(RTM.RULE.COMMIT, currentTime, {id, type, data, active});
      return dict.upsert(id, {
        ...rule,
        updateTime: currentTime,
        committedData: data,
        committing: true
      }).state;
    case COMMIT.SUCCESS:
      if (rule.updateTime === action.updateTime) {
        return dict.upsert(id, {
          ...rule,
          committing: false
        }).state;
      } else {
        return state;
      }
    case COMMIT.FAILURE:
      // TODO
      return state;
    case DELETE.REQUEST:
      if (rule.committedData) {
        ipcr.send(RTM.RULE.DELETE, id);
      }
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
