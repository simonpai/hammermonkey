import React from 'react';
import PropTypes from 'prop-types';
import { Menu, Icon } from 'semantic-ui-react';
import ButtonBase from '@material-ui/core/ButtonBase/ButtonBase';
// import createRippleHandler from '@material-ui/core/ButtonBase/createRippleHandler';

function RuleList({rules, selected, onSelect}) {
  return (
    <Menu pointing secondary vertical className="rippling" style={{
      marginTop: 0
    }}>
      {rules.map(({key, label, icon}) =>
        <Menu.Item
          key={key}
          name={key}
          active={key === selected}
          color={key === selected ? 'teal' : 'black'}
          onClick={() => onSelect(key)}
        >
          <ButtonBase className="button-base">
            <Icon name={icon} style={{
              marginRight: '0.75em'
            }} />
            {
              label
            }
          </ButtonBase>
        </Menu.Item>
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
