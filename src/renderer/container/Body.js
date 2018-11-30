import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';

import SessionPanel from './SessionPanel';
import RulePanel from './RulePanel';
import { action } from '../store';

function mapStateToProps({ui, session, console}) {
  return {ui, session, console};
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      session: {
        onTabSelect: (id, value) => dispatch(action.ui.session.selectTab(id, value)),
        onUrlChange: (id, url) => dispatch(action.session.url(id, url))
      },
      console: {
        onEval: (id, value) => dispatch(action.console.eval(id, value))
      },
      rule: {
        onNameChange: (id, name) => dispatch(action.rule.update(id, {name})),
        onContentChange: (id, content) => dispatch(action.rule.update(id, {content})),
        onSave: (id) => dispatch(action.rule.save(id)),
        onDelete: (id) => dispatch(action.rule.delete(id))
      }
    }
  };
}

const enhance = compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
);

function SelectedPanel({type}) {
  switch (type) {
    case 'session':
      return (
        <SessionPanel />
      );
    case 'rule':
      return (
        <RulePanel />
      );
    default:
      return null;
  }
}

function Body(options) {
  const {ui: {primary}} = options;
  return primary && primary.type ? (
    <main style={{
      flexGrow: 1,
      minWidth: 0,
      display: 'flex',
      flexDirection: 'column',
      borderLeft: '1px solid #CCC',
      boxShadow: '0 0 5px rgba(0, 0, 0, 0.1)'
    }}>
      <SelectedPanel {...primary} />
    </main>
  ) : null;
}

export default enhance(Body);
