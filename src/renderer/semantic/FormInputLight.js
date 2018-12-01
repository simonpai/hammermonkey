import React from 'react';
import { Form } from 'semantic-ui-react';
import InputLight from './InputLight';

function FormInputLight({control, className, ...props}) { // eslint-disable-line no-unused-vars
  className = 'hm-form-input-light' + (className ? ' ' + className : '');
  return (
    <Form.Field className={className} control={InputLight} {...props} />
  )
}

export default FormInputLight;
