import { combineReducers } from 'redux';
// import createIpc, { send } from 'redux-electron-ipc';
// import persistState from 'redux-localstorage';
// import thunk from 'redux-thunk';
import * as ui from './ui';
import * as session from './session';

// action //
export const action = {
  ui: ui.action,
  session: session.action
};

// ipc //
export const ipc = Object.assign({}, session.ipc);

// initial state //
export const initialState = {
  ui: ui.initialState,
  session: session.initialState
};

// reducer //
export const reducer = combineReducers({
  ui: ui.reducer,
  session: session.reducer
});
