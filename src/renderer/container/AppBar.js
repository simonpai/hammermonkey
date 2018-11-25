import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'recompose';
// import { push } from 'react-router-redux';
import { Menu, Dropdown } from 'semantic-ui-react';

import { action } from '../store';

function mapStateToProps({ui}) {
  return {ui};
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      session: {
        open: () => dispatch(action.session.open())
      },
      rule: {
        create: () => dispatch(action.rule.create())
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

function AppBar({ui, actions}) {
  return (
    <Menu
      inverted
      color="teal"
      style={{
        borderRadius: 0,
        marginBottom: 0
      }}
    >
      <Dropdown text="New" item>
        <Dropdown.Menu>
          <Dropdown.Item onClick={() => actions.session.open()}>Session</Dropdown.Item>
          <Dropdown.Item onClick={() => actions.rule.create()}>Rule</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </Menu>
  );
}

AppBar.propTypes = {
  ui: PropTypes.object,
  actions: PropTypes.object
};

export default enhance(AppBar);
