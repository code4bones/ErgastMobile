import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import ConstructorsScreen from 'screens/ConstructorsScreen';
import MenuButton from 'components/MenuButton';
import {screenOptions} from './common';

const ConstructorsStack = createStackNavigator();
const ConstructorsNav = ({app, navigation, route}) => (
  <ConstructorsStack.Navigator
    initialRouteName="ConstructorsScreen"
    screenOptions={screenOptions}>
    <ConstructorsStack.Screen
      options={({route}) => {
        return {
          title: 'Конструкторы',
          headerLeft: (props) => (
            <MenuButton onPress={() => navigation.toggleDrawer()} />
          ),
        };
      }}
      name="ConstructorsScreen"
      component={ConstructorsScreen}
    />
  </ConstructorsStack.Navigator>
);

export default ConstructorsNav;
