import { connect as _connect } from 'react-redux';

import { duck, api as _api } from '../util/stores';
import * as session from './session';
import * as rule from './rule';
import * as console from './console';
import * as root from './root';

const store = duck({session, rule, console}, root);

export const action = store.action;
export const ipc = store.ipc;
export const $ = store.$;
export const initialState = store.initialState;
export const reducer = store.reducer;

export function api(dispatch) {
  return _api(action, dispatch);
}

export function connect(mapStateToProps) {
  return _connect(mapStateToProps, () => ({}));
}
