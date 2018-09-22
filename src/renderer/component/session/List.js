import React from 'react';
import PropTypes from 'prop-types';
import List from '@material-ui/core/List';

import SessionItem from './Item';

function SessionList({ sessions }) {
  return (
    <List component="nav">
      {sessions.map(session =>
        <SessionItem
          key={session.sessionId}
          {...session}
        />
      )}
    </List>
  )
}

SessionList.propTypes = {
  sessions: PropTypes.arrayOf(
    PropTypes.shape(SessionItem.propTypes)
  ).isRequired,
  /*
  actions: PropTypes.shape({
    select: PropTypes.func.isRequired
  }).isRequired
  */
};

export default SessionList;
