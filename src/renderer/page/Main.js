import React from 'react';

import AppBar from '../container/AppBar';
import Inventory from '../container/Inventory';
import Body from '../container/Body';
import Confirm from '../container/Confirm';

function MainPage() {
  return (
    <div id="root">
      <AppBar id="app-bar" />
      <div className="hm">
        <Inventory id="inventory" />
        <Body id="body" />
      </div>
      <Confirm id="confirm" />
    </div>
  );
}

export default MainPage;
