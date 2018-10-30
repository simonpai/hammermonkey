// import persistState from 'redux-localstorage';
import { duck } from './util';
import * as ui from './ui';
import * as session from './session';
import * as rule from './rule';
import * as console from './console';
import * as root from './root';

const store = duck({ui, session, rule, console}, root);

export const action = store.action;
export const selector = store.selector;
export const ipc = store.ipc;
export const initialState = store.initialState;
export const reducer = store.reducer;
