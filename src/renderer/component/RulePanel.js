// import { clipboard } from 'electron';
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  paper: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
  },
  saveButton: {
    marginLeft: theme.spacing.unit * 2
  }
});

function RulePanel({id, name, content, onNameChange, onContentChange, onSave, classes, ...rule}) {
  const unsaved = !rule.savedObj || rule.savedObj.name !== name || rule.savedObj.content !== content;
  return (
    <div>
      <Paper className={classes.paper}>
        <Typography variant="headline" component="h3">
          Rule: {id}
        </Typography>
        <div style={{display: 'flex'}}>
          <TextField
            label="Name"
            value={name || ''}
            onChange={event => onNameChange(id, event.target.value)}
            style={{flexGrow: 1}}
          />
          <Button
            disabled={!unsaved}
            onClick={() => onSave(id)}
            variant="contained"
            color="primary"
            className={classes.saveButton}
          >
            {unsaved ? 'Save' : rule.saving ? 'Saving...' : 'Saved '}
          </Button>
        </div>
        <div style={{display: 'flex'}}>
          <TextField
            label="Content"
            style={{flexGrow: 1}}
            multiline
            rows="10"
            margin="normal"
            variant="outlined"
            InputProps={{
              style: {fontFamily: '"Roboto Mono", monospace'}
            }}
            value={content || ''}
            onChange={event => onContentChange(id, event.target.value)}
          />
        </div>
      </Paper>
    </div>
  )
}

RulePanel.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string,
  content: PropTypes.string,
  onNameChange: PropTypes.func.isRequired,
  onContentChange: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  classes: PropTypes.object
};

export default withStyles(styles)(RulePanel);