import React, { useCallback } from 'react';
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

function UserscriptPanel({rule, api}) {
  const {id, committing, committed} = rule;
  const confirm = useConfirm();
  const delete_ = useCallback(() => confirm(() => api.rule.delete(id)), [id]);
  const onContentChange = useCallback(content => api.rule.update(id, {content}), [id]);
  const onNameChange = useCallback(name => api.rule.update(id, {name}), [id]);
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
      <Tab.View>
        <Tab.View.Tab value="editor" label="Editor" default>
          <EditorSection {...{rule, onContentChange}} />
        </Tab.View.Tab>
        <Tab.View.Tab value="settings" label="Settings">
          <SettingsSection {...{rule, onNameChange}} />
        </Tab.View.Tab>
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
