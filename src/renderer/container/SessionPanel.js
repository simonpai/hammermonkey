import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { Segment } from 'semantic-ui-react';

import SessionTabs from '../component/session/Tabs';
import SettingsSection from '../component/session/Settings';
import UrlSection from '../component/session/Url';
import ConsoleSection from '../component/session/Console';

import { action } from '../store';
import { selector } from '../store/session';

function mapStateToProps({ui, session, console}) {
  const id = ui.primary.id;
  return {
    id,
    session: selector.$d(session).get(id),
    console: console.hash[id],
    ui: ui.session[id]
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

function SelectedSection({id, selection, session, console, actions}) {
  switch (selection) {
    case 'settings':
      return (
        <SettingsSection
          {...{session}}
        />
      );
    case 'console':
      return (
        <ConsoleSection
          onEval={value => actions.console.onEval(id, value)}
          {...{console}}
        />
      );
    case 'url':
    default:
      return (
        <UrlSection
          onUrlChange={url => actions.session.onUrlChange(id, url)}
          {...{session}}
        />
      );
  }
}

function SessionPanel({id, ui = {}, session, console, actions}) {
  const selection = ui.selectedTab;
  return (
    <div style={{
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      borderRadius: 0
    }}>
      <SessionTabs
        selection={selection}
        onSelect={value => actions.ui.onSelect(id, value)}
      />
      <Segment
        attached="bottom"
        style={{
          padding: 0,
          flexGrow: 1,
          height: '100%',
          boxShadow: 'rgba(0, 0, 0, 0.2) 0 3px 5px'
        }}
      >
        <SelectedSection {...{id, selection, session, console, actions}} />
      </Segment>
    </div>
  )
}

export default enhance(SessionPanel);