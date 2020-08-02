/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View} from 'react-native';
import FaIcon from 'react-native-vector-icons/FontAwesome5';

const NavigationButtonsGroup = ({onMove, cursor}) => (
  <View style={{display: 'flex', flexDirection: 'row', paddingRight: 0}}>
    {cursor && cursor.page > 0 && (
      <FaIcon.Button
        name="arrow-left"
        size={25}
        style={{color: '#ffffff', paddingRight: 15}}
        onPress={() => onMove(-1)}
      />
    )}
    {cursor && cursor.page + 1 < cursor.pages && (
      <FaIcon.Button
        name="arrow-right"
        size={25}
        style={{color: '#ffffff'}}
        onPress={() => onMove(1)}
      />
    )}
  </View>
);

export default NavigationButtonsGroup;
