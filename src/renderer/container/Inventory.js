import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';
// import { push } from 'react-router-redux';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import { Header } from 'semantic-ui-react';

import { SessionIcon, RuleIcon } from '../component/Icons';
import SelectableList from '../component/SelectableList';
import { action, selector } from '../store';

const styles = theme => ({
  container: {
    position: 'relative',
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2
  },
  header: {
    paddingRight: theme.spacing.unit * 2,
    paddingLeft: theme.spacing.unit * 2
  },
  toolbar: theme.mixins.toolbar
});

function mapStateToProps({ui, session, rule}) {
  return {ui, session, rule};
}

function mapDispatchToProps(dispatch) {
  // const user = bindActionCreators(userActions, dispatch);
  return {
    actions: {
      ui: {
        select: (type, id) => dispatch(action.ui.selectPrimary(type, id))
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

function Inventory({ui, session, rule, actions, classes}) {
  const primary = ui.primary;
  const rules = selector.rule.$d(rule).items;
  const sessions = selector.session.$d(session).items;
  return (
    <div style={{
      position: 'relative'
    }}>
      <div>
        {
          sessions.length ? (
            <div>
              <Header as="h4" dividing style={{
                marginTop: '0.75em',
                marginBottom: '0.25em',
                paddingLeft: '1em'
              }}>Sessions</Header>
              <SelectableList
                items={sessions.map(({id}) => ({
                  key: id,
                  label: id,
                  Icon: SessionIcon
                }))}
                selected={primary && primary.type === 'session' ? primary.id : undefined}
                onSelect={(id) => actions.ui.select('session', id)}
              />
            </div>
          ) : undefined
        }
        {
          rules.length ? (
            <div>
              <Header as="h4" dividing style={{
                marginTop: '0.75em',
                marginBottom: '0.25em',
                paddingLeft: '1em'
              }}>Rules</Header>
              <SelectableList
                items={rules.map(({id, data}) => ({
                  key: id,
                  label: data.name || '(untitled)',
                  Icon: RuleIcon
                }))}
                selected={primary && primary.type === 'rule' ? primary.id : undefined}
                onSelect={(id) => actions.ui.select('rule', id)}
              />
            </div>
          ) : undefined
        }
      </div>
    </div>
  );
}

export default enhance(Inventory);
