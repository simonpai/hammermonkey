import React from 'react';
import { Confirm } from 'semantic-ui-react';
import { usePersistentState } from '../hook';

import AppBar from '../container/AppBar';
import Inventory from '../container/Inventory';
import Body from '../container/Body';

function MainPage() {
  const [subject, setSubject] = usePersistentState('subject', {initialValue: []});
  return (
    <div id="root">
      <Confirm.Provider id="confirm">
        <AppBar id="app-bar" />
        <div className="hm">
          <Inventory id="inventory" subject={subject} setSubject={setSubject} />
          <Body id="body" subject={subject} />
        </div>
      </Confirm.Provider>
    </div>
  );
}

export default MainPage;
