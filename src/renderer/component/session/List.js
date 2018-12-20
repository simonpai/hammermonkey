import React from 'react';
import PropTypes from 'prop-types';
import { mdiMonitorCellphone } from '@mdi/js';

import SideList from '../common/SideList';

function SessionList({sessions, selected, onSelect}) {
  return (
    <SideList
      items={sessions}
      onSelect={onSelect}
      selected={selected}
      render={({color, label}) => (
        <SideList.Item
          icon={mdiMonitorCellphone}
          color={color}
          label={label}
        />
      )}
    />
  );
}

SessionList.propTypes = {
  sessions: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired
    }).isRequired
  ).isRequired,
  selected: PropTypes.string,
  onSelect: PropTypes.func.isRequired
};

export default SessionList;
