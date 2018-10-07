import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';
// import { push } from 'react-router-redux';
// import { bindActionCreators } from 'redux';
import { withStyles } from '@material-ui/core/styles';

import Drawer from '@material-ui/core/Drawer';
import Typography from '@material-ui/core/Typography';
// import Toolbar from '@material-ui/core/Toolbar';

import { SessionIcon, RuleIcon } from '../component/Icons';
import SelectableList from '../component/SelectableList';
import { action, helpers } from '../store';

const styles = theme => ({
  drawerPaper: {
    position: 'relative'
  },
  toolbar: theme.mixins.toolbar
});

function mapStateToProps({ui, session, rule}) {
  return {ui, session, rule};
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

function SideBar({ui, session, rule, actions, classes}) {
  const selectedObject = ui.sidebar.selectedObject;
  const rules = helpers.rule.list(rule);
  const sessions = helpers.session.list(session);
  return (
    <Drawer variant="permanent" classes={{
      paper: classes.drawerPaper
    }}>
      <div className={classes.toolbar} />
      {
        sessions.length ? (
          <div>
            <Typography variant="subheading" gutterBottom>Sessions</Typography>
            <SelectableList
              items={sessions.map(({sessionId}) => ({
                key: sessionId,
                label: 'Session ' + sessionId,
                Icon: SessionIcon
              }))}
              selected={selectedObject && selectedObject.type === 'session' ? selectedObject.id : undefined}
              onSelect={actions.ui.sidebar.selectSession}
            />
          </div>
        ) : undefined
      }
      {
        rules.length ? (
          <div>
            <Typography variant="subheading" gutterBottom>Rules</Typography>
            <SelectableList
              items={rules.map(({id, name}) => ({
                key: id,
                label: name || '(untitled)',
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
