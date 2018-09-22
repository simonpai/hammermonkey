import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';
// import { push } from 'react-router-redux';
// import { bindActionCreators } from 'redux';
import { withStyles } from '@material-ui/core/styles';

// import Typography from '@material-ui/core/Typography';

import Header from './Header';
import SideBar from './SideBar';
import NewSessionDialog, { DIALOG_ID as NEW_SESSION_DIALOG_ID } from '../component/session/NewDialog';

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
  main: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3,
    minWidth: 0,
  },
  toolbar: theme.mixins.toolbar
});

function mapStateToProps({ ui }) {
  return {
    ui: {
      forNewSessionDialog: {
        open: ui.dialog === NEW_SESSION_DIALOG_ID
      }
    }
  };
}

function mapDispatchToProps(dispatch) {
  // const user = bindActionCreators(userActions, dispatch);
  return {
    actions: {
      forNewSessionDialog: {
        open: url => {
          dispatch(action.ui.dialog.open());
          dispatch(action.session.open(url));
        },
        cancel: () => dispatch(action.ui.dialog.open())
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

function MainPage({ ui, actions, classes }) {
  return (
    <div className={classes.root}>
      <Header />
      <SideBar />
      <main className={classes.main}>
        <div className={classes.toolbar} />
        Body
      </main>
      <NewSessionDialog ui={ui.forNewSessionDialog} actions={actions.forNewSessionDialog} />
    </div>
  );
}

export default enhance(MainPage);
