import { combineReducers } from 'redux';
// import persistState from 'redux-localstorage';
import { flock } from './util';
import * as ui from './ui';
import * as session from './session';
import * as rule from './rule';

// action //
export const action = flock('action', {ui, session, rule});

// ipc //
export const ipc = Object.assign({}, session.ipc, rule.ipc);

// initial state //
export const initialState = flock('initialState', {ui, session, rule});

// selector //
export const selector = flock('selector', {session, rule});

// reducer //
export const reducer = combineReducers(flock('reducer', {ui, session, rule}));
