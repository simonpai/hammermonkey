import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

import SessionTabs from './Tabs';
import SessionSections from './Sections';

const styles = theme => ({
  /*
  body: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
  },
  */
});

function SessionPanel({sessionId, selectedTab, onTabSelect, classes, ...options}) {
  return (
    <div>
      <Paper>
        <SessionTabs {...{sessionId, selectedTab, onTabSelect}} />
        <SessionSections {...{sessionId, selectedTab, ...options}} />
      </Paper>
    </div>
  )
}

SessionPanel.propTypes = {
  sessionId: PropTypes.string.isRequired,
  selectedTab: PropTypes.string,
  onTabSelect: PropTypes.func.isRequired,
  classes: PropTypes.object
};

export default withStyles(styles)(SessionPanel);
