import React from 'react';
import PropTypes from 'prop-types';
import { Menu } from 'semantic-ui-react';
import Icon from '@mdi/react';
import { mdiMonitorCellphone } from '@mdi/js';

function SessionList({sessions, selected, onSelect}) {
  return (
    <Menu pointing secondary vertical className="rippling" style={{
      marginTop: 0
    }}>
      {sessions.map(({key, label}) =>
        <Menu.Item.Ripple
          key={key}
          name={key}
          active={key === selected}
          color={key === selected ? 'teal' : 'black'}
          onClick={() => onSelect(key)}
        >
          <Icon
            path={mdiMonitorCellphone}
            color={key === selected ? 'teal' : 'black'}
            style={{
              width: 16,
              marginRight: '0.75em'
            }}
          />
          {
            label
          }
        </Menu.Item.Ripple>
      )}
    </Menu>
  )
}

SessionList.propTypes = {
  sessions: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired
    }).isRequired
  ).isRequired,
  selected: PropTypes.string,
  onSelect: PropTypes.func.isRequired
};

export default SessionList;
