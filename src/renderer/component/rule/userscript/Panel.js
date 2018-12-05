import React from 'react';
import PropTypes from 'prop-types';
import { HotKeys } from 'react-hotkeys';
import { Tab, Button } from 'semantic-ui-react';
import Icon from '@mdi/react';
import { mdiFloppy, mdiDelete } from '@mdi/js';

import { selector } from '../../../store/rule';
import SettingsSection from './Settings';
import EditorSection from './Editor';

const keyMap = {
  save: ['command+s', 'ctrl+s']
};

/* eslint-disable react/display-name */
function sections({id, rule, actions}) {
  const onContentChange = value => actions.rule.onContentChange(id, value);
  const onNameChange = value => actions.rule.onNameChange(id, value);
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

function UserscriptPanel({ui = {}, rule, actions}) {
  const {section = 'editor'} = ui;
  const {id, saving} = rule;
  const saved = selector.isSaved(rule);
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
        save: () => actions.rule.onSave(id)
      }}
    >
      <Tab.View
        value={section}
        sections={sections({id, rule, actions})}
        onSelect={value => actions.ui.onSelect(id, value)}
      >
        <Tab.View.Toolbar>
          <Button.Ripple
            icon
            disabled={saved || saving}
            onClick={() => actions.rule.onSave(id)}
          >
            <Icon path={mdiFloppy} color="teal" />
          </Button.Ripple>
          <Button.Ripple
            icon
            onClick={() => actions.rule.onDelete(id)}
          >
            <Icon path={mdiDelete} color="#666" />
          </Button.Ripple>
        </Tab.View.Toolbar>
      </Tab.View>
    </HotKeys>
  );
}

UserscriptPanel.propTypes = {
  ui: PropTypes.object,
  rule: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired
};

export default UserscriptPanel;
