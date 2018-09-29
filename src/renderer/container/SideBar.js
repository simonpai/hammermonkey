import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';
// import { push } from 'react-router-redux';
// import { bindActionCreators } from 'redux';
import { withStyles } from '@material-ui/core/styles';

import Drawer from '@material-ui/core/Drawer';
import Typography from '@material-ui/core/Typography';
// import Toolbar from '@material-ui/core/Toolbar';

import { SessionIcon, RuleIcon } from '../component/Icon';
import SelectableList from '../component/SelectableList';
import { action } from '../store';

const styles = theme => ({
  drawerPaper: {
    position: 'relative'
  },
  toolbar: theme.mixins.toolbar
});

function mapStateToProps({ ui, session, rule }) {
  return {
    ui,
    session,
    rule
  };
}

function mapDispatchToProps(dispatch) {
  // const user = bindActionCreators(userActions, dispatch);
  return {
    actions: {
      ui: {
        sidebar: {
          selectTab: id => dispatch(action.ui.sidebar.selectTab(id)),
          selectSession: id => dispatch(action.ui.sidebar.selectObject('session', id)),
          selectRule: id => dispatch(action.ui.sidebar.selectObject('rule', id))
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

function SideBar({ ui, session, rule, actions, classes }) {
  const selectedObject = ui.sidebar.selectedObject;
  return (
    <Drawer variant="permanent" classes={{
      paper: classes.drawerPaper
    }}>
      <div className={classes.toolbar} />
      {
        session.ids.length ? (
          <div>
            <Typography variant="subheading" gutterBottom>Sessions</Typography>
            <SelectableList
              items={session.ids.map(id => ({
                key: id,
                label: id,
                Icon: SessionIcon
              }))}
              selected={selectedObject && selectedObject.type === 'session' ? selectedObject.id : undefined}
              onSelect={actions.ui.sidebar.selectSession}
            />
          </div>
        ) : undefined
      }
      {
        rule.list.length ? (
          <div>
            <Typography variant="subheading" gutterBottom>Rules</Typography>
            <SelectableList
              items={rule.list.map(id => ({
                key: id,
                label: id,
                Icon: RuleIcon
              }))}
              selected={selectedObject && selectedObject.type === 'rule' ? selectedObject.id : undefined}
              onSelect={actions.ui.sidebar.selectRule}
            />
          </div>
        ) : undefined
      }
    </Drawer>
  );
}

export default enhance(SideBar);
