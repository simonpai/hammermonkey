import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { Tab, Button } from 'semantic-ui-react';
import Icon from '@mdi/react';
import { mdiDelete } from '@mdi/js';

// import SettingsSection from '../component/session/Settings';
import UrlSection from '../component/session/Url';
import ConsoleSection from '../component/session/Console';

import { useConfirm, useApi } from '../hook';

function SessionPanel({session, console}) {
  const id = session.id;
  const api = useApi();
  const confirm = useConfirm();
  const close = useCallback(() => confirm(() => api.session.close(id)), [id]);
  const onUrlChange = useCallback(url => api.session.setUrl(session, url), [session]);
  const onEval = useCallback(value => api.console.eval(id, value), [id]);
  return (
    <Tab.View>
      <Tab.View.Tab value="url" label="URL" default>
        <UrlSection onUrlChange={onUrlChange} {...{session}} />
      </Tab.View.Tab>
      {/*
      <Tab.View.Tab value="settings" label="Settings" default>
        <SettingsSection {...{session}} />
      </Tab.View.Tab>
      */}
      <Tab.View.Tab value="console" label="Console">
        <ConsoleSection onEval={onEval} {...{console}} />
      </Tab.View.Tab>
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
