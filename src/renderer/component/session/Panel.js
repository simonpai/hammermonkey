import React from 'react';
import PropTypes from 'prop-types';

import SessionTabs from './Tabs';
import SettingsSection from './Settings';
import UrlSection from './Url';
import ConsoleSection from './Console';

function SelectedSection({selectedTab, ...options}) {
  switch (selectedTab) {
    case 'settings':
      return (
        <SettingsSection {...options} />
      );
    case 'console':
      return (
        <ConsoleSection {...options} />
      );
    case 'url':
    default:
      return (
        <UrlSection {...options} />
      );
  }
}

function SessionPanel({id, selectedTab, onTabSelect, ...options}) {
  return (
    <div style={{
      height: '100%',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      borderRadius: 0
    }}>
      <SessionTabs {...{id, selectedTab, onTabSelect}} />
      <SelectedSection {...{id, selectedTab, ...options}} />
    </div>
  )
}

SessionPanel.propTypes = {
  id: PropTypes.string.isRequired,
  selectedTab: PropTypes.string,
  onTabSelect: PropTypes.func.isRequired,
  classes: PropTypes.object
};

export default SessionPanel;
