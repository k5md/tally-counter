import React from 'react';
import {ActivityIndicator} from 'react-native';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import configureStore from './store/configureStore';
import {Routes} from './Routes';

const {persistor, store} = configureStore();

const App = () => (
  <Provider store={store}>
    <PersistGate loading={<ActivityIndicator />} persistor={persistor}>
      <Routes />
    </PersistGate>
  </Provider>
);

export default App;
