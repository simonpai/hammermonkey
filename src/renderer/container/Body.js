import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'recompose';

import SessionPanel from './SessionPanel';
import RulePanel from './RulePanel';
import Confirm from './Confirm';
import { $ } from '../store';

function mapStateToProps(state) {
  const {ui} = $(state);
  return {
    type: ui.body[0]
  };
}

function mapDispatchToProps() {
  return {};
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

function Body({type, ...props}) {
  return (
    <main {...props}>
      {
        type && <SelectedPanel type={type} />
      }
    </main>
  );
}

Body.propTypes = {
  type: PropTypes.string
};

export default enhance(Body);
