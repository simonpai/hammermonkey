import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';
// import { push } from 'react-router-redux';
// import { bindActionCreators } from 'redux';
import { withStyles } from '@material-ui/core/styles';

import Drawer from '@material-ui/core/Drawer';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
// import Toolbar from '@material-ui/core/Toolbar';
// import Typography from '@material-ui/core/Typography';

import { action } from '../store';

const styles = theme => ({
  drawerPaper: {
    position: 'relative'
  },
  toolbar: theme.mixins.toolbar
});

function mapStateToProps({ ui, session }) {
  return {
    ui,
    session
  };
}

function mapDispatchToProps(dispatch) {
  // const user = bindActionCreators(userActions, dispatch);
  return {
    actions: {
      ui: {
        sidebar: {
          select: id => dispatch(action.ui.sidebar.select(id))
        }
      },
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

function SideBar({ ui, actions, classes }) {
  return (
    <Drawer variant="permanent" classes={{
      paper: classes.drawerPaper
    }}>
      <div className={classes.toolbar} />
      <Tabs value={ui.sidebar.selected} onChange={(event, id) => actions.ui.sidebar.select(id)}>
        <Tab label="Rules" />
        <Tab label="Sessions" />
      </Tabs>
      <div>
        {
          [
            (
              'Rules'
            ),
            (
              'Sessions'
            )
          ][ui.sidebar.selected || 0]
        }
      </div>
    </Drawer>
  );
}

export default enhance(SideBar);
