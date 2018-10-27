// import persistState from 'redux-localstorage';
import { duck } from './util';
import * as ui from './ui';
import * as session from './session';
import * as rule from './rule';

const store = duck({ui, session, rule});

export const action = store.action;
export const selector = store.selector;
export const ipc = store.ipc;
export const initialState = store.initialState;
export const reducer = store.reducer;
