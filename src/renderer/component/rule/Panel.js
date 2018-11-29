// import { clipboard } from 'electron';
import React from 'react';
import PropTypes from 'prop-types';
import { HotKeys } from 'react-hotkeys';
import { Input, Button, Icon, Form, TextArea } from 'semantic-ui-react';
import { withStyles } from '@material-ui/core/styles';

import { selector } from '../../store/rule';

const styles = theme => ({
  root: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column'
  },
  paper: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    height: '100%',
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
    borderRadius: 0
  },
  button: {
    margin: '0 0 0 10px !important',
    width: 40,
    height: 40
  }
});

const keyMap = {
  save: ['command+s', 'ctrl+s']
};

function RulePanel({onNameChange, onContentChange, onSave, onDelete, classes, ...rule}) {
  const {id, data, saving} = rule;
  const saved = selector.isSaved(rule);
  return (
    <HotKeys className={classes.root} keyMap={keyMap} style={{outline: 0}} handlers={{
      save: () => onSave(id)
    }}>
      <div className={classes.paper}>
        <div>
          <div style={{float: 'right'}}>
            <Button
              icon
              color="teal"
              disabled={saved || saving}
              onClick={() => onSave(id)}
              className={classes.button}
            >
              <Icon name="save" />
            </Button>
            <Button
              icon
              onClick={() => onDelete(id)}
              className={classes.button}
            >
              <Icon name="trash" />
            </Button>
          </div>
          <div style={{overflow: 'hidden'}}>
            <Input
              placeholder="Name"
              style={{width: '100%', height: 40}}
              value={data.name || ''}
              onChange={event => onNameChange(id, event.target.value)}
            />
          </div>
        </div>
        <Form style={{display: 'flex', flexGrow: 1, marginTop: 10}}>
          <TextArea
            placeholder="console.log('Hello world.')"
            style={{flexGrow: 1, resize: 'none', fontFamily: '"Roboto Mono", monospace', lineHeight: '1.5em'}}
            value={data.content || ''}
            onChange={event => onContentChange(id, event.target.value)}
          />
        </Form>
      </div>
    </HotKeys>
  )
}

RulePanel.propTypes = {
  id: PropTypes.string.isRequired,
  data: PropTypes.object,
  onNameChange: PropTypes.func.isRequired,
  onContentChange: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  onDelete:PropTypes.func.isRequired,
  classes: PropTypes.object
};

export default withStyles(styles)(RulePanel);
