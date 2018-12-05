import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'recompose';

import { action } from '../store';
import { selector } from '../store/rule';
import UserscriptPanel from '../component/rule/userscript/Panel';

function mapStateToProps({ui, rule}) {
  const id = ui.primary.id;
  return {
    rule: selector.$d(rule).get(id),
    ui: ui.rule[id]
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      ui: {
        onSelect: (id, value) => dispatch(action.ui.rule.section(id, value))
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

function RulePanel(props) {
  return (
    <UserscriptPanel {...props} />
  )
}

RulePanel.propTypes = {
  rule: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired
};

export default enhance(RulePanel);
