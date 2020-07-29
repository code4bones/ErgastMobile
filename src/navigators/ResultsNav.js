import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import MenuButton from 'components/MenuButton';
import {screenOptions} from './common';
import ResultsScreen from 'screens/ResultsScreen';
import SimpleJSONScreen from 'screens/SimpleJSONScreen';

const ResultsStack = createStackNavigator();
const ResultsNav  = ({app,navigation,route}) =>
  <ResultsStack.Navigator initialRouteName="ResultScreen" screenOptions={screenOptions}>
     
    <ResultsStack.Screen 
        options={({route})=>{
            return {
                title:'Результаты',
                headerLeft:props => (
                    <MenuButton onPress={()=>navigation.toggleDrawer()} />
                ),
            }
        }}
      name="ResultScreen" component={ResultsScreen} />

    <ResultsStack.Screen 
        options={({route})=>{
            return {
                title:'Информация',
                headerLeft:props => (
                    <MenuButton onPress={()=>navigation.toggleDrawer()} />
                ),
            }
        }}
      name="DetailsScreen" component={SimpleJSONScreen} />


  </ResultsStack.Navigator>

export default ResultsNav;