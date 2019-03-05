import React from 'react';
import { usePersistentState } from '../hook';

import AppBar from '../container/AppBar';
import Inventory from '../container/Inventory';
import Body from '../container/Body';
import Confirm from '../container/Confirm';

function MainPage() {
  const [subject, setSubject] = usePersistentState('subject', {initialValue: []});
  return (
    <div id="root">
      <AppBar id="app-bar" />
      <div className="hm">
        <Inventory id="inventory" subject={subject} onSetSubject={setSubject} />
        <Body id="body" subject={subject} />
      </div>
      <Confirm id="confirm" />
    </div>
  );
}

export default MainPage;
