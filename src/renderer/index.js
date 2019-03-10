import React from 'react';
import ReactDOM from 'react-dom';

import '../shared/polyfill';
import './semantic/shim';

import configureStore from './store/configure';
import { action } from './store';
import ApiProvider from './component/common/ApiProvider';
import MainPage from './page/Main';

const store = configureStore();

const rootElement = document.querySelector(document.currentScript.getAttribute('data-container'));

ReactDOM.render(
  <ApiProvider store={store} action={action}>
    <MainPage />
  </ApiProvider>,
  rootElement
);
