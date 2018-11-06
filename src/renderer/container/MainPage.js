import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';
// import { push } from 'react-router-redux';
import { withStyles } from '@material-ui/core/styles';

// import Typography from '@material-ui/core/Typography';
import Header from './Header';
import SideBar from './SideBar';
import Body from './Body';
import NewObjectDialog, { DIALOG_ID as NEW_OBJECT_DIALOG_ID } from '../component/NewObjectDialog';

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
    // padding: theme.spacing.unit * 3,
    minWidth: 0,
    display: 'flex',
    flexDirection: 'column',
  },
  toolbar: theme.mixins.toolbar
});

function mapStateToProps({ui}) {
  return {
    ui: {
      forNewObjectDialog: {
        open: ui.dialog === NEW_OBJECT_DIALOG_ID
      }
    }
  };
}

function onNewObject(dispatch, type) {
  switch(type) {
    case 'session':
      dispatch(action.session.open());
      break;
    case 'rule':
      dispatch(action.rule.create());
      break;
    default:
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      forNewObjectDialog: {
        onSubmit: type => {
          dispatch(action.ui.dialog.open())
          onNewObject(dispatch, type);
        },
        onCancel: () => dispatch(action.ui.dialog.open())
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

function MainPage({ui, actions, classes}) {
  return (
    <div className={classes.root}>
      <Header />
      <SideBar />
      <main className={classes.main}>
        <div className={classes.toolbar} />
        <div style={{flex: 1, overflow: 'hidden'}}>
          <Body />
        </div>
      </main>
      <NewObjectDialog {...ui.forNewObjectDialog} {...actions.forNewObjectDialog} />
    </div>
  );
}

export default enhance(MainPage);
