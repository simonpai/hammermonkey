import React from 'react';
import PropTypes from 'prop-types';

function SessionSettingsSection({session}) {
  const {id} = session;
  return (
    <div style={{
      padding: 10
    }}>
      <h3>Session {id}</h3>
    </div>
  )
}

SessionSettingsSection.propTypes = {
  session: PropTypes.object.isRequired
};

export default SessionSettingsSection;
