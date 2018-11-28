import React from 'react';

import AppBar from '../container/AppBar';
import Inventory from '../container/Inventory';
import Body from '../container/Body';

function MainPage() {
  return (
    <div style={{
      height: '100%',
      overflow: 'hidden',
      position: 'relative',
      display: 'flex',
      flexDirection: 'column'
    }}>
      <AppBar />
      <div style={{
        display: 'flex',
        flexGrow: 1
      }}>
        <Inventory />
        <Body />
      </div>
    </div>
  );
}

export default MainPage;
