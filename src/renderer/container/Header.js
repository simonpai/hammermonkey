import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';
// import { push } from 'react-router-redux';
// import { bindActionCreators } from 'redux';
import { withStyles } from '@material-ui/core/styles';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
// import Typography from '@material-ui/core/Typography';
import AddIcon from '@material-ui/icons/Add';

import { DIALOG_ID as NEW_OBJECT_DIALOG_ID } from '../component/NewObjectDialog';
import { action } from '../store';

const styles = theme => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  button: {
    margin: theme.spacing.unit,
  }
});

function mapStateToProps({ ui }) {
  return {
    ui
  };
}

function mapDispatchToProps(dispatch) {
  // const user = bindActionCreators(userActions, dispatch);
  return {
    actions: {
      ui: {
        menu: {
          newObject: {
            open: value => dispatch(action.ui.menu.newObject.open(value))
          }
        },
        dialog: {
          open: id => dispatch(action.ui.dialog.open(id))
        }
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

function Header({ ui, actions, classes }) {
  return (
    <AppBar position="absolute" className={classes.appBar}>
      <Toolbar>
        <IconButton
          className={classes.button}
          onClick={() => actions.ui.dialog.open(NEW_OBJECT_DIALOG_ID)}
        >
          <AddIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}

export default enhance(Header);
