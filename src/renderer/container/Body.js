import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';

import SessionPanel from './SessionPanel';
import RulePanel from './RulePanel';

function mapStateToProps({ui}) {
  return {ui};
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

function Body({ui}) {
  const {primary} = ui;
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
        primary && primary.type && <SelectedPanel {...primary} />
      }
    </main>
  );
}

export default enhance(Body);
