import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

import SessionTabs from './Tabs';
import SessionSections from './Sections';

const styles = () => ({
  paper: {
    height: '100%'
  },
});

function SessionPanel({id, selectedTab, onTabSelect, classes, ...options}) {
  return (
    <Paper className={classes.paper}>
      <SessionTabs {...{id, selectedTab, onTabSelect}} />
      <SessionSections {...{id, selectedTab, ...options}} />
    </Paper>
  )
}

SessionPanel.propTypes = {
  id: PropTypes.string.isRequired,
  selectedTab: PropTypes.string,
  onTabSelect: PropTypes.func.isRequired,
  classes: PropTypes.object
};

export default withStyles(styles)(SessionPanel);
