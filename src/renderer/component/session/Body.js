import React from 'react';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

function SessionBody({ sessionId, url, onUrlChange }) {
  return (
    <div>
      <Paper>
        <Typography>Session: {sessionId}</Typography>
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
          />
        </div>
        {
          // url && <a href={url} target="_blank" rel="noopener noreferrer">{url}</a>
        }
      </Paper>
    </div>
  )
}

SessionBody.propTypes = {
  sessionId: PropTypes.string.isRequired,
  url: PropTypes.string,
  onUrlChange: PropTypes.func.isRequired
};

export default SessionBody;
