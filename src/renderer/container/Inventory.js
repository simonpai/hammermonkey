import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { Header } from 'semantic-ui-react';

import SessionList from '../component/session/List';
import RuleList from '../component/rule/List';
import { action, $ } from '../store';

function mapStateToProps(state) {
  const {ui, session, rule} = $(state);
  return {body: ui.body, session, rule};
}

function mapDispatchToProps(dispatch) {
  return {
    action: {
      rule: {
        setActive: (id, value) => dispatch(action.rule.setActive(id, value))
      },
      ui: {
        setBody: (type, id) => dispatch(action.ui.setBody(type, id))
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

function Inventory({action, body, session, rule, ...props}) {
  const [bodyType, bodyId] = body;
  const rules = rule.all;
  const sessions = session.all;
  return (
    <div {...props}>
      {
        sessions.length ? (
          <div>
            <Header as="h4" className="hm" dividing>Session</Header>
            <SessionList
              sessions={sessions.map(({id}) => ({
                key: id,
                label: id
              }))}
              selected={bodyType === 'session' ? bodyId : undefined}
              onSelect={(id) => action.ui.setBody('session', id)}
            />
          </div>
        ) : undefined
      }
      {
        rules.length ? (
          <div>
            <Header as="h4" className="hm" dividing>Rule</Header>
            <RuleList
              rules={rules.map(({id, active, data}) => ({
                key: id,
                id,
                active: !!active,
                label: data.name || '(untitled)'
              }))}
              selected={bodyType === 'rule' ? bodyId : undefined}
              onSelect={(id) => action.ui.setBody('rule', id)}
              onSetActive={(id, value) => action.rule.setActive(id, value)}
            />
          </div>
        ) : undefined
      }
    </div>
  );
}

Inventory.propTypes = {
  body: PropTypes.array,
  session: PropTypes.object,
  rule: PropTypes.object,
  action: PropTypes.object
};

export default enhance(Inventory);
