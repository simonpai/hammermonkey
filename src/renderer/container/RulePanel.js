import React from 'react';
import PropTypes from 'prop-types';

import { connect } from '../store';
import { useApi } from '../hook';
import UserscriptPanel from '../component/rule/userscript/Panel';

function mapStateToProps() {
  return {};
}

function RulePanel({rule}) {
  const api = useApi();
  return (
    <UserscriptPanel key={rule.id} api={api} rule={rule} />
  )
}

RulePanel.propTypes = {
  rule: PropTypes.object.isRequired
};

export default connect(mapStateToProps)(RulePanel);
