import { combineReducers } from 'redux';
// import createIpc, { send } from 'redux-electron-ipc';
// import persistState from 'redux-localstorage';
// import thunk from 'redux-thunk';
import * as session from './session';

// action //
export const action = {
  session: session.action
};

// ipc //
export const ipc = Object.assign({}, session.ipc);

// initial state //
export const initialState = {
  session: session.initialState
};

// reducer //
export const reducer = combineReducers({
  session: session.reducer
});
