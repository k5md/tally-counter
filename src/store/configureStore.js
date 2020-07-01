/* global __DEV__:true */

import { createStore, compose, applyMiddleware } from 'redux';
import { persistStore, persistCombineReducers } from 'redux-persist';
import createSagaMiddleware from 'redux-saga';
import AsyncStorage from '@react-native-community/async-storage';
import { createLogger } from 'redux-logger';
import rootReducers from '../reducers';
import rootSaga from '../sagas';

const config = {
  key: 'not-root', // refer to redux-persist issue on rp converting arrays in root storage to plain objects
  storage: AsyncStorage,
  debug: __DEV__,
};

const sagaMiddleware = createSagaMiddleware(rootSaga);
const middleware = [sagaMiddleware];

if (__DEV__) {
  middleware.push(createLogger());
}

const reducers = persistCombineReducers(config, rootReducers);
const enhancers = [applyMiddleware(...middleware)];
const persistConfig = { enhancers };

export const store = createStore(reducers, undefined, compose(...enhancers));
const persistor = persistStore(store, persistConfig, () => {});
const configureStore = () => ({ persistor, store });

sagaMiddleware.run(rootSaga);

export default configureStore;
