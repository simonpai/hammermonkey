import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { HotKeys } from 'react-hotkeys';
import { Tab, Button, Input } from 'semantic-ui-react';
import Icon from '@mdi/react';
import { mdiFloppy, mdiDelete } from '@mdi/js';

import { useConfirm, useApi } from '../../hook';
import UserscriptTabs from './userscript/Tabs';

const keyMap = {
  save: ['command+s', 'ctrl+s']
};

function RulePanel({rule}) {
  const api = useApi();
  const {id, data, committing, committed} = rule;
  const confirm = useConfirm();
  const commit = useCallback(() => api.rule.commit(id), [id]);
  const delete_ = useCallback(() => confirm(() => api.rule.delete(id)), [id]);
  const onNameChange = useCallback(event => api.rule.update(id, {name: event.target.value}), [id]);
  const RuleTabs = UserscriptTabs;

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
        save: commit
      }}
    >
      <div className="hm rule name">
        <Input
          placeholder="(untitled)"
          defaultValue={data.name || ''}
          onInput={onNameChange}
        />
      </div>
      <Tab.View>
        {
          RuleTabs({rule}).props.children
        }
        <Tab.View.Toolbar>
          <Button.Ripple
            icon
            disabled={committed || committing}
            onClick={commit}
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
  )
}

RulePanel.propTypes = {
  rule: PropTypes.object.isRequired
};

export default RulePanel;
