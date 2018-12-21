import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'semantic-ui-react';
import Icon from '@mdi/react';
import { mdiFileDocumentOutline, mdiPowerPlug, mdiPowerPlugOff } from '@mdi/js';

import SideTabs from '../common/SideTabs';

function RuleList({rules, selected, onSelect, onSetActive}) {
  return (
    <SideTabs
      items={rules.map(({id, active, data}) => ({
        id,
        active,
        name: data.name || '(untitled)'
      }))}
      onSelect={onSelect}
      selected={selected}
      render={({id, active, color, name}) => (
        <SideTabs.Tab
          icon={mdiFileDocumentOutline}
          color={color}
          name={name}
        >
          <Button.Ripple
            icon
            className="hm chbox"
            component="a"
            onMouseDown={event => event.stopPropagation()}
            onClick={event => event.stopPropagation() || onSetActive(id, !active)}
          >
            <Icon path={active ? mdiPowerPlug : mdiPowerPlugOff} color={color} />
          </Button.Ripple>
        </SideTabs.Tab>
      )}
    />
  );
}

RuleList.propTypes = {
  rules: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      active: PropTypes.bool.isRequired,
      data: PropTypes.object.isRequired
    }).isRequired
  ).isRequired,
  selected: PropTypes.string,
  onSelect: PropTypes.func.isRequired,
  onSetActive: PropTypes.func.isRequired
};

export default RuleList;
