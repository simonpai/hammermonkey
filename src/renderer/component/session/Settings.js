import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
  },
});

function SessionSettingsSection({session, classes}) {
  const {id} = session;
  return (
    <div className={classes.root}>
      <Typography variant="h6" component="h3">
        Session {id}
      </Typography>
    </div>
  )
}

SessionSettingsSection.propTypes = {
  session: PropTypes.object.isRequired,
  classes: PropTypes.object
};

export default withStyles(styles)(SessionSettingsSection);
