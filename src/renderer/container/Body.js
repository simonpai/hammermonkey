import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'recompose';

import SessionPanel from './SessionPanel';
import RulePanel from './RulePanel';
import { $ } from '../store';

function getItem(type, uuid, session, rule) {
  switch (type) {
    case 'session':
      return session.get(uuid);
    case 'rule':
      return rule.get(uuid);
    default:
      return undefined;
  }
}

function mapStateToProps(state) {
  const {ui, session, rule} = $(state);
  const [type, uuid] = ui && ui.body;
  const item = getItem(type, uuid, session, rule);
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

function SelectedPanel({type, item}) {
  switch (type) {
    case 'session':
      return (
        <SessionPanel value={item} />
      );
    case 'rule':
      return (
        <RulePanel value={item} />
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
};

export default enhance(Body);
