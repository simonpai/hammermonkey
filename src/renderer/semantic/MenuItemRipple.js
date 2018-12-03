import React from 'react';
import { Menu } from 'semantic-ui-react';
import ButtonBase from '@material-ui/core/ButtonBase/ButtonBase';

function MenuItemRipple({children, className = '', ...props}) {
  className = (className + ' mui-button-base').trim();
  return (
    <Menu.Item as={ButtonBase} className={className} {...props}>
      {children}
    </Menu.Item>
  )
}

export default MenuItemRipple;
