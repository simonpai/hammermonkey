import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'recompose';

import { action, $ } from '../store';
import UserscriptPanel from '../component/rule/userscript/Panel';

function mapStateToProps(state) {
  const {ui, rule} = $(state);
  const id = ui.body[1];
  return {
    section: ui.section('rule', id) || 'editor',
    rule: rule.get(id)
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

function RulePanel({action, section, rule}) {
  return (
    <UserscriptPanel action={action} rule={rule} ui={{section}} />
  )
}

RulePanel.propTypes = {
  // ui: PropTypes.object.isRequired,
  section: PropTypes.string.isRequired,
  rule: PropTypes.object.isRequired,
  action: PropTypes.object.isRequired
};

export default enhance(RulePanel);
