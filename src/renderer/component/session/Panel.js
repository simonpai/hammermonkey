import { clipboard } from 'electron';
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  tabs: {
    borderBottom: '1px solid #CCC',
  },
  tab: {
    minWidth: 120,
  },
  body: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
  },
});

function SessionPanel({sessionId, url, proxyUrl, onUrlChange, classes}) {
  return (
    <div>
      <Paper className={classes.paper}>
        <Tabs
          value={1}
          indicatorColor="primary"
          textColor="primary"
          // onChange={this.handleChange.bind(this)}
          classes={{root: classes.tabs}}
        >
          <Tab
            classes={{root: classes.tab}}
            label="Settings"
          />
          <Tab
            classes={{root: classes.tab}}
            label="URL"
          />
          <Tab
            classes={{root: classes.tab}}
            label="Console"
          />
        </Tabs>
        <div className={classes.body}>
          <Typography variant="headline" component="h3">
            Session {sessionId}
          </Typography>
          <div>
            <TextField
              label="Original URL"
              value={url || ''}
              fullWidth
              margin="normal"
              onChange={event => onUrlChange(sessionId, event.target.value.trim())}
            />
          </div>
          <div>
            <TextField
              label="Proxy URL"
              value={proxyUrl || ''}
              fullWidth
              margin="normal"
              InputProps={{
                readOnly: true,
              }}
              onClick={() => proxyUrl && clipboard.writeText(proxyUrl)}
            />
          </div>
        </div>
        {
          // url && <a href={url} target="_blank" rel="noopener noreferrer">{url}</a>
        }
      </Paper>
    </div>
  )
}

SessionPanel.propTypes = {
  sessionId: PropTypes.string.isRequired,
  url: PropTypes.string,
  proxyUrl: PropTypes.string,
  onUrlChange: PropTypes.func.isRequired,
  classes: PropTypes.object
};

export default withStyles(styles)(SessionPanel);
