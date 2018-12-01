import React from 'react';
import { Input } from 'semantic-ui-react';

function InputLight({inputProps = {}, className, ...props}) {
  className = 'mui-light-input' + (className ? ' ' + className : '');
  return (
    <Input className={className} transparent {...props}>
      <input {...inputProps} />
      <div className="mui-underline" />
    </Input>
  )
}

export default InputLight;
