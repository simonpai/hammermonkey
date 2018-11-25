import React from 'react';

import Header from './Header';
import SideBar from './SideBar';
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
      <Header />
      <div style={{
        display: 'flex',
        flexGrow: 1
      }}>
        <SideBar />
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
