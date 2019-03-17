import React from 'react';
import PropTypes from 'prop-types';
import { TextArea } from 'semantic-ui-react';

function EditorTab({rule, onContentChange}) {
  return (
    <TextArea
      placeholder="alert('Hello world.')"
      className="hm code static full userscript"
      value={rule.data.content || ''}
      onChange={event => onContentChange(event.target.value)}
    />
  )
}

EditorTab.propTypes = {
  rule: PropTypes.object.isRequired,
  onContentChange: PropTypes.func.isRequired
};

export default EditorTab;
