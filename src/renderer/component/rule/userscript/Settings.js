import React from 'react';
import PropTypes from 'prop-types';
import { Form } from 'semantic-ui-react';

function SettingsTab({rule, onNameChange}) {
  const {data} = rule;
  return (
    <div>
      <div style={{
        padding: 10
      }}>
        <Form>
          <Form.Input.Light
            fluid
            label="Title"
            value={data.name || ''}
            onChange={event => onNameChange(event.target.value)}
          />
        </Form>
      </div>
    </div>
  )
}

SettingsTab.propTypes = {
  rule: PropTypes.object.isRequired,
  onNameChange: PropTypes.func.isRequired
};

export default SettingsTab;
