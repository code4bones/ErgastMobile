import React,{useEffect} from 'react';
import { Linking,RefreshControl } from 'react-native'; 
import {SectionGrid} from 'react-native-super-grid';
import {StyleSheet,View,Text} from 'react-native';

import NavigationButtonsGroup from 'components/NavigationButtonsGroup';
import Card from 'components/Card';
import { connect } from 'react-redux';
import seasonsDetailsActions from 'store/domains/seasons/seasonsDetailsActions';


const RaceHeader = ({section}) => 
    <View style={styles.raceHeader}>
        <Text style={styles.reaceHeaderTitle}>{section.title}</Text>
    </View>

const RaceItem = ({item}) => {
    const {raceName,round,url,date,Circuit} = item;
    const {circuitName,Location} = Circuit;
    return (
        <Card>
            <View style={styles.seasonItem}>
                <View style={styles.circuitLeft}>
                    <View>
                        <Text>Race on {date}</Text>
                        <Text style={styles.link} onPress={()=>Linking.openURL(url)}>{raceName}</Text> 
                    </View>
                    <View>
                        <Text>Circuit round №{round}</Text>
                        <Text style={styles.link} onPress={()=>Linking.openURL(Circuit.url)}>{circuitName}</Text>
                    </View>
                </View>
                <View style={styles.circuitRight}>
                    <View>
                        <Text style={styles.link} onPress={()=>Linking.openURL(`https://www.google.com/maps/search/?api=1&query=${Location.lat},${Location.long}`)}>{Location.locality}</Text>
                    </View>
                    <View>
                        <Text>{Location.country}</Text>
                    </View>
                </View>
            </View>
        </Card>
    )
}

const SessionDetailScreen = ({cursor,details,reset,move,navigation,route,detailsForSeason}) => {

    useEffect(()=>{
        const season = route.params.season;
        detailsForSeason(season);
    },[])


    useEffect(()=>{
        navigation.setOptions({
            title:`Детализация - ${cursor.page+1} / ${cursor.pages}`
            ,headerRight:props => <NavigationButtonsGroup cursor={cursor} onMove={move} />            
        })
    })


    return (
        <SectionGrid 
            refreshing={cursor.loading}
            itemDimension={600}
            style={styles.flatGrid}
            spacing={2}
            sections={details}
            refreshControl={<RefreshControl size={RefreshControl.SIZE.LARGE} title="Обновление" refreshing={cursor.loading} onRefresh={reset} />}
            renderSectionHeader={({section})=><RaceHeader section={section} />}
            renderItem={({item}) => (<RaceItem item={item} />)}
            />
    )
}


const mapStateToProps = (state) => {
    const {details,cursor,error} = state.seasonDetailsReducers;
    if ( error )
        throw new Error(error.message)
    return {
        details,
        cursor
    }
}

const mapDispatchToProps = (dispatch,props) => {
    return {
        detailsForSeason: (season) => dispatch(seasonsDetailsActions.detailsForSeason(season))
        ,move: (direction) => dispatch(seasonsDetailsActions.navigate(direction))
    }
}


export default connect(mapStateToProps,mapDispatchToProps)(SessionDetailScreen);


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
    ,raceHeader:{
        height:48
        ,display:'flex'
        ,justifyContent:'center'
        ,alignItems:'center'
    }
    ,reaceHeaderTitle:{
        fontWeight:'bold'
        ,fontSize:24
    }
    ,circuitLeft:{
        display:'flex',
        flexDirection:'column'
        ,flexGrow:1
    }
    ,circuitRight:{
        display:'flex',
        flexDirection:'column'
        ,alignItems:'flex-end'
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

//export default withAppContextProvider(SessionDetailScreen); 
