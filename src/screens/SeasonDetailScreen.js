import React,{Component} from 'react';
import { Linking,RefreshControl } from 'react-native'; 
import {SectionGrid} from 'react-native-super-grid';
import {StyleSheet,View,Text} from 'react-native';

import {withAppContextProvider} from 'system/AppContext'; 
import {SeasonDetails} from 'system/Cursors';
import NavigationButtonsGroup from 'components/NavigationButtonsGroup';
import Card from 'components/Card';

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

class SessionDetailScreen extends Component {

    state = {
        items:[],
        cursor:null,
        loading:false,
        season:{}
    }

    constructor(props) {
        super(props);
        const season = props.route.params.season;
        this.details = new SeasonDetails(season.season);
        this.unsubscribe = this.details.subj.subscribe(this.onItems);
    }

    componentDidMount = () => {
        this.onRefresh();
    }

    onItems = (data) => {
        const sections = [{
            title:this.props.route.params.season.season
           ,data:data.items
       }]
       this.setState(state => ({
           items:sections
           ,cursor:data.cursor
           ,loading:false
       }));
    }

    updateTitle = () => {
        if ( !this.state.cursor )
            return 'Загрузка...';
        this.props.navigation.setOptions({
            title:`Детализация - ${this.state.cursor.page+1} / ${this.state.cursor.pages}`
            ,headerRight:props => <NavigationButtonsGroup onMove={(dir) => this.onMove(dir)} />            
        })
    }

    onMove = (direction) => {
        const page = this.state.cursor?.page || 0;
        this.setState({loading:true});
        this.details.move(page + direction);
    }

    onRefresh = () => {
        this.details.reset();
        this.onMove(0);
    }

    render() {
        return (
                <SectionGrid 
                    refreshing={this.state.loading}
                    itemDimension={600}
                    style={styles.flatGrid}
                    spacing={2}
                    sections={this.state.items}
                    refreshControl={<RefreshControl size={RefreshControl.SIZE.LARGE} title="Обновление" refreshing={this.state.loading} onRefresh={this.onRefresh} />}
                    renderSectionHeader={({section})=><RaceHeader section={section} />}
                    renderItem={({item}) => (<RaceItem item={item} />)}
                    />
        )
    }
}

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

export default withAppContextProvider(SessionDetailScreen); 