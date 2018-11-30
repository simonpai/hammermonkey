import { clipboard } from 'electron';
import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import Tooltip from '@material-ui/core/Tooltip';

function SessionUrlSection({session, onUrlChange}) {
  const {url, proxyUrl} = session;
  return (
    <div style={{
      padding: '0 10px'
    }}>
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

export default SessionUrlSection;
