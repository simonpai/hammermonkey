import React from 'react';
import PropTypes from 'prop-types';

import SettingsSection from './Settings';
import UrlSection from './Url';
import ConsoleSection from './Console';

function SessionSections({selectedTab, ...options}) {
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

SessionSections.propTypes = {
  selectedTab: PropTypes.string
};

export default SessionSections;
