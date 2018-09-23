import React from 'react';
import PropTypes from 'prop-types';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import SessionIcon from './Icon';

function SessionItem({ /*url, */sessionId }) {
  return (
    <ListItem key={sessionId} button>
      <ListItemIcon>
        <SessionIcon />
      </ListItemIcon>
      <ListItemText primary={sessionId} />
    {
      /*
      <li key={sessionId}>
        <a href={url} target="_blank" rel="noopener noreferrer">{url}</a>
      </li>
      */
    }
    </ListItem>
  )
}

SessionItem.propTypes = {
  // url: PropTypes.string.isRequired,
  sessionId: PropTypes.string.isRequired
};

export default SessionItem;
