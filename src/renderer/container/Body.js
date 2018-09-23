import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

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
      ui: {
        sidebar: {
          selectTab: id => dispatch(action.ui.sidebar.selectTab(id))
        }
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
  return (
    <Paper>
      {(() => {
        switch (obj && obj.type) {
          case 'session':
            return (
              <SessionBody {...session.map[obj.id]} />
            );
          default:
            return (
              <Typography>Nothing</Typography>
            );
        }
      })()}
    </Paper>
  );
}

export default enhance(Body);
