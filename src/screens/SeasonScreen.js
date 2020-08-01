import React,{useEffect} from 'react';
import { StyleSheet,View,TouchableOpacity,Linking,RefreshControl,Text } from 'react-native'; 
import FaIcon from 'react-native-vector-icons/FontAwesome5';
import {FlatGrid} from 'react-native-super-grid';
import { connect } from 'react-redux';

import NavigationButtonsGroup from 'components/NavigationButtonsGroup';
import Card from 'components/Card';
import seasonsActions from 'store/domains/seasons/seasonsActions';

const SeasonItem = ({item,onShowDetail}) => {
    return (
        <Card>
            <View style={styles.seasonItem}>
                <View>
                    <Text style={styles.link} onPress={() => Linking.openURL(item.url)}>{item.season}</Text> 
                </View>
                <View style={styles.detailButton}>
                    <TouchableOpacity onPress={()=> onShowDetail(item)}>
                        <FaIcon size={16} name="eye" />
                    </TouchableOpacity>
                </View>
            </View>
        </Card>
    )
}

const SeasonScreen = ({cursor,error,seasons,reset,move,navigation}) => {

    useEffect(()=>{
        if ( !seasons.length )
            move(0);
    },[])

    useEffect(()=>{
        navigation.setOptions({
            title:`Сезоны - ${cursor.page+1} / ${cursor.pages}`
           ,headerRight:props => <NavigationButtonsGroup cursor={cursor} onMove={move} />            
       })
   })

    const onShowDetail = (season) => navigation.push('SeasonDetailScreen',{season})
    
    return (
        <FlatGrid 
            refreshing={cursor.loading}
            itemDimension={80}
            style={styles.flatGrid}
            spacing={2}
            data={seasons}
            refreshControl={<RefreshControl size={RefreshControl.SIZE.LARGE} title="Обновление" refreshing={cursor.loading} onRefresh={() => reset()} />}
            renderItem={({item}) => (<SeasonItem item={item} onShowDetail={onShowDetail} />)}
        />
    )
}


const mapStateToProps = (state) => {
    const {seasons,cursor,error} = state.seasonsReducers;
    if ( error )
        throw new Error(error.message)
    return {
        seasons,
        cursor
    }
}

const mapDispatchToProps = (dispatch,props) => {
    return {
         move: (direction) => dispatch(seasonsActions.navigate(direction))
        ,reset: () => dispatch(seasonsActions.reset())
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(SeasonScreen);


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
    ,seasonItem:{
        display:'flex'
        ,alignItems:'center'
        ,justifyContent:'center'
        ,flexDirection:'row'
        ,padding:0
    }
    ,detailButton:{
        paddingLeft:10,
        paddingRight:10
    }
})

