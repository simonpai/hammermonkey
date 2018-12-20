import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'semantic-ui-react';
import Icon from '@mdi/react';
import { mdiFileDocumentOutline, mdiPowerPlug, mdiPowerPlugOff } from '@mdi/js';

import SideList from '../common/SideList';

function RuleList({rules, selected, onSelect, onSetActive}) {
  return (
    <SideList
      items={rules}
      onSelect={onSelect}
      selected={selected}
      render={({id, active, color, label}) => (
        <SideList.Item
          icon={mdiFileDocumentOutline}
          color={color}
          label={label}
        >
          <Button.Ripple
            icon
            style={{
              float: 'right',
              width: 40,
              height: 40,
              padding: 10,
              margin: 0,
              background: 'none'
            }}
            component="a"
            onMouseDown={event => event.stopPropagation()}
            onClick={event => event.stopPropagation() || onSetActive(id, !active)}
          >
            <Icon path={active ? mdiPowerPlug : mdiPowerPlugOff} color={color} />
          </Button.Ripple>
        </SideList.Item>
      )}
    />
  );
}

RuleList.propTypes = {
  rules: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      active: PropTypes.bool.isRequired,
      label: PropTypes.string.isRequired
    }).isRequired
  ).isRequired,
  selected: PropTypes.string,
  onSelect: PropTypes.func.isRequired,
  onSetActive: PropTypes.func.isRequired
};

export default RuleList;
