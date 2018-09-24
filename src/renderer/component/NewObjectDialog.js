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

function NewObjectDialog({ open, onSubmit, onCancel }) {
  return (
    <Dialog
      open={open}
      onClose={onCancel}
    >
      <DialogTitle>Create a new ...</DialogTitle>
      <DialogContent>
        <List>
          <ListItem button onClick={() => onSubmit('session')}>
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
  open: PropTypes.bool.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired
};

export default NewObjectDialog;
