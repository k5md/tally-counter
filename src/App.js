import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import configureStore from './store/configureStore';
import { Routes } from './Routes';

const { persistor, store } = configureStore();

const App = () => (
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <Routes />
    </PersistGate>
  </Provider>
);

export default App;
