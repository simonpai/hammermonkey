import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';

import SessionPanel from '../component/session/Panel';
import RulePanel from '../component/rule/Panel';
import { action } from '../store';

function mapStateToProps({ui, session, rule, console}) {
  return {ui, session, rule, console};
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

function SelectedPanel({ui, session, rule, console, actions}) {
  const {primary} = ui;
  switch (primary && primary.type) {
    case 'session':
      return (
        <SessionPanel
          {...session.hash[primary.id]}
          {...ui.session[primary.id]}
          {...actions.session}
          {...actions.console} // TODO: organize
          console={console.hash[primary.id]}
        />
      );
    case 'rule':
      return (
        <RulePanel {...rule.hash[primary.id]} {...actions.rule} />
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
    }}>
      <SelectedPanel {...options} />
    </main>
  ) : null;
}

export default enhance(Body);
