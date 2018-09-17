import React from 'react';
import { connect } from 'react-redux';
// import { push } from 'react-router-redux';
// import { bindActionCreators } from 'redux';
import SessionPanel from '../component/session/Panel';
import { action } from '../store';

function mapStateToProps(state) {
  return state;
}

function mapDispatchToProps(dispatch) {
  // const user = bindActionCreators(userActions, dispatch);
  return {
    actions: {
      session: {
        open: url => dispatch(action.session.open(url))
      }
    }
  };
}

function MainPage({ session, actions }) {
  return (
    <SessionPanel sessions={session.sessions} actions={actions.session} />
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MainPage);
