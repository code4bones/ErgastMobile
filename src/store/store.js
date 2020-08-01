import AsyncStorage from '@react-native-community/async-storage';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

// import { createLogger } from 'redux-logger';
import {persistStore, persistReducer } from 'redux-persist';
import stateReconciler from 'redux-persist/lib/stateReconciler/autoMergeLevel2'

import rootReducer from 'store/reducers';


const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  stateReconciler:stateReconciler,
  /*
  whitelist: [
      'seasonsReducers',
      'seasonDetailsReducers',
      'resultsReducers'
  ]
  */
};

const persistedReducer = persistReducer(persistConfig,rootReducer);
const store = createStore(
  persistedReducer,
  applyMiddleware(
   // createLogger()
    thunk
  ),
);

const persistor = persistStore(store);
export {
  store,
  persistor
};