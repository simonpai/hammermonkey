import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import InputBase from '@material-ui/core/InputBase';
// import TextField from '@material-ui/core/TextField';
// import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  root: {
    /*
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    */
    height: '100%',
    display: 'flex',
    flexDirection: 'column'
  },
  console: {
    fontFamily: '"Roboto Mono", monospace',
    fontSize: 12,
    lineHeight: '1.8em',
    color: '#333'
  },
  row: {
    paddingLeft: theme.spacing.unit * 2,
    paddingRight: theme.spacing.unit * 2,
    borderBottom: '1px #E0E0E0 solid'
  },
  consoleRow: {
  },
  errorRow: {
    color: 'red'
  },
  cell: {
    marginRight: '1em'
  },
  inputContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    flex: 1
  },
  input: {
    flex: 1,
    fontSize: 12,
    lineHeight: '1.8em',
    padding: 0,
    paddingLeft: 16,
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
      return JSON.stringify(value);
  }
}

function SessionConsoleSection({id, console = [], onEval, classes}) {
  return (
    <div className={classes.root}>
      <div className={classes.console}>
        {
          console.map(({type, ...msg}) => render(type, classes, {...msg}))
        }
      </div>
      <div className={classes.inputContainer}>
        <InputBase
          defaultValue=""
          className={classes.input}
          multiline
          inputProps={{
            style: {fontFamily: '"Roboto Mono", monospace'}
          }}
          onKeyDown={event => {
            if (event.key === 'Enter' && !event.shiftKey) {
              event.preventDefault();
              onEval(id, event.target.value);
              event.target.value = '';
            }
          }}
        />
      </div>
    </div>
  )
}

SessionConsoleSection.propTypes = {
  id: PropTypes.string.isRequired,
  console: PropTypes.array,
  classes: PropTypes.object,
  onEval: PropTypes.func.isRequired
};

export default withStyles(styles)(SessionConsoleSection);
