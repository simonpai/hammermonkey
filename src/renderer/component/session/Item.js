import React from 'react';
import PropTypes from 'prop-types';

function SessionItem({ url, sessionId }) {
  return (
    <li key={sessionId}>
      <a>{url}</a>
    </li>
  )
}

SessionItem.propTypes = {
  url: PropTypes.string.isRequired,
  sessionId: PropTypes.string.isRequired
};

export default SessionItem;
