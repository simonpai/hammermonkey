import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { Confirm as _Confirm } from 'semantic-ui-react';

import { action, $ } from '../store';

function mapStateToProps(state) {
  const {ui: {confirm}} = $(state);
  const open = !!confirm;
  return {open, ...confirm || {}};
}

function mapDispatchToProps(dispatch) {
  return {
    action: {
      ui: {
        close: (act) => (act && dispatch(act), dispatch(action.ui.confirm()))
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

function Confirm({action, open, content, cancel, confirm}) {
  return (
    <_Confirm
      open={open}
      content={content}
      onCancel={() => action.ui.close(cancel)}
      onConfirm={() => action.ui.close(confirm)}
    />
  );
}

Confirm.propTypes = {
  action: PropTypes.object.isRequired,
  open: PropTypes.bool.isRequired,
  content: PropTypes.string,
  cancel: PropTypes.object,
  confirm: PropTypes.object
};

export default enhance(Confirm);
