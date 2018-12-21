import React from 'react';
import PropTypes from 'prop-types';
import { mdiMonitorCellphone } from '@mdi/js';

import SideTabs from '../common/SideTabs';

function SessionList({sessions, selected, onSelect}) {
  return (
    <SideTabs
      items={sessions.map(({id}) => ({id}))}
      onSelect={onSelect}
      selected={selected}
      render={({id, color}) => (
        <SideTabs.Tab
          icon={mdiMonitorCellphone}
          color={color}
          name={id}
        />
      )}
    />
  );
}

SessionList.propTypes = {
  sessions: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired
    }).isRequired
  ).isRequired,
  selected: PropTypes.string,
  onSelect: PropTypes.func.isRequired
};

export default SessionList;
