import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { Menu, Dropdown } from 'semantic-ui-react';

import { action } from '../store';

function mapStateToProps() {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {
    action: {
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

function AppBar({action}) {
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
          <Dropdown.Item onClick={() => action.session.open()}>Session</Dropdown.Item>
          <Dropdown.Item onClick={() => action.rule.create()}>Rule</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </Menu>
  );
}

AppBar.propTypes = {
  ui: PropTypes.object,
  action: PropTypes.object
};

export default enhance(AppBar);
