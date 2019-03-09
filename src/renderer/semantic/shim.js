import { Menu, Button, Form, Input, Tab, Confirm } from 'semantic-ui-react';

import MenuItemRipple from './MenuItemRipple';
import ButtonRipple from './ButtonRipple';
import InputLight from './InputLight';
import FormInputLight from './FormInputLight';
import TabView from './TabView';
import ConfirmProvider from './ConfirmProvider';

Menu.Item.Ripple = MenuItemRipple;
Button.Ripple = ButtonRipple;
Form.Input.Light = FormInputLight;
Input.Light = InputLight;
Tab.View = TabView;
Confirm.Provider = ConfirmProvider;
