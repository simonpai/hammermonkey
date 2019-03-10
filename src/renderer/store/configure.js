import { createStore, applyMiddleware, compose } from 'redux';
import createIpc from 'redux-electron-ipc';

import * as store from './index';

export default function configure() {

  const middlewares = [
    createIpc(store.ipc)/*, thunk*/
  ];

  const composeEnhancers = (() => {
    const compose_ = window && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
    if (process.env.NODE_ENV === 'development' && compose_) {
      return compose_({
        actionCreators: store.action
      });
    }
    return compose;
  })();

  const enhancer = composeEnhancers(applyMiddleware(...middlewares));

  return createStore(store.reducer, store.initialState, enhancer);
}
