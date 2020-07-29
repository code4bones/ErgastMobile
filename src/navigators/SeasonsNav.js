import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import SeasonScreen from 'screens/SeasonScreen';
import SeasonDetailScreen from 'screens/SeasonDetailScreen';
import MenuButton from 'components/MenuButton';
import {screenOptions} from './common';

const SeasonStack = createStackNavigator();

const SeasonNav = ({app,navigation,route}) =>
  <SeasonStack.Navigator initialRouteName="SeasonScreen" screenOptions={screenOptions}>
      <SeasonStack.Screen 
        options={({route})=>{
            return {
                title:'Cезоны',
                headerLeft:props => (
                    <MenuButton onPress={()=>navigation.toggleDrawer()} />
                ),
            }
        }}
      name="SeasonScreen" component={SeasonScreen} />

    <SeasonStack.Screen 
        options={({route})=>{
            return {
                title:'Детализация',
                headerLeft:props => (
                    <MenuButton onPress={()=>navigation.toggleDrawer()} />
                ),
            }
        }}
      name="SeasonDetailScreen" component={SeasonDetailScreen} />


  </SeasonStack.Navigator>

export default SeasonNav;