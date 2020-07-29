/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  StatusBar,
} from 'react-native';

import AppNav from 'navigators/AppNav';

//console.disableYellowBox = true

const App = () => 
  <>
    <AppNav />
    <StatusBar backgroundColor="black" barStyle="light-content" translucent={true} hidden={false} />
  </>  



export default App;
