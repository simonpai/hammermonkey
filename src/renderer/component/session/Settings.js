import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
// import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
  },
});

function SessionSettingsSection({sessionId, classes}) {
  return (
    <div className={classes.root}>
      <Typography variant="headline" component="h3">
        Session {sessionId}
      </Typography>
    </div>
  )
}

SessionSettingsSection.propTypes = {
  sessionId: PropTypes.string.isRequired,
  classes: PropTypes.object
};

export default withStyles(styles)(SessionSettingsSection);
