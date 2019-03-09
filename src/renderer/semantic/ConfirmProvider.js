import React, { useState, useCallback } from 'react';
// import PropTypes from 'prop-types';
import { Confirm } from 'semantic-ui-react';

const PureConfirm = React.memo(Confirm);

const CLOSE = [false, undefined, undefined, undefined];

export const Context = React.createContext(CLOSE);

function ConfirmProvider({children, ...props}) {
  const [state, setState] = useState(CLOSE);
  const [isOpen, confirm, cancel, extraProps] = state;

  const onCancel = useCallback(() => {
    setState(CLOSE);
    cancel && cancel();
  }, state);

  const onConfirm = useCallback(() => {
    setState(CLOSE);
    confirm && confirm();
  }, state);

  const open = useCallback((confirm, cancel, props) => setState([true, confirm, cancel, props]));

  return (
    <Context.Provider value={open}>
      {children}
      <PureConfirm 
        open={isOpen}
        onCancel={onCancel}
        onConfirm={onConfirm}
        {...props}
        {...extraProps}
      />
    </Context.Provider>
  );
}

export default ConfirmProvider;
