import React,{Component} from 'react';
import { StyleSheet,View,TouchableOpacity,Linking,RefreshControl,Text } from 'react-native'; 
import FaIcon from 'react-native-vector-icons/FontAwesome5';
import {FlatGrid} from 'react-native-super-grid';

import {Seasons} from 'system/Cursors';
import NavigationButtonsGroup from 'components/NavigationButtonsGroup';
import Card from 'components/Card';
import { AppContext,withAppContextProvider } from 'system/AppContext';

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

class SessionScreen extends Component {

    static contextType = AppContext;

    state = {
        items:[],
        cursor:null,
        loading:false
    }

    constructor(props) {
        super(props);
        this.seasons = new Seasons();
        this.unsubscribe = this.seasons.subj.subscribe(this.onItems);
    }

    componentDidMount = () => {
        this.onRefresh();
    }

    componentWillUnmount = () => {
    }

    onItems = (data) => {
        if ( !data )
            return; 
        this.setState({items:data.items,cursor:data.cursor,loading:false,error:data.error},()=>{
            this.updateTitle();
        });
    }

    updateTitle = () => {
        if ( !this.state.cursor )
            return 'Загрузка...';
        this.props.navigation.setOptions({
             title:`Сезоны - ${this.state.cursor.page+1} / ${this.state.cursor.pages}`
            ,headerRight:props => <NavigationButtonsGroup cursor={this.state.cursor} onMove={(dir) => this.onMove(dir)} />            
        })
    }

    onMove = (direction) => {
        const page = this.state.cursor?.page || 0;
        this.setState({loading:true});
        const found = this.context.lookupCache(this.seasons,{page,direction});
        if ( found )
            return;
        this.seasons.move(page + direction);
    }

    onRefresh = () => {
        this.seasons.reset();
        this.onMove(0);
    }

    onShowDetail = (item) => {
        console.log("Detail",item)
        this.props.navigation.push('SeasonDetailScreen',{season:item})
    }

    render() {
        return (
                <FlatGrid 
                    refreshing={this.state.loading}
                    itemDimension={80}
                    style={styles.flatGrid}
                    spacing={2}
                    data={this.state.items}
                    refreshControl={<RefreshControl size={RefreshControl.SIZE.LARGE} title="Обновление" refreshing={this.state.loading} onRefresh={this.onRefresh} />}
                    renderItem={({item}) => (<SeasonItem item={item} onShowDetail={this.onShowDetail} />)}
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

export default withAppContextProvider(SessionScreen); 