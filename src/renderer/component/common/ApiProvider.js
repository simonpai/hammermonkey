import React from 'react';
import PropTypes from 'prop-types';
import { Provider, connect } from 'react-redux';
import { api } from '../../util/stores';

export const Context = React.createContext();

function mapDispatchToProps(dispatch, {action}) {
  return {
    api: api(action, dispatch)
  }
}

const ApiContextProvider = connect(undefined, mapDispatchToProps)(({api, children}) => (
  <Context.Provider value={api}>
    {children}
  </Context.Provider>
));

function ApiProvider({store, action, children}) {
  return (
    <Provider store={store}>
      <ApiContextProvider action={action}>
        {children}
      </ApiContextProvider>
    </Provider>
  );
}

ApiProvider.propTypes = {
  store: PropTypes.object.isRequired,
  action: PropTypes.object.isRequired
};

export default ApiProvider;
