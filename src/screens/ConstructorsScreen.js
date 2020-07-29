import React,{Component} from 'react';
import {StyleSheet, Linking,RefreshControl,Text,View } from 'react-native'; 


import {FlatGrid} from 'react-native-super-grid';

import {Constructors} from 'system/Cursors';
import NavigationButtonsGroup from 'components/NavigationButtonsGroup';
import { AppContext,withAppContextProvider } from 'system/AppContext';
import Card from 'components/Card';

const ConstructorItem = ({item,onShowDetail}) => {
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

class ConstructorsScreen extends Component {

    static contextType = AppContext;

    state = {
        items:[],
        cursor:null,
        loading:false
    }

    constructor(props) {
        super(props);
        this.ctors = new Constructors();
        this.unsubscribe = this.ctors.subj.subscribe(this.onItems);
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
             title:`Конструкторы - ${this.state.cursor.page+1} / ${this.state.cursor.pages}`
            ,headerRight:props => <NavigationButtonsGroup cursor={this.state.cursor} onMove={(dir) => this.onMove(dir)} />            
        })
    }

    onMove = (direction) => {
        const page = this.state.cursor?.page || 0;
        // dummy
        this.setState({loading:true});
        const found = this.context.lookupCache(this.ctors,{page,direction});
        if ( found )
            return;
        this.ctors.move(page + direction);
    }

    onRefresh = () => {
        this.ctors.reset();
        this.onMove(0);
    }

    onShowDetail = (item) => {
        console.log("Detail",item)
        //this.props.navigation.push('SeasonDetailScreen',{season:item})
    }

    render() {
        return (
                <FlatGrid 
                    refreshing={this.state.loading}
                    itemDimension={130}
                    style={styles.flatGrid}
                    spacing={2}
                    data={this.state.items}
                    refreshControl={<RefreshControl size={RefreshControl.SIZE.LARGE} title="Обновление" refreshing={this.state.loading} onRefresh={this.onRefresh} />}
                    renderItem={({item}) => (<ConstructorItem item={item} />)}
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
    ,viewItem:{
        display:'flex'
        ,alignItems:'center'
        ,justifyContent:'flex-start'
        ,flexDirection:'row'
        ,padding:0
    }
})

export default withAppContextProvider(ConstructorsScreen); 