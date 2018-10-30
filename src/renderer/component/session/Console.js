import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
// import TextField from '@material-ui/core/TextField';
// import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  root: {
    /*
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    */
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

function renderError({uuid, error, classes}) {
  return (
    <div key={uuid} className={classes.row + ' ' + classes.errorRow}>
      {JSON.stringify(error)}
    </div>
  );
}

renderError.propTypes = {
  uuid: PropTypes.string.isRequired,
  error: PropTypes.object.isRequired,
  classes: PropTypes.object
};

function SessionConsoleSection({console = [], classes}) {
  return (
    <div className={classes.root}>
      <div className={classes.console}>
        {
          console.map(({type, ...msg}) => (type === 'error' ? renderError : renderConsole)({...msg, classes}))
        }
      </div>
    </div>
  )
}

SessionConsoleSection.propTypes = {
  console: PropTypes.array,
  classes: PropTypes.object
};

export default withStyles(styles)(SessionConsoleSection);
