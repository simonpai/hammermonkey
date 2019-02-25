import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'recompose';

import SessionPanel from './SessionPanel';
import RulePanel from './RulePanel';
import { $ } from '../store';

function mapStateToProps(state) {
  const {ui} = $(state);
  const [type, uuid] = ui && ui.body;
  return {type, uuid};
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

function Body({type, uuid, ...props}) {
  return (
    <main {...props}>
      {
        type && <SelectedPanel key={uuid} type={type} />
      }
    </main>
  );
}

Body.propTypes = {
  type: PropTypes.string,
  uuid: PropTypes.string,
};

export default enhance(Body);
