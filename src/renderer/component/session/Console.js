import React from 'react';
import PropTypes from 'prop-types';
import { TextArea } from 'semantic-ui-react';
import Icon from '@mdi/react';
import { mdiChevronDoubleLeft, mdiCloseCircle, mdiChevronRight } from '@mdi/js';

function render(type, {uuid, ...msg}) {
  let className = 'hm row';
  switch (type) {
    case 'error':
      className += ' error';
  }
  return (
    <div key={uuid} className={className}>
      {
        renderIcon(type)
      }
      {
        renderContent(type, msg)
      }
    </div>
  );
}

function renderIcon(type) {
  switch (type) {
    case 'console.log':
      return null;
    case 'error':
      return (<Icon className="hm icon" path={mdiCloseCircle} color="red" />);
    case 'eval.request':
      return (<Icon className="hm icon" path={mdiChevronRight} color="#999" />);
    case 'eval.response':
      return (<Icon className="hm icon" path={mdiChevronDoubleLeft} color="#999" />);
    case 'eval.input':
      return (<Icon className="hm icon" path={mdiChevronRight} color="teal" />);
  }
}

function renderContent(type, {args, error, expr, value}) {
  switch (type) {
    case 'console.log':
      return args.map((obj, i) => (
        <span key={i} className="hm cell">{JSON.stringify(obj)}</span>
      ));
    case 'error':
      return JSON.stringify(error);
    case 'eval.request':
      return expr;
    case 'eval.response':
      return JSON.stringify(error || value);
  }
}

function SessionConsoleSection({console = [], onEval}) {
  return (
    <div className="hm console-panel code">
      <div>
        {
          console.map(({type, ...msg}) => render(type, {...msg}))
        }
      </div>
      <div className="hm input-container">
        {
          renderIcon('eval.input')
        }
        <TextArea
          className="hm input code"
          onKeyDown={event => {
            if (event.key === 'Enter' && !event.shiftKey) {
              event.preventDefault(); // in case Enter pressed with empty input
              var value = event.target.value.trim();
              if (value) {
                onEval(value);
                event.target.value = '';
              }
            }
          }}
        />
      </div>
    </div>
  )
}

SessionConsoleSection.propTypes = {
  console: PropTypes.array,
  onEval: PropTypes.func.isRequired
};

export default SessionConsoleSection;
