import React from 'react';
import { Button } from 'semantic-ui-react';
import ButtonBase from '@material-ui/core/ButtonBase/ButtonBase';

// https://github.com/Semantic-Org/Semantic-UI-React/blob/master/src/elements/Button/Button.js
function ButtonRipple({children, ...props}) {
  return (
    <Button as={ButtonBase} {...props}>
      {children}
    </Button>
  )
}

export default ButtonRipple;
