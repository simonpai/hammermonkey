import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { Header } from 'semantic-ui-react';

import SessionList from '../component/session/List';
import RuleList from '../component/rule/List';
import { action, $ } from '../store';

function mapStateToProps(state) {
  const {session, rule} = $(state);
  return {session, rule};
}

function mapDispatchToProps(dispatch) {
  return {
    action: {
      rule: {
        setActive: (id, value) => dispatch(action.rule.setActive(id, value))
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

function Inventory({action, subject, session, rule, onSetSubject, ...props}) {
  const [type, uuid] = subject;
  const rules = rule.all;
  const sessions = session.all;
  return (
    <div {...props}>
      {
        sessions.length ? (
          <div>
            <Header as="h4" className="hm" dividing>Session</Header>
            <SessionList
              sessions={sessions}
              selected={type === 'session' ? uuid : undefined}
              onSelect={(uuid) => onSetSubject(['session', uuid])}
            />
          </div>
        ) : undefined
      }
      {
        rules.length ? (
          <div>
            <Header as="h4" className="hm" dividing>Rule</Header>
            <RuleList
              rules={rules}
              selected={type === 'rule' ? uuid : undefined}
              onSelect={(uuid) => onSetSubject(['rule', uuid])}
              onSetActive={(uuid, value) => action.rule.setActive(uuid, value)}
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
  action: PropTypes.object,
  subject: PropTypes.array,
  onSetSubject: PropTypes.func.isRequired
};

export default enhance(Inventory);
