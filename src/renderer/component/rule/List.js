import React from 'react';
import PropTypes from 'prop-types';
import { Menu, Button } from 'semantic-ui-react';
import Icon from '@mdi/react';
import { mdiFileDocumentOutline, mdiPowerPlug, mdiPowerPlugOff } from '@mdi/js';

function RuleList({rules, selected, onSelect, onSetActive}) {
  return (
    <Menu pointing secondary vertical style={{
      marginTop: 0
    }}>
      {rules.map(({id, ...props}) => ({
        id,
        selected: id === selected,
        color: id === selected ? 'teal' : 'black',
        ...props
      }))
      .map(({id, selected, active, color, label}) =>
        <Menu.Item.Ripple
          key={id}
          name={id}
          active={selected}
          color={color}
          className="hm rule"
          style={{
            padding: 0
          }}
          onClick={() => onSelect(id)}
        >
          <Icon
            path={mdiFileDocumentOutline}
            color={color}
            style={{
              float: 'left',
              width: 16,
              margin: 12,
              marginRight: '0.75em',
              verticalAlign: 'sub'
            }}
          />
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
          <div style={{
            overflow: 'hidden',
            padding: '12px 0'
          }}>
            {
              label
            }
          </div>
        </Menu.Item.Ripple>
      )}
    </Menu>
  )
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
