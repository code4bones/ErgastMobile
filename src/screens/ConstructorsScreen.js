import React,{useEffect} from 'react';
import {StyleSheet, Linking,RefreshControl,Text,View } from 'react-native'; 


import {FlatGrid} from 'react-native-super-grid';

import NavigationButtonsGroup from 'components/NavigationButtonsGroup';
import Card from 'components/Card';

import { connect } from 'react-redux';
import constructorsActions from 'store/domains/constructors/constructorsActions';

const ConstructorItem = ({item}) => {
    return (
        <Card>
            <View style={styles.viewItem}>
                <View>
                    <Text style={styles.link} onPress={() => Linking.openURL(item.url)}>{item.name}</Text> 
                    <Text>{item.nationality}</Text> 
                </View>
            </View>
        </Card>
    )
}

const ConstructorsScreen = ({cursor,constructors,reset,move,navigation}) => {
    
    useEffect(()=>{
        if ( !constructors.length )
            move(0);
    },[])

    useEffect(()=>{
        navigation.setOptions({
            title:`Конструкторы - ${cursor.page+1} / ${cursor.pages}`
           ,headerRight:props => <NavigationButtonsGroup cursor={cursor} onMove={move} />            
       })
      })
      
    return (
        <FlatGrid 
            refreshing={cursor.loading}
            itemDimension={130}
            style={styles.flatGrid}
            spacing={2}
            data={constructors}
            refreshControl={<RefreshControl size={RefreshControl.SIZE.LARGE} title="Обновление" refreshing={cursor.loading} onRefresh={reset} />}
            renderItem={({item}) => (<ConstructorItem item={item} />)}
            />
    )

}


const mapStateToProps = ({constructorsReducers}) => {
    const {constructors,cursor,error} = constructorsReducers;
    if ( error )
        throw new Error(error.message)
    return {
        constructors,
        cursor
    }
}

const mapDispatchToProps = (dispatch,props) => {
    return {
         move: (direction) => dispatch(constructorsActions.navigate(direction))
        ,reset: () => dispatch(constructorsActions.reset())
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(ConstructorsScreen);



const styles = StyleSheet.create({
    flatGrid: {
        marginTop:0,
        flex:1
    },
    link:{
         textDecorationLine:'underline'
        ,paddingLeft:5
        ,color:'orange'
        ,fontWeight:'bold'
    }
    ,viewItem:{
        display:'flex'
        ,alignItems:'center'
        ,justifyContent:'flex-start'
        ,flexDirection:'row'
        ,padding:0
    }
})

//export default withAppContextProvider(ConstructorsScreen); 