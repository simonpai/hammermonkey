import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { Tab, Button } from 'semantic-ui-react';
import Icon from '@mdi/react';
import { mdiDelete } from '@mdi/js';

import SettingsSection from '../component/session/Settings';
import UrlSection from '../component/session/Url';
import ConsoleSection from '../component/session/Console';

import { action, $ } from '../store';

function mapStateToProps({ui, session, console}) {
  const id = $.ui(ui).body[1];
  const section = $.ui(ui).section('session', id) || 'url';
  return {
    id,
    section,
    session: $.session(session).get(id),
    console: $.console(console).get(id)
  };
}

function mapDispatchToProps(dispatch) {
  return {
    action: {
      ui: {
        selectSection: (id, value) => dispatch(action.ui.session.selectSection(id, value))
      },
      session: {
        updateUrl: (id, url) => dispatch(action.session.url(id, url))
      },
      console: {
        eval: (id, value) => dispatch(action.console.eval(id, value))
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

/* eslint-disable react/display-name */
function sections({id, session, console, action}) {
  const onUrlChange = url => action.session.updateUrl(id, url);
  const onEval = value => action.console.eval(id, value);
  return [
    {
      name: 'url',
      label: 'URL',
      render: () => <UrlSection onUrlChange={onUrlChange} {...{session}} />
    },
    {
      name: 'settings',
      label: 'Settings',
      render: () => <SettingsSection {...{session}} />
    },
    {
      name: 'console',
      label: 'Console',
      render: () => <ConsoleSection onEval={onEval} {...{console}} />
    }
  ];
}
/* eslint-enable react/display-name */

function SessionPanel({id, section, session, console, action}) {
  return (
    <Tab.View
      value={section}
      sections={sections({id, session, console, action})}
      onSelect={value => action.ui.selectSection(id, value)}
    >
      <Tab.View.Toolbar>
        <Button.Ripple
          icon
          // disabled={saved || saving}
          // onClick={() => action.rule.onSave(id)}
        >
          <Icon path={mdiDelete} color="#666" />
        </Button.Ripple>
      </Tab.View.Toolbar>
    </Tab.View>
  );
}

SessionPanel.propTypes = {
  id: PropTypes.string.isRequired,
  section: PropTypes.string.isRequired,
  session: PropTypes.object.isRequired,
  console: PropTypes.arrayOf(
    PropTypes.shape({
    }).isRequired
  ),
  action: PropTypes.object.isRequired
};

export default enhance(SessionPanel);
