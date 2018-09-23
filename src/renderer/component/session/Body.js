import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';

function SessionBody({ sessionId, url }) {
  return (
    <div>
      <Typography>Session: {sessionId}</Typography>
      <a href={url} target="_blank" rel="noopener noreferrer">{url}</a>
    </div>
  )
}

SessionBody.propTypes = {
  sessionId: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
};

export default SessionBody;
