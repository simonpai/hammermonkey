import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import { Menu, Segment } from 'semantic-ui-react';

function Tabs({tabs, selectedValue, onSelect}) {
  return (
    <>
      {
        tabs.map(({value, label}) => (
          <Menu.Item
            key={value}
            name={value}
            active={selectedValue === value}
            onClick={() => onSelect(value)}
          >
            {label || value}
          </Menu.Item>
        ))
      }
    </>
  );
}

Tabs.propTypes = {
  tabs: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string
    })
  ).isRequired,
  selectedValue: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired
};

const PureTabs = React.memo(Tabs);

function Tab() {
  return undefined;
}

function Toolbar() {
  return undefined;
}

function processTabs(children) {
  if (!Array.isArray(children)) {
    children = [children];
  }
  let tabs = [], initialValue;
  for (let {type, props} of children) {
    switch (type) {
      case Tab:
        var {value, label, default: _default} = props;
        tabs.push({value, label});
        if (!initialValue && _default) {
          initialValue = value;
        }
        break;
    }
  }
  return [tabs, initialValue || tabs[0].value];
}

function processOthers(children) {
  if (!Array.isArray(children)) {
    children = [children];
  }
  let toolbar, panels = {};
  for (let {type, props} of children) {
    switch (type) {
      case Tab:
        var {value, children: tabChildren} = props;
        panels[value] = tabChildren;
        break;
      case Toolbar:
        if (!toolbar) {
          toolbar = props;
        }
        break;
    }
  }
  return [toolbar, panels];
}

function TabView({children, ...props}) {
  // assume tabs arrangement and default value won't change within the same body subject
  const [tabs, initialValue] = useMemo(() => processTabs(children));
  const [toolbar, panels] = processOthers(children);
  const [value, setValue] = useState(initialValue);

  return (
    <div className="hm tab view" {...props}>
      <Menu attached="top" tabular>
        <PureTabs tabs={tabs} selectedValue={value} onSelect={setValue} />
        <Menu.Menu position='right' {...toolbar} />
      </Menu>
      <Segment
        className="pane"
        attached="bottom"
      >
        {
          panels[value]
        }
      </Segment>
    </div>
  )
}

TabView.propTypes = {};

TabView.Tab = Tab;
TabView.Toolbar = Toolbar;

export default TabView;
