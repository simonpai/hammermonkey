import React from 'react';
import PropTypes from 'prop-types';
import List from '@material-ui/core/List';

import SessionItem from './Item';

function SessionList({ ids, selected, onSelect }) {
  return (
    <List component="nav">
      {ids.map(id =>
        <SessionItem
          key={id}
          sessionId={id}
          selected={id === selected}
          onSelect={() => onSelect(id)}
        />
      )}
    </List>
  )
}

SessionList.propTypes = {
  ids: PropTypes.arrayOf(
    PropTypes.string.isRequired
  ).isRequired,
  selected: PropTypes.string,
  onSelect: PropTypes.func.isRequired
};

export default SessionList;
