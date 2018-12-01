import React from 'react';
import PropTypes from 'prop-types';
import { Menu, Icon } from 'semantic-ui-react';

function RuleList({rules, selected, onSelect}) {
  return (
    <Menu pointing secondary vertical className="rippling" style={{
      marginTop: 0
    }}>
      {rules.map(({key, label, icon}) =>
        <Menu.Item.Ripple
          key={key}
          name={key}
          active={key === selected}
          color={key === selected ? 'teal' : 'black'}
          onClick={() => onSelect(key)}
        >
          <Icon name={icon} style={{
            marginRight: '0.75em'
          }} />
          {
            label
          }
        </Menu.Item.Ripple>
      )}
    </Menu>
  )
}

RuleList.propTypes = {
  rules: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      icon: PropTypes.any
    }).isRequired
  ).isRequired,
  selected: PropTypes.string,
  onSelect: PropTypes.func.isRequired
};

export default RuleList;
