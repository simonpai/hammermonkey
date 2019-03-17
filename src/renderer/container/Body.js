import React from 'react';
import PropTypes from 'prop-types';

import SessionPanel from '../component/session/Panel';
import RulePanel from '../component/rule/Panel';
import { $, connect } from '../store';

function getItem(type, uuid, session, rule, console) {
  switch (type) {
    case 'session':
      var s = session.get(uuid);
      return s && {
        session: s,
        console: console.get(uuid)
      };
    case 'rule':
      var r = rule.get(uuid);
      return r && {
        rule: r
      };
    default:
      return undefined;
  }
}

function mapStateToProps(state, {subject}) {
  const {session, rule, console} = $(state);
  const [type, uuid] = subject;
  const item = getItem(type, uuid, session, rule, console);
  return {type, uuid, item};
}

function SelectedPanel({type, uuid, item}) {
  switch (type) {
    case 'session':
      return (
        <SessionPanel uuid={uuid} session={item.session} console={item.console} />
      );
    case 'rule':
      return (
        <RulePanel uuid={uuid} rule={item.rule} />
      );
    default:
      return null;
  }
}

SelectedPanel.propTypes = {
  type: PropTypes.string,
  uuid: PropTypes.string,
  item: PropTypes.object
};

function Body({type, uuid, item, ...props}) {
  return (
    <main {...props}>
      {
        item && <SelectedPanel key={uuid} type={type} item={item} />
      }
    </main>
  );
}

Body.propTypes = {
  type: PropTypes.string,
  uuid: PropTypes.string,
  item: PropTypes.object
};

export default connect(mapStateToProps)(Body);
