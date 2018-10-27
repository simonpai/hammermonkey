import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

import SessionPanel from '../component/session/Panel';
import RulePanel from '../component/RulePanel';
import { action } from '../store';

const styles = theme => ({
  toolbar: theme.mixins.toolbar
});

function mapStateToProps({ui, session, rule}) {
  return {ui, session, rule};
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      session: {
        onTabSelect: (id, value) => dispatch(action.ui.session.selectTab(id, value)),
        onUrlChange: (id, url) => dispatch(action.session.url(id, url))
      },
      rule: {
        onNameChange: (id, name) => dispatch(action.rule.update(id, {name})),
        onContentChange: (id, content) => dispatch(action.rule.update(id, {content})),
        onSave: (id) => dispatch(action.rule.save(id))
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

function Body({ui, session, rule, actions/*, classes*/}) {
  const {primary} = ui;
  switch (primary && primary.type) {
    case 'session':
      return (
        <SessionPanel {...session.hash[primary.id]} {...ui.session[primary.id]} {...actions.session} />
      );
    case 'rule':
      return (
        <RulePanel {...rule.hash[primary.id]} {...actions.rule} />
      );
    default:
      return (
        <Paper>nothing</Paper>
      );
  }
}

export default enhance(Body);
