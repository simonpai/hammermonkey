import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';

import '../polyfill';
import './semantic/shim';

import withTheme from './theme';
import routes from './routes';
import configureStore from './store/configure';

/*
const syncHistoryWithStore = (store, history) => {
  const { routing } = store.getState();
  if (routing && routing.location) {
    history.replace(routing.location);
  }
};
*/

const history = createHistory({
  basename: window.location.pathname
});

const store = configureStore(history);

const rootElement = document.querySelector(document.currentScript.getAttribute('data-container'));

ReactDOM.render(
  withTheme(
    <Provider store={store}>
      <ConnectedRouter history={history}>{routes}</ConnectedRouter>
    </Provider>
  ),
  rootElement
);
