import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'recompose';

import { action, $ } from '../store';
import UserscriptPanel from '../component/rule/userscript/Panel';

function mapStateToProps({ui, rule}) {
  const id = $.ui(ui).body[1];
  return {
    rule: $.rule(rule).get(id),
    ui: {
      section: $.ui(ui).section('rule', id) || 'editor'
    }
  };
}

function mapDispatchToProps(dispatch) {
  return {
    action: {
      ui: {
        selectSection: (id, value) => dispatch(action.ui.rule.selectSection(id, value))
      },
      rule: {
        updateName: (id, name) => dispatch(action.rule.update(id, {name})),
        updateContent: (id, content) => dispatch(action.rule.update(id, {content})),
        save: (id) => dispatch(action.rule.save(id)),
        delete: (id) => dispatch(action.rule.delete(id))
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
  action: PropTypes.object.isRequired
};

export default enhance(RulePanel);
