import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

const styles = () => ({
  tabs: {
    borderBottom: '1px solid #CCC',
  },
  tab: {
    minWidth: 120,
  },
});

function SessionTabs({id, selectedTab, onTabSelect, classes}) {
  return (
    <Tabs
      value={selectedTab || 'url'}
      indicatorColor="primary"
      textColor="primary"
      onChange={(event, value) => onTabSelect(id, value)}
      classes={{root: classes.tabs}}
    >
      <Tab
        value="settings"
        classes={{root: classes.tab}}
        label="Settings"
      />
      <Tab
        value="url"
        classes={{root: classes.tab}}
        label="URL"
      />
      <Tab
        value="console"
        classes={{root: classes.tab}}
        label="Console"
      />
    </Tabs>
  )
}

SessionTabs.propTypes = {
  id: PropTypes.string.isRequired,
  selectedTab: PropTypes.string,
  onTabSelect: PropTypes.func.isRequired,
  classes: PropTypes.object
};

export default withStyles(styles)(SessionTabs);
