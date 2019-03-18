import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { Tab } from 'semantic-ui-react';

import { useApi } from '../../../hook';
// import SettingsTab from './Settings';
import EditorTab from './Editor';

function UserscriptTabs({rule}) {
  const api = useApi();
  const {id} = rule;
  const onContentChange = useCallback(content => api.rule.update(id, {content}), [id]);
  return (
    <>
      <Tab.View.Tab value="editor" label="Editor" default>
        <EditorTab {...{rule, onContentChange}} />
      </Tab.View.Tab>
      {/*
      <Tab.View.Tab value="settings" label="Settings">
        <SettingsTab {...{rule, onNameChange}} />
      </Tab.View.Tab>
      */}
    </>
  );
}

UserscriptTabs.propTypes = {
  rule: PropTypes.object.isRequired
};

export default UserscriptTabs;
