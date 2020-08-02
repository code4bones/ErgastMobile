/* eslint-disable react-native/no-inline-styles */
import React from 'react';

import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {store, persistor} from 'store/store';
import {View, Text} from 'react-native';

const Loading = () => (
  <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
    <Text style={{fontSize: 24, fontWeight: '900'}}>Загрузка...</Text>
  </View>
);

export const withStoreProvider = (ChildComponent) => (props) => {
  return (
    <Provider store={store}>
      <PersistGate loading={<Loading />} persistor={persistor}>
        <ChildComponent {...props} store={store} />
      </PersistGate>
    </Provider>
  );
};
