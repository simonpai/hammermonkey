import React from 'react';
import PropTypes from 'prop-types';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
// import DialogContentText from '@material-ui/core/DialogContentText';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

export const DIALOG_ID = 'newSession';

function NewSessionDialog({ ui, actions }) {
  let urlInput;
  return (
    <Dialog
      open={ui.open}
      onClose={actions.cancel}
    >
      <DialogTitle>New Session</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          id="url"
          label="URL"
          type="url"
          inputRef={n => urlInput = n}
          fullWidth
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={actions.cancel} color="primary">
          Cancel
        </Button>
        <Button onClick={() => {
          if (!urlInput.value.trim()) {
            return;
          }
          // TODO: uuid
          actions.open(urlInput.value.trim());
          urlInput.value = '';
        }} color="primary">
          Open
        </Button>
      </DialogActions>
    </Dialog>
  );
}

NewSessionDialog.propTypes = {
  ui: PropTypes.shape({
    open: PropTypes.bool.isRequired
  }).isRequired,
  actions: PropTypes.shape({
    open: PropTypes.func.isRequired,
    cancel: PropTypes.func.isRequired
  }).isRequired
};

export default NewSessionDialog;
