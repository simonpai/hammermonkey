import React from 'react';
import { Input } from 'semantic-ui-react';

function InputLight({inputProps = {}, className, ...props}) {
  className = 'hm-light-input' + (className ? ' ' + className : '');
  const {style: customInputStyle = {}, ...restInputProps} = inputProps;
  const inputStyle = {
    padding: '0.333em 0',
    borderTop: 'none',
    borderLeft: 'none',
    borderRight: 'none',
    borderRadius: 0,
    ...customInputStyle
  };
  return (
    <Input className={className} {...props}>
      <input style={inputStyle} {...restInputProps} />
    </Input>
  )
}

export default InputLight;
