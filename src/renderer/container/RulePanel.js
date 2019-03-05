import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'recompose';

import { action } from '../store';
import UserscriptPanel from '../component/rule/userscript/Panel';

function mapStateToProps() {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {
    action: {
      rule: {
        updateName: (id, name) => dispatch(action.rule.update(id, {name})),
        updateContent: (id, content) => dispatch(action.rule.update(id, {content})),
        commit: (id) => dispatch(action.rule.commit(id)),
        delete: (id) => dispatch(action.ui.confirm({confirm: action.rule.delete(id)}))
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

function RulePanel({action, rule}) {
  return (
    <UserscriptPanel key={rule.id} action={action} rule={rule} />
  )
}

RulePanel.propTypes = {
  rule: PropTypes.object.isRequired,
  action: PropTypes.object.isRequired
};

export default enhance(RulePanel);
