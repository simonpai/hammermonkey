import React from 'react';
import PropTypes from 'prop-types';
import { Form } from 'semantic-ui-react';

function UserscriptSettingsSection({rule, onNameChange}) {
  const {id, data} = rule;
  return (
    <div>
      <div style={{
        padding: 10
      }}>
        <h3>Userscript {id}</h3>
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

UserscriptSettingsSection.propTypes = {
  rule: PropTypes.object.isRequired,
  onNameChange: PropTypes.func.isRequired
};

export default UserscriptSettingsSection;
