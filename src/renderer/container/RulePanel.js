import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'recompose';

import { action, selector } from '../store/rule';
import UserscriptPanel from '../component/rule/userscript/Panel';

function mapStateToProps({ui, rule}) {
  return {
    rule: selector.$d(rule).get(ui.primary.id)
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      rule: {
        onNameChange: (id, name) => dispatch(action.update(id, {name})),
        onContentChange: (id, content) => dispatch(action.update(id, {content})),
        onSave: (id) => dispatch(action.save(id)),
        onDelete: (id) => dispatch(action.delete(id))
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
