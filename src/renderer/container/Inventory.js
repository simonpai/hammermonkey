import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { Header } from 'semantic-ui-react';

import SessionList from '../component/session/List';
import RuleList from '../component/rule/List';
import { action, selector } from '../store';

function mapStateToProps({ui, session, rule}) {
  return {ui, session, rule};
}

function mapDispatchToProps(dispatch) {
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
  )
);

function Inventory({ui, session, rule, actions}) {
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
                marginTop: '1em',
                marginBottom: 0,
                paddingLeft: '1em'
              }}>Sessions</Header>
              <SessionList
                sessions={sessions.map(({id}) => ({
                  key: id,
                  label: id
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
                marginTop: '1em',
                marginBottom: 0,
                paddingLeft: '1em'
              }}>Rules</Header>
              <RuleList
                rules={rules.map(({id, data}) => ({
                  key: id,
                  label: data.name || '(untitled)'
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

Inventory.propTypes = {
  ui: PropTypes.object,
  session: PropTypes.object,
  rule: PropTypes.object,
  actions: PropTypes.object
};

export default enhance(Inventory);
