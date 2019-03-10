import React from 'react';
// import PropTypes from 'prop-types';
import { Menu, Dropdown } from 'semantic-ui-react';

import { useApi } from '../hook';

function AppBar({...props}) {
  const api = useApi();
  return (
    <Menu
      {...props}
      inverted
      color="teal"
    >
      <Dropdown text="New" item>
        <Dropdown.Menu>
          <Dropdown.Item onClick={api.session.open}>Session</Dropdown.Item>
          <Dropdown.Item onClick={api.rule.create}>Rule</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </Menu>
  );
}

AppBar.propTypes = {};

export default AppBar;
