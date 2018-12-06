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
    action: {
      ui: {
        selectBody: (type, id) => dispatch(action.ui.selectBody(type, id))
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

function Inventory({ui, session, rule, action}) {
  const body = ui.body;
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
                selected={body && body.type === 'session' ? body.id : undefined}
                onSelect={(id) => action.ui.selectBody('session', id)}
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
                selected={body && body.type === 'rule' ? body.id : undefined}
                onSelect={(id) => action.ui.selectBody('rule', id)}
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
  action: PropTypes.object
};

export default enhance(Inventory);
