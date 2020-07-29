import React from 'react';
import {StyleSheet} from 'react-native';
import {View} from 'react-native';

const Card = ({children}) => 
  <View style={styles.card}>
      {children}
 </View>

const styles = StyleSheet.create({
    card:{
        margin:2
        ,padding:5
        ,marginVertical: 5,
        marginHorizontal: 2,
        borderWidth: 1,
        borderRadius: 2,
        borderColor: 'white',
        flexWrap: 'nowrap',
        backgroundColor: 'white',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 1.5,
        elevation: 3,
        flex:1,
        flexDirection: 'row',
        alignItems: 'center'

    }
})

export default Card;