import React from 'react';
import PropTypes from 'prop-types';
import { Menu } from 'semantic-ui-react';
import Icon from '@mdi/react';

function Item({color, icon, label, children}) {
  return (
    <React.Fragment>
      {
        icon && <Icon
          path={icon}
          color={color}
          style={{
            float: 'left',
            width: 16,
            margin: 12,
            marginRight: '0.75em',
            verticalAlign: 'sub'
          }}
        />
      }
      {
        children
      }
      <div style={{
        overflow: 'hidden',
        padding: '12px 0'
      }}>
        {
          label
        }
      </div>
    </React.Fragment>
  );
}

Item.propTypes = {
  color: PropTypes.string.isRequired,
  icon: PropTypes.any,
  label: PropTypes.string,
  children: PropTypes.any
};

function SideList({items, render, selected, onSelect}) {
  return (
    <Menu pointing secondary vertical style={{
      marginTop: 0
    }}>
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
          className="hm item"
          style={{
            padding: 0
          }}
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

SideList.propTypes = {
  items: PropTypes.array.isRequired,
  render: PropTypes.func.isRequired,
  selected: PropTypes.string,
  onSelect: PropTypes.func.isRequired
};

SideList.Item = Item;

export default SideList;
