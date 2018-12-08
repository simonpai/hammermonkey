import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'recompose';

import SessionPanel from './SessionPanel';
import RulePanel from './RulePanel';
import { $ } from '../store';

function mapStateToProps({ui}) {
  return {$ui: $.ui(ui)};
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

function Body({$ui}) {
  const [type] = $ui.body;
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
    </main>
  );
}

Body.propTypes = {
  $ui: PropTypes.object.isRequired
};

export default enhance(Body);
