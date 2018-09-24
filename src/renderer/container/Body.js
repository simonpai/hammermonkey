import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

import SessionBody from '../component/session/Body';
import { action } from '../store';

const styles = theme => ({
  toolbar: theme.mixins.toolbar
});

function mapStateToProps({ ui, session }) {
  return {
    ui,
    session
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      session: {
        onUrlChange: (sessionId, url) => dispatch(action.session.url(sessionId, url))
      }
    }
  };
}

const enhance = compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  withStyles(styles)
);

function Body({ ui, session, actions, classes }) {
  const obj = ui.sidebar.selectedObject;
  switch (obj && obj.type) {
    case 'session':
      return (
        <SessionBody {...session.map[obj.id]} {...actions.session} />
      );
    default:
      return (
        <Paper>Nothing</Paper>
      );
  }
}

export default enhance(Body);
