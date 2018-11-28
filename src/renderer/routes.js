import React from 'react';
import { Switch, Route } from 'react-router';

import MainPage from './page/Main';

export default (
  <Switch>
    <Route exact path="/" component={MainPage} />
  </Switch>
);
