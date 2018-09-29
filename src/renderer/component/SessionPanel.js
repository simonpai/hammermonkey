import { clipboard } from 'electron';
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  paper: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
  }
});

function SessionPanel({ sessionId, url, onUrlChange, classes }) {
  return (
    <div>
      <Paper className={classes.paper}>
        <Typography variant="headline" component="h3">
          Session: {sessionId}
        </Typography>
        <div>
          <TextField
            label="Original URL"
            fullWidth
            margin="normal"
            onChange={event => {
              let url = event.target.value.trim();
              if (!url) {
                return;
              }
              if (url.indexOf('://') < 0) {
                url = 'http://' + url;
              }
              // TODO: validate URL
              onUrlChange(sessionId, url);
            }}
          />
        </div>
        <div>
          <TextField
            label="Proxy URL"
            value={url || ''}
            fullWidth
            margin="normal"
            InputProps={{
              readOnly: true,
            }}
            onClick={() => clipboard.writeText(url)}
          />
        </div>
        {
          // url && <a href={url} target="_blank" rel="noopener noreferrer">{url}</a>
        }
      </Paper>
    </div>
  )
}

SessionPanel.propTypes = {
  sessionId: PropTypes.string.isRequired,
  url: PropTypes.string,
  onUrlChange: PropTypes.func.isRequired,
  classes: PropTypes.object
};

export default withStyles(styles)(SessionPanel);
