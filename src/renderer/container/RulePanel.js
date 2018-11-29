import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { HotKeys } from 'react-hotkeys';
import { Input, Button, Icon, Form, TextArea } from 'semantic-ui-react';
import { withStyles } from '@material-ui/core/styles';

import { action, selector } from '../store/rule';

const styles = theme => ({
  root: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column'
  },
  paper: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    height: '100%',
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
    borderRadius: 0
  },
  button: {
    margin: '0 0 0 10px !important',
    width: 40,
    height: 40
  }
});

const keyMap = {
  save: ['command+s', 'ctrl+s']
};

function mapStateToProps({ui, rule}) {
  return {
    rule: selector.$d(rule).get(ui.primary.id)
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      rule: {
        onNameChange: (id, name) => dispatch(action.update(id, {name})),
        onContentChange: (id, content) => dispatch(action.update(id, {content})),
        onSave: (id) => dispatch(action.save(id)),
        onDelete: (id) => dispatch(action.delete(id))
      }
    }
  };
}

const enhance = compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  withStyles(styles)
);

function RulePanel({actions, classes, rule}) {
  const {id, data, saving} = rule;
  const saved = selector.isSaved(rule);
  return (
    <HotKeys className={classes.root} keyMap={keyMap} style={{outline: 0}} handlers={{
      save: () => actions.rule.onSave(id)
    }}>
      <div className={classes.paper}>
        <div>
          <div style={{float: 'right'}}>
            <Button
              icon
              color="teal"
              disabled={saved || saving}
              onClick={() => actions.rule.onSave(id)}
              className={classes.button}
            >
              <Icon name="save" />
            </Button>
            <Button
              icon
              onClick={() => actions.rule.onDelete(id)}
              className={classes.button}
            >
              <Icon name="trash" />
            </Button>
          </div>
          <div style={{overflow: 'hidden'}}>
            <Input
              placeholder="Name"
              style={{width: '100%', height: 40}}
              value={data.name || ''}
              onChange={event => actions.rule.onNameChange(id, event.target.value)}
            />
          </div>
        </div>
        <Form style={{display: 'flex', flexGrow: 1, marginTop: 10}}>
          <TextArea
            placeholder="console.log('Hello world.')"
            style={{flexGrow: 1, resize: 'none', fontFamily: '"Roboto Mono", monospace', lineHeight: '1.5em'}}
            value={data.content || ''}
            onChange={event => actions.rule.onContentChange(id, event.target.value)}
          />
        </Form>
      </div>
    </HotKeys>
  )
}

RulePanel.propTypes = {
  rule: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired,
  classes: PropTypes.object
};

export default enhance(RulePanel);
