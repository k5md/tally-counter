import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import BootSplash from "react-native-bootsplash";
import configureStore from './store/configureStore';
import { Routes } from './Routes';

const { persistor, store } = configureStore();

const App = () => {
  useEffect(() => {
    BootSplash.hide({ fade: true });
  }, []);

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <Routes />
      </PersistGate>
    </Provider>
  );
};

export default App;
