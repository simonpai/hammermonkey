import React from 'react';
import PropTypes from 'prop-types';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

function SelectableList({ items, selected, onSelect }) {
  return (
    <List component="nav">
      {items.map(item =>
        <ListItem key={item.key} button selected={item.key === selected} onClick={() => onSelect(item.key)}>
          <ListItemIcon>
            <item.Icon />
          </ListItemIcon>
          <ListItemText primary={item.label} />
        </ListItem>
      )}
    </List>
  )
}

SelectableList.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      Icon: PropTypes.any
    }).isRequired
  ).isRequired,
  selected: PropTypes.string,
  onSelect: PropTypes.func.isRequired
};

export default SelectableList;
