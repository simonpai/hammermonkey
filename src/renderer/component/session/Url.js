import { clipboard } from 'electron';
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Tooltip from '@material-ui/core/Tooltip';

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit,
    paddingBottom: theme.spacing.unit * 2,
  },
});

function SessionUrlSection({session, onUrlChange, classes}) {
  const {url, proxyUrl} = session;
  return (
    <div className={classes.root}>
      <div>
        <TextField
          label="Original URL"
          value={url || ''}
          fullWidth
          margin="normal"
          onChange={event => onUrlChange(event.target.value.trim())}
        />
      </div>
      <div>
        <Tooltip title="click to copy">
          <TextField
            label="Proxy URL"
            value={proxyUrl || ''}
            fullWidth
            margin="normal"
            InputProps={{
              readOnly: true
            }}
            inputProps={{
              style: {
                cursor: 'pointer'
              }
            }}
            onClick={() => proxyUrl && clipboard.writeText(proxyUrl)}
          />
        </Tooltip>
      </div>
    </div>
  )
}

SessionUrlSection.propTypes = {
  /*
  id: PropTypes.string.isRequired,
  url: PropTypes.string,
  proxyUrl: PropTypes.string,
  */
  session: PropTypes.object.isRequired,
  onUrlChange: PropTypes.func.isRequired,
  classes: PropTypes.object
};

export default withStyles(styles)(SessionUrlSection);
