import { combineReducers } from 'redux';
// import persistState from 'redux-localstorage';
import * as ui from './ui';
import * as session from './session';
import * as rule from './rule';

// action //
export const action = {
  ui: ui.action,
  session: session.action,
  rule: rule.action
};

// ipc //
export const ipc = Object.assign({}, session.ipc, rule.ipc);

// initial state //
export const initialState = {
  ui: ui.initialState,
  session: session.initialState,
  rule: rule.initialState
};

// helpers //
export const helpers = {
  rule: rule.helpers
};

// reducer //
export const reducer = combineReducers({
  ui: ui.reducer,
  session: session.reducer,
  rule: rule.reducer
});
