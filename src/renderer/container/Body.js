import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'recompose';

import SessionPanel from './SessionPanel';
import RulePanel from './RulePanel';
import { $ } from '../store';

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

function mapDispatchToProps() {
  return {};
}

const enhance = compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
);

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
  subject: PropTypes.array
};

export default enhance(Body);
