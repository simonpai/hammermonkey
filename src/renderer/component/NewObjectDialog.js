import React from 'react';
import PropTypes from 'prop-types';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
// import DialogContentText from '@material-ui/core/DialogContentText';

import SessionIcon from './session/Icon';

export const DIALOG_ID = 'newObject';

function NewObjectDialog({ ui, actions }) {
  return (
    <Dialog
      open={ui.open}
      onClose={actions.cancel}
    >
      <DialogTitle>Create a new ...</DialogTitle>
      <DialogContent>
        <List>
          <ListItem button onClick={() => actions.submit('session')}>
            <ListItemIcon>
              <SessionIcon />
            </ListItemIcon>
            <ListItemText primary="Session" />
          </ListItem>
        </List>
      </DialogContent>
    </Dialog>
  );
}

NewObjectDialog.propTypes = {
  ui: PropTypes.shape({
    open: PropTypes.bool.isRequired
  }).isRequired,
  actions: PropTypes.shape({
    submit: PropTypes.func.isRequired,
    cancel: PropTypes.func.isRequired
  }).isRequired
};

export default NewObjectDialog;
