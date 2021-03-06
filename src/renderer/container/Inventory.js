import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { Header } from 'semantic-ui-react';

import SessionList from '../component/session/List';
import RuleList from '../component/rule/List';
import { useApi } from '../hook';
import { $, connect } from '../store';

function mapStateToProps(state) {
  const {session, rule} = $(state);
  return {session, rule};
}

function Inventory({subject, session, rule, setSubject, ...props}) {
  const [type, uuid] = subject;
  const rules = rule.all;
  const sessions = session.all;
  const setSessionSubject = useCallback(uuid => setSubject(['session', uuid]));
  const setRuleSubject = useCallback(uuid => setSubject(['rule', uuid]));
  const api = useApi();
  return (
    <div {...props}>
      {
        sessions.length ? (
          <div>
            <Header as="h4" className="hm" dividing>Session</Header>
            <SessionList
              sessions={sessions}
              selected={type === 'session' ? uuid : undefined}
              onSelect={setSessionSubject}
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
              onSelect={setRuleSubject}
              onSetActive={api.rule.setActive}
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
  setSubject: PropTypes.func.isRequired
};

export default connect(mapStateToProps)(Inventory);
