import React from 'react';
import PropTypes from 'prop-types';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import SessionIcon from './Icon';

function SessionItem({ sessionId, selected, onSelect }) {
  return (
    <ListItem key={sessionId} button selected={selected} onClick={onSelect}>
      <ListItemIcon>
        <SessionIcon />
      </ListItemIcon>
      <ListItemText primary={sessionId} />
    </ListItem>
  )
}

SessionItem.propTypes = {
  sessionId: PropTypes.string.isRequired,
  selected: PropTypes.bool.isRequired,
  onSelect: PropTypes.func.isRequired
};

export default SessionItem;
