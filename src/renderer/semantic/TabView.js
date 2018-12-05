import React from 'react';
import PropTypes from 'prop-types';
import { Menu, Segment } from 'semantic-ui-react';

function TabMenuItem({name, label, active, onSelect}) {
  return (
    <Menu.Item
      name={name}
      active={active}
      onClick={onSelect}
    >
      {label || name}
    </Menu.Item>
  );
}

TabMenuItem.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  active: PropTypes.bool.isRequired,
  onSelect: PropTypes.func.isRequired
};

function TabMenu({sections, value, onSelect, toolbarChildren}) {
  return (
    <Menu attached="top" tabular>
      {
        sections.map(({name, label}) => (
          <TabMenuItem key={name} name={name} label={label} active={value === name} onSelect={() => onSelect(name)} />
        ))
      }
      <Menu.Menu position='right'>
        {
          toolbarChildren
        }
      </Menu.Menu>
    </Menu>
  )
}

TabMenu.propTypes = {
  sections: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      label: PropTypes.string
    }).isRequired,
  ).isRequired,
  value: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired,
  toolbarChildren: PropTypes.any
};

function getSelectedSection({sections, value}) {
  for (let section of sections) {
    if (section.name === value) {
      return section;
    }
  }
  return undefined;
}

function TabToolbar() {
  return undefined;
}

function getToolbarChildren(children) {
  if (!Array.isArray(children)) {
    children = [children];
  }
  for (let {type, props} of children) {
    if (type === TabToolbar) {
      return props.children;
    }
  }
  return undefined;
}

function TabView({children, ...props}) {
  const section = getSelectedSection(props);
  const toolbarChildren = getToolbarChildren(children);
  return (
    <div className="hm tab view">
      <TabMenu toolbarChildren={toolbarChildren} {...props} />
      <Segment
        className="pane"
        attached="bottom"
      >
        {
          section && section.render()
        }
      </Segment>
    </div>
  )
}

TabView.propTypes = {
  sections: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      label: PropTypes.string,
      render: PropTypes.func.isRequired
    }).isRequired,
  ).isRequired,
  value: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired
};

TabView.Toolbar = TabToolbar;

export default TabView;
