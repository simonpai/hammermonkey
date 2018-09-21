import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';
// import { push } from 'react-router-redux';
// import { bindActionCreators } from 'redux';
import { withStyles } from '@material-ui/core/styles';

import Drawer from '@material-ui/core/Drawer';
// import Toolbar from '@material-ui/core/Toolbar';
// import Typography from '@material-ui/core/Typography';

import { action } from '../store';

const styles = theme => ({
  drawerPaper: {
    position: 'relative'
  },
  toolbar: theme.mixins.toolbar
});

function mapStateToProps(state) {
  return state;
}

function mapDispatchToProps(dispatch) {
  // const user = bindActionCreators(userActions, dispatch);
  return {
    actions: {
      session: {
        open: url => dispatch(action.session.open(url))
      }
    }
  };
}

const enhance = compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  withStyles(styles)
);

function MainPage({ session, actions, classes }) {
  return (
    <Drawer variant="permanent" classes={{
      paper: classes.drawerPaper
    }}>
      <div className={classes.toolbar} />
      Drawer
    </Drawer>
  );
}

export default enhance(MainPage);
