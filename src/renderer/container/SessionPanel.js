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

import { action } from '../store';
import { selector } from '../store/session';

function mapStateToProps({ui, session, console}) {
  const id = ui.primary.id;
  const section = (ui.session[id] || {}).selectedTab || 'url';
  return {
    id,
    section,
    session: selector.$d(session).get(id),
    console: console.hash[id]
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      ui: {
        onSelect: (id, value) => dispatch(action.ui.session.selectTab(id, value))
      },
      session: {
        onUrlChange: (id, url) => dispatch(action.session.url(id, url))
      },
      console: {
        onEval: (id, value) => dispatch(action.console.eval(id, value))
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
function sections({id, session, console, actions}) {
  const onUrlChange = url => actions.session.onUrlChange(id, url);
  const onEval = value => actions.console.onEval(id, value);
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

function SessionPanel({id, section, session, console, actions}) {
  return (
    <Tab.View
      value={section}
      sections={sections({id, session, console, actions})}
      onSelect={value => actions.ui.onSelect(id, value)}
    >
      <Tab.View.Toolbar>
        <Button.Ripple
          icon
          // disabled={saved || saving}
          // onClick={() => actions.rule.onSave(id)}
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
  actions: PropTypes.object.isRequired
};

export default enhance(SessionPanel);
