import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { Tab, Button } from 'semantic-ui-react';
import Icon from '@mdi/react';
import { mdiDelete } from '@mdi/js';

// import SettingsSection from '../component/session/Settings';
import UrlSection from '../component/session/Url';
import ConsoleSection from '../component/session/Console';

import { action, $ } from '../store';

function mapStateToProps(state) {
  const {ui, session, console} = $(state);
  const id = ui.body[1];
  return {
    id,
    session: session.get(id),
    console: console.get(id)
  };
}

function mapDispatchToProps(dispatch) {
  return {
    action: {
      session: {
        setUrl: (id, url) => dispatch(action.session.setUrl(id, url)),
        close: (id) => dispatch(action.ui.confirm({confirm: action.session.close(id)}))
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
  const onUrlChange = url => action.session.setUrl(id, url);
  const onEval = value => action.console.eval(id, value);
  return [
    {
      name: 'url',
      label: 'URL',
      render: () => <UrlSection onUrlChange={onUrlChange} {...{session}} />
    },
    /*
    {
      name: 'settings',
      label: 'Settings',
      render: () => <SettingsSection {...{session}} />
    },
    */
    {
      name: 'console',
      label: 'Console',
      render: () => <ConsoleSection onEval={onEval} {...{console}} />
    }
  ];
}
/* eslint-enable react/display-name */

function SessionPanel({action, id, session, console}) {
  const [section, setSection] = useState('url');
  return (
    <Tab.View
      value={section}
      sections={sections({id, session, console, action})}
      onSelect={setSection}
    >
      <Tab.View.Toolbar>
        <Button.Ripple
          icon
          onClick={() => action.session.close(id)}
        >
          <Icon path={mdiDelete} color="#666" />
        </Button.Ripple>
      </Tab.View.Toolbar>
    </Tab.View>
  );
}

SessionPanel.propTypes = {
  id: PropTypes.string.isRequired,
  session: PropTypes.object.isRequired,
  console: PropTypes.arrayOf(
    PropTypes.shape({
    }).isRequired
  ),
  action: PropTypes.object.isRequired
};

export default enhance(SessionPanel);
