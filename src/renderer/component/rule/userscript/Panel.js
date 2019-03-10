import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { HotKeys } from 'react-hotkeys';
import { Tab, Button } from 'semantic-ui-react';
import Icon from '@mdi/react';
import { mdiFloppy, mdiDelete } from '@mdi/js';

import { useConfirm } from '../../../hook';
import SettingsSection from './Settings';
import EditorSection from './Editor';

const keyMap = {
  save: ['command+s', 'ctrl+s']
};

/* eslint-disable react/display-name */
function sections({id, rule, api}) {
  const onContentChange = content => api.rule.update(id, {content});
  const onNameChange = name => api.rule.update(id, {name});
  return [
    {
      name: 'editor',
      label: 'Editor',
      render: () => <EditorSection {...{rule, onContentChange}} />
    },
    {
      name: 'settings',
      label: 'Settings',
      render: () => <SettingsSection {...{rule, onNameChange}} />
    }
  ];
}
/* eslint-enable react/display-name */

function UserscriptPanel({rule, api}) {
  const {id, committing, committed} = rule;
  const [section, setSection] = useState('editor');
  const confirm = useConfirm();
  const delete_ = useCallback(() => confirm(() => api.rule.delete(id)), [id]);
  return (
    <HotKeys
      keyMap={keyMap}
      style={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        outline: 0
      }}
      handlers={{
        save: () => api.rule.commit(id)
      }}
    >
      <Tab.View
        value={section}
        sections={sections({id, rule, api})}
        onSelect={setSection}
      >
        <Tab.View.Toolbar>
          <Button.Ripple
            icon
            disabled={committed || committing}
            onClick={() => api.rule.commit(id)}
          >
            <Icon path={mdiFloppy} color="teal" />
          </Button.Ripple>
          <Button.Ripple
            icon
            onClick={delete_}
          >
            <Icon path={mdiDelete} color="#666" />
          </Button.Ripple>
        </Tab.View.Toolbar>
      </Tab.View>
    </HotKeys>
  );
}

UserscriptPanel.propTypes = {
  rule: PropTypes.object.isRequired,
  api: PropTypes.object.isRequired
};

export default UserscriptPanel;
