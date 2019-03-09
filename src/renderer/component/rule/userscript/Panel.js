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
function sections({id, rule, action}) {
  const onContentChange = value => action.rule.updateContent(id, value);
  const onNameChange = value => action.rule.updateName(id, value);
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

function UserscriptPanel({rule, action}) {
  const {id, committing, committed} = rule;
  const [section, setSection] = useState('editor');
  const confirm = useConfirm();
  const delete_ = useCallback(() => confirm(() => action.rule.delete(id)), [id]);
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
        save: () => action.rule.commit(id)
      }}
    >
      <Tab.View
        value={section}
        sections={sections({id, rule, action})}
        onSelect={setSection}
      >
        <Tab.View.Toolbar>
          <Button.Ripple
            icon
            disabled={committed || committing}
            onClick={() => action.rule.commit(id)}
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
  action: PropTypes.object.isRequired
};

export default UserscriptPanel;
