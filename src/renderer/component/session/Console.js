import React from 'react';
import PropTypes from 'prop-types';
import Icon from '@mdi/react';
import { mdiChevronDoubleLeft, mdiCloseCircle, mdiChevronRight } from '@mdi/js';

import { withStyles } from '@material-ui/core/styles';
import InputBase from '@material-ui/core/InputBase';

const styles = () => ({
  root: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    flex: '1 1 0%',
    overflow: 'scroll'
  },
  console: {
    fontFamily: '"Roboto Mono", monospace',
    fontSize: 12,
    lineHeight: '1.8em',
    color: '#666'
  },
  row: {
    position: 'relative',
    paddingLeft: '2em',
    minHeight: '1.8em',
    borderBottom: '1px #E0E0E0 solid'
  },
  icon: {
    position: 'absolute',
    top: '0.1em',
    left: '0.2em',
    width: '1.6em'
  },
  consoleRow: {
  },
  errorRow: {
    color: 'red',
    backgroundColor: 'rgba(255, 0, 0, 0.05)'
  },
  cell: {
    marginRight: '1em'
  },
  inputContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    flex: 1,
    position: 'relative',
    fontSize: 12,
    paddingLeft: '2em'
  },
  input: {
    flex: 1,
    fontSize: 12,
    lineHeight: '1.8em',
    padding: 0,
    alignItems: 'start'
  }
});

function renderConsole({uuid, args, classes}) {
  return (
    <div key={uuid} className={classes.row + ' ' + classes.consoleRow}>
      {
        args.map((obj, i) => (
          <span key={i} className={classes.cell}>{JSON.stringify(obj)}</span>
        ))
      }
    </div>
  );
}

renderConsole.propTypes = {
  uuid: PropTypes.string.isRequired,
  args: PropTypes.array.isRequired,
  classes: PropTypes.object
};

function render(type, classes, {uuid, ...msg}) {
  return (
    <div key={uuid} className={classes.row + ' ' + getClassName(type, classes)}>
      {
        renderIcon(type, classes)
      }
      {
        renderContent(type, classes, msg)
      }
    </div>
  );
}

function getClassName(type, classes) {
  switch (type) {
    case 'console.log':
      return classes.consoleRow;
    case 'error':
      return classes.errorRow;
    case 'eval.request':
      return classes.consoleRow;
    case 'eval.response':
      return classes.consoleRow;
  }
}

function renderIcon(type, classes) {
  switch (type) {
    case 'console.log':
      return null;
    case 'error':
      return (<Icon className={classes.icon} path={mdiCloseCircle} color="red" />);
    case 'eval.request':
      return (<Icon className={classes.icon} path={mdiChevronRight} color="#999" />);
    case 'eval.response':
      return (<Icon className={classes.icon} path={mdiChevronDoubleLeft} color="#999" />);
    case 'eval.input':
      return (<Icon className={classes.icon} path={mdiChevronRight} color="teal" />);
  }
}

function renderContent(type, classes, {args, error, expr, value}) {
  switch (type) {
    case 'console.log':
      return args.map((obj, i) => (
        <span key={i} className={classes.cell}>{JSON.stringify(obj)}</span>
      ));
    case 'error':
      return JSON.stringify(error);
    case 'eval.request':
      return expr;
    case 'eval.response':
      return JSON.stringify(error || value);
  }
}

function SessionConsoleSection({console = [], onEval, classes}) {
  return (
    <div style={{
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      flex: '1 1 0%',
      overflow: 'scroll'
    }}>
      <div style={{
        fontFamily: '"Roboto Mono", monospace',
        fontSize: 12,
        lineHeight: '1.8em',
        color: '#666'
      }}>
        {
          console.map(({type, ...msg}) => render(type, classes, {...msg}))
        }
      </div>
      <div className={classes.inputContainer}>
        {
          renderIcon('eval.input', classes)
        }
        <InputBase
          defaultValue=""
          className={classes.input}
          multiline
          inputProps={{
            style: {fontFamily: '"Roboto Mono", monospace'}
          }}
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
  classes: PropTypes.object,
  onEval: PropTypes.func.isRequired
};

export default withStyles(styles)(SessionConsoleSection);
