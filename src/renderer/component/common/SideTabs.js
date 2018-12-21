import React from 'react';
import PropTypes from 'prop-types';
import { Menu } from 'semantic-ui-react';
import Icon from '@mdi/react';

function Tab({color, icon, name, children}) {
  return (
    <React.Fragment>
      {
        icon && <Icon
          path={icon}
          color={color}
          className="hm icon"
        />
      }
      {
        children
      }
      <div className="hm name">
        {
          name
        }
      </div>
    </React.Fragment>
  );
}

Tab.propTypes = {
  color: PropTypes.string.isRequired,
  icon: PropTypes.any,
  name: PropTypes.string,
  children: PropTypes.any
};

function SideTabs({items, render, selected, onSelect}) {
  return (
    <Menu pointing secondary vertical className="hm sidetabs">
      {items.map(({id, ...props}) => ({
        id,
        selected: id === selected,
        color: id === selected ? 'teal' : 'black',
        ...props
      }))
      .map(({id, selected, color, ...props}) =>
        <Menu.Item.Ripple
          key={id}
          name={id}
          active={selected}
          color={color}
          className="hm tab"
          onClick={() => onSelect(id)}
        >
          {
            render({id, selected, color, ...props})
          }
        </Menu.Item.Ripple>
      )}
    </Menu>
  )
}

SideTabs.propTypes = {
  items: PropTypes.array.isRequired,
  render: PropTypes.func.isRequired,
  selected: PropTypes.string,
  onSelect: PropTypes.func.isRequired
};

SideTabs.Tab = Tab;

export default SideTabs;
