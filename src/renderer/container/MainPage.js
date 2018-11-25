import React from 'react';

import AppBar from './AppBar';
import Inventory from './Inventory';
import Body from './Body';

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
        <main style={{
          flexGrow: 1,
          minWidth: 0,
          display: 'flex',
          flexDirection: 'column',
        }}>
          <Body />
        </main>
      </div>
    </div>
  );
}

export default MainPage;
