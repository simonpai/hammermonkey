import { createStore, applyMiddleware, compose } from 'redux';
// import { routerMiddleware } from 'react-router-redux';
import createIpc from 'redux-electron-ipc';
// import persistState from 'redux-localstorage';
import * as store from './index';

export default function configure() {
  // const router = routerMiddleware(routerHistory);

  const middlewares = [
    // routerMiddleware(history),
    createIpc(store.ipc)/*, thunk, router*/
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

  const enhancer = composeEnhancers(applyMiddleware(...middlewares)/*, persistState()*/);

  return createStore(store.reducer, store.initialState, enhancer);
}
