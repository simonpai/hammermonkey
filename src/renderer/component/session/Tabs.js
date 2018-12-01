import React from 'react';
import PropTypes from 'prop-types';
import { Menu } from 'semantic-ui-react';
// import RippleMenuItem from '../../semantic/RippleMenuItem';

import { withStyles } from '@material-ui/core/styles';

const styles = () => ({
  tabs: {
    borderBottom: '1px solid #CCC',
  },
  tab: {
    minWidth: 120,
  },
});

function SessionTab({value, label, active, onSelect}) {
  return (
    <Menu.Item
      name={value}
      active={active}
      style={{
        fontWeight: 'bold',
        opacity: active ? 1 : 0.65,
        boxShadow: active ? 'rgba(0,0,0,0.2) 0 0px 3px' : 'none'
      }}
      onClick={() => onSelect(value)}
    >
      {label || name}
    </Menu.Item>
  );
}

SessionTab.propTypes = {
  value: PropTypes.string.isRequired,
  label: PropTypes.string,
  active: PropTypes.bool.isRequired,
  onSelect: PropTypes.func.isRequired
};

function SessionTabs({selection = 'url', onSelect}) {
  return (
    <Menu attached="top" tabular>
      <SessionTab value="settings" label="Settings" active={selection === 'settings'} onSelect={onSelect} />
      <SessionTab value="url" label="URL" active={selection === 'url'} onSelect={onSelect} />
      <SessionTab value="console" label="Console" active={selection === 'console'} onSelect={onSelect} />
    </Menu>
  )
}

SessionTabs.propTypes = {
  selection: PropTypes.string,
  onSelect: PropTypes.func.isRequired,
  classes: PropTypes.object
};

export default withStyles(styles)(SessionTabs);
