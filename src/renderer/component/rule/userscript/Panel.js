import React from 'react';
import PropTypes from 'prop-types';
import { HotKeys } from 'react-hotkeys';
import { Button, Form, TextArea } from 'semantic-ui-react';
import Icon from '@mdi/react';
import { mdiFloppy, mdiDelete } from '@mdi/js';

import { selector } from '../../../store/rule';

const keyMap = {
  save: ['command+s', 'ctrl+s']
};

const buttonStyle = {
  margin: '0 0 0 10px !important',
  width: 40,
  height: 40
};

function UserscriptPanel({actions, rule}) {
  const {id, data, saving} = rule;
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
      <div style={{
        padding: 20,
        height: '100%',
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
        borderRadius: 0,
        backgroundColor: 'white'
      }}>
        <div>
          <div style={{float: 'right'}}>
            <Button.Ripple
              icon
              color="teal"
              style={buttonStyle}
              disabled={saved || saving}
              onClick={() => actions.rule.onSave(id)}
            >
              <Icon path={mdiFloppy} color="white" />
            </Button.Ripple>
            <Button.Ripple
              icon
              style={buttonStyle}
              onClick={() => actions.rule.onDelete(id)}
            >
              <Icon path={mdiDelete} color="#666" />
            </Button.Ripple>
          </div>
          <div style={{overflow: 'hidden'}}>
            <Form>
              <Form.Input.Light
                fluid
                label="Title"
                value={data.name || ''}
                onChange={event => actions.rule.onNameChange(id, event.target.value)}
              />
            </Form>
          </div>
        </div>
        <Form style={{display: 'flex', flexGrow: 1, marginTop: 10}}>
          <TextArea
            placeholder="console.log('Hello world.')"
            style={{flexGrow: 1, resize: 'none', fontFamily: '"Roboto Mono", monospace', lineHeight: '1.5em'}}
            value={data.content || ''}
            onChange={event => actions.rule.onContentChange(id, event.target.value)}
          />
        </Form>
      </div>
    </HotKeys>
  )
}

UserscriptPanel.propTypes = {
  rule: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired
};

export default UserscriptPanel;
