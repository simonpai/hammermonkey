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

const enhance = compose(
  connect(
    mapStateToProps
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

function Body({type}) {
  return (
    <main style={{
      flexGrow: 1,
      minWidth: 0,
      display: 'flex',
      flexDirection: 'column',
      padding: 30,
      boxShadow: 'inset rgba(0, 0, 0, 0.1) 0 0 10px',
      backgroundColor: '#EEE'
    }}>
      {
        type && <SelectedPanel type={type} />
      }
      {
        <Confirm />
      }
    </main>
  );
}

Body.propTypes = {
  type: PropTypes.string
};

export default enhance(Body);
