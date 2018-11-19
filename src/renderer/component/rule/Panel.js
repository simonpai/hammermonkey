// import { clipboard } from 'electron';
import React from 'react';
import PropTypes from 'prop-types';
import { HotKeys } from 'react-hotkeys';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
// import Typography from '@material-ui/core/Typography';
import Floppy from 'mdi-material-ui/Floppy';
import Delete from 'mdi-material-ui/Delete';
// import ContentCopy from 'mdi-material-ui/ContentCopy';

import { selector } from '../../store/rule';

const styles = theme => ({
  paper: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    height: '100%',
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column'
  },
  button: {
    marginLeft: 10,
    minWidth: 'auto',
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
    <HotKeys keyMap={keyMap} handlers={{
      save: () => onSave(id)
    }}>
      <Paper className={classes.paper}>
        <div style={{display: 'flex'}}>
          <TextField
            label="Name"
            value={data.name || ''}
            onChange={event => onNameChange(id, event.target.value)}
            style={{flexGrow: 1, marginTop: -8}}
          />
          <Button
            disabled={saved || saving}
            onClick={() => onSave(id)}
            variant="contained"
            color="primary"
            className={classes.button}
          >
            <Floppy />
          </Button>
          <Button
            onClick={() => onDelete(id)}
            variant="contained"
            className={classes.button}
          >
            <Delete />
          </Button>
        </div>
        <div style={{display: 'flex', flexGrow: 1}}>
          <TextField
            label="Content"
            style={{flexGrow: 1}}
            multiline
            rows="10"
            margin="normal"
            variant="outlined"
            InputProps={{
              style: {fontFamily: '"Roboto Mono", monospace', height: '100%'}
            }}
            inputProps={{
              style: {height: '100%'}
            }}
            value={data.content || ''}
            onChange={event => onContentChange(id, event.target.value)}
          />
        </div>
      </Paper>
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
