import React from 'react';
import { Menu } from 'semantic-ui-react';
import ButtonBase from '@material-ui/core/ButtonBase/ButtonBase';

function RippleMenuItem({children, ...props}) {
  return (
    <Menu.Item {...props}>
      <ButtonBase className="mu-bb">
        {children}
      </ButtonBase>
    </Menu.Item>
  )
}

export default RippleMenuItem;
