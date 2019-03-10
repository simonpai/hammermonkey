import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { Tab, Button } from 'semantic-ui-react';
import Icon from '@mdi/react';
import { mdiDelete } from '@mdi/js';

// import SettingsSection from '../component/session/Settings';
import UrlSection from '../component/session/Url';
import ConsoleSection from '../component/session/Console';

import { useConfirm, useApi } from '../hook';

/* eslint-disable react/display-name */
function sections({session, console, api}) {
  const id = session.id;
  const onUrlChange = useCallback(url => api.session.setUrl(session, url), [session]);
  const onEval = useCallback(value => api.console.eval(id, value), [id]);
  return [
    {
      name: 'url',
      label: 'URL',
      render: () => <UrlSection onUrlChange={onUrlChange} {...{session}} />
    },
    /*
    {
      name: 'settings',
      label: 'Settings',
      render: () => <SettingsSection {...{session}} />
    },
    */
    {
      name: 'console',
      label: 'Console',
      render: () => <ConsoleSection onEval={onEval} {...{console}} />
    }
  ];
}
/* eslint-enable react/display-name */

function SessionPanel({session, console}) {
  const [section, setSection] = useState('url');
  const id = session.id;
  const api = useApi();
  const confirm = useConfirm();
  const close = useCallback(() => confirm(() => api.session.close(id)), [id]);
  return (
    <Tab.View
      value={section}
      sections={sections({session, console, api})}
      onSelect={setSection}
    >
      <Tab.View.Toolbar>
        <Button.Ripple
          icon
          onClick={close}
        >
          <Icon path={mdiDelete} color="#666" />
        </Button.Ripple>
      </Tab.View.Toolbar>
    </Tab.View>
  );
}

SessionPanel.propTypes = {
  session: PropTypes.object.isRequired,
  console: PropTypes.arrayOf(
    PropTypes.shape({
    }).isRequired
  )
};

export default SessionPanel;
