import { clipboard } from 'electron';
import React from 'react';
import PropTypes from 'prop-types';
import { Form, Popup } from 'semantic-ui-react';

function SessionUrlSection({session, onUrlChange}) {
  const {url, proxyUrl} = session;
  return (
    <div style={{
      padding: 10
    }}>
      <Form>
        <Form.Input.Light
          fluid
          label="Original URL"
          placeholder="google.com"
          value={url || ''}
          onChange={event => onUrlChange(event.target.value.trim())}
        />
        <Popup
          inverted
          position="bottom left"
          size="small"
          content="click to copy"
          trigger={
            <Form.Input.Light
              fluid
              label="Proxy URL"
              readOnly
              value={proxyUrl || ''}
              inputProps={{
                style: {
                  cursor: 'pointer'
                }
              }}
              onClick={() => proxyUrl && clipboard.writeText(proxyUrl)}
            />
          }
        />
      </Form>
    </div>
  )
}

SessionUrlSection.propTypes = {
  /*
  id: PropTypes.string.isRequired,
  url: PropTypes.string,
  proxyUrl: PropTypes.string,
  */
  session: PropTypes.object.isRequired,
  onUrlChange: PropTypes.func.isRequired,
  classes: PropTypes.object
};

export default SessionUrlSection;
