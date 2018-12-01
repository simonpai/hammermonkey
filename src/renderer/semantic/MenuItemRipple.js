import React from 'react';
import { Menu } from 'semantic-ui-react';
import ButtonBase from '@material-ui/core/ButtonBase/ButtonBase';

function MenuItemRipple({children, ...props}) {
  return (
    <Menu.Item {...props}>
      <ButtonBase className="mui-button-base">
        {children}
      </ButtonBase>
    </Menu.Item>
  )
}

export default MenuItemRipple;
