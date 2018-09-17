import React from 'react';
import PropTypes from 'prop-types';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import SessionItem from './Item';

function SessionPanel({ sessions, actions }) {
  let input;
  return (
    <div>
      <form
        onSubmit={e => {
          e.preventDefault();
          if (!input.value.trim()) {
            return;
          }
          // TODO: uuid
          actions.open(input.value);
          input.value = '';
        }}
      >
        <div>
          <FormControl>
            <InputLabel htmlFor="name-simple">URL</InputLabel>
            <Input inputRef={n => input = n} value="http://google.com" />
          </FormControl>
          <Button type="submit" variant="raised" color="primary">Open</Button>
        </div>
      </form>
      <hr />
      <ul>
        {sessions.map(session =>
          <SessionItem
            key={session.sessionId}
            {...session}
          />
        )}
      </ul>
    </div>
  )
}

SessionPanel.propTypes = {
  sessions: PropTypes.arrayOf(
    PropTypes.shape(SessionItem.propTypes)
  ).isRequired,
  actions: PropTypes.shape({
    open: PropTypes.func.isRequired
  }).isRequired
};

export default SessionPanel;
