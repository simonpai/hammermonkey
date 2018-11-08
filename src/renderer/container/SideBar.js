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
import { action, selector } from '../store';

const styles = theme => ({
  drawerPaper: {
    position: 'relative',
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2
  },
  header: {
    paddingRight: theme.spacing.unit * 2,
    paddingLeft: theme.spacing.unit * 2
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
          selectSession: id => dispatch(action.ui.selectPrimary('session', id)),
          selectRule: id => dispatch(action.ui.selectPrimary('rule', id))
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
  const primary = ui.primary;
  const rules = selector.rule.$d(rule).items;
  const sessions = selector.session.list(session);
  return (
    <Drawer variant="permanent" classes={{
      paper: classes.drawerPaper
    }}>
      <div className={classes.toolbar} />
      {
        sessions.length ? (
          <div>
            <Typography variant="overline" className={classes.header}>Sessions</Typography>
            <SelectableList
              items={sessions.map(({id}) => ({
                key: id,
                label: 'Session ' + id,
                Icon: SessionIcon
              }))}
              selected={primary && primary.type === 'session' ? primary.id : undefined}
              onSelect={actions.ui.sidebar.selectSession}
            />
          </div>
        ) : undefined
      }
      {
        rules.length ? (
          <div>
            <Typography variant="overline" className={classes.header}>Rules</Typography>
            <SelectableList
              items={rules.map(({id, data}) => ({
                key: id,
                label: data.name || '(untitled)',
                Icon: RuleIcon
              }))}
              selected={primary && primary.type === 'rule' ? primary.id : undefined}
              onSelect={actions.ui.sidebar.selectRule}
            />
          </div>
        ) : undefined
      }
    </Drawer>
  );
}

export default enhance(SideBar);
