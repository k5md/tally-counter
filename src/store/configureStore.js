/* global __DEV__:true */

import {createStore, compose, applyMiddleware} from 'redux';
import {persistStore, persistCombineReducers} from 'redux-persist';
import storage from 'redux-persist/es/storage';
import {createLogger} from 'redux-logger';
import rootReducers from '../reducers';

const config = {
  key: 'root',
  storage,
  debug: __DEV__,
};

const middleware = [];

if (__DEV__) {
  middleware.push(createLogger());
}

const reducers = persistCombineReducers(config, rootReducers);
const enhancers = [applyMiddleware(...middleware)];
const persistConfig = {enhancers};
const store = createStore(reducers, undefined, compose(...enhancers));
const persistor = persistStore(store, persistConfig, () => {});
const configureStore = () => ({persistor, store});

export default configureStore;
