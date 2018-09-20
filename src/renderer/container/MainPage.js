import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';
// import { push } from 'react-router-redux';
// import { bindActionCreators } from 'redux';
import { withStyles } from '@material-ui/core/styles';

import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import SessionPanel from '../component/session/Panel';
import { action } from '../store';

const styles = theme => ({
  root: {
    flexGrow: 1,
    zIndex: 1,
    height: '100%',
    overflow: 'hidden',
    position: 'relative',
    display: 'flex'
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  drawerPaper: {
    position: 'relative'
  },
  main: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3,
    minWidth: 0,
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
    <div className={classes.root}>
      <AppBar position="absolute" className={classes.appBar}>
        <Toolbar>
          <Typography variant="title" color="inherit" noWrap>
            Title
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" classes={{
        paper: classes.drawerPaper
      }}>
        <div className={classes.toolbar} />
        Drawer
      </Drawer>
      <main className={classes.main}>
        <div className={classes.toolbar} />
        <SessionPanel sessions={session.sessions} actions={actions.session} />
      </main>
    </div>
  );
}

export default enhance(MainPage);
