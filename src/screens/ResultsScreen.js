import React,{Component} from 'react';
import { StyleSheet,View,RefreshControl,Text } from 'react-native'; 

import {SectionGrid} from 'react-native-super-grid';
import Card from 'components/Card';
import NavigationButtonsGroup from 'components/NavigationButtonsGroup';
import {withAppContextProvider,AppContext} from 'system/AppContext'; 
import {Results} from 'system/Cursors';


const ResultItem = ({item,onShowDetail}) => {
    return (
        <Card>
            <View style={styles.resultLeft}>
                <Text>Pos: {item.position}</Text>
                <Text>No:  {item.number}</Text>
            </View>
            <View style={styles.resultMiddle}>
                <View style={styles.resultPerson}>
                    <Text>Гонщик</Text>
                    <Text style={styles.resultTextLink} onPress={()=>onShowDetail('Гонщик',item.Driver)}>{item.Driver.givenName} {item.Driver.familyName}</Text> 
                </View>
                <View style={styles.resultPerson}>
                    <Text>Конструктор</Text>
                    <Text style={styles.resultTextLink} onPress={()=>onShowDetail('Конструктор',item.Constructor)}>{item.Constructor.name}</Text> 
                </View>
            </View>
            <View style={styles.resultRight}>
                <Text style={{fontSize:10}}>Q1:{' '}{item.Q1}</Text>
            </View>
        </Card>
    )
}

const ResultSection = ({section}) =>
    <View style={styles.sectionBgr}><Text style={styles.sectionTitle}>{section.title}</Text></View>

class ResultsScreen extends Component {

    static contextType = AppContext;

    state = {
        sections:[],
        cursor:null,
        loading:false
    }

    constructor(props) {
        super(props);
        this.results = new Results();
        this.unsubscribe = this.results.subj.subscribe(this.onItems);
    }

    componentDidMount = () => {
        this.onRefresh();
    }

    updateTitle = () => {
        if ( !this.state.cursor )
            return 'Загрузка...';
        this.props.navigation.setOptions({
            title:`Результаты - ${this.state.cursor.page+1} / ${this.state.cursor.pages}`
            ,headerRight:props => <NavigationButtonsGroup cursor={this.state.cursor} onMove={(dir) => this.onMove(dir)} />
        })
    }

    onItems = (data) => {
        const sections = data.items.map (race => ({
            title:`${race.raceName} ${race.date}`,
            data:race.QualifyingResults
        }))     
        this.setState({sections:sections,cursor:data.cursor,loading:false});
        this.updateTitle();
    }

    onMove = (direction) => {
        const page = this.state.cursor?.page || 0;
        this.setState({loading:true});
        const found = this.context.lookupCache(this.results,{page,direction});
        if ( found )
            return;
        this.results.move(page + direction);
    }

    onRefresh = () => {
        this.results.reset();
        this.onMove(0);
    }

    onShowDetail = (title,obj) => {
        this.props.navigation.push('DetailsScreen',{details:obj,title:title});
    //    console.log(item);
    }

    render() {
        return (
                <SectionGrid 
                    refreshing={this.state.loading}
                    itemDimension={600}
                    style={styles.flatGrid}
                    spacing={2}
                    sections={this.state.sections}
                    refreshControl={<RefreshControl size={RefreshControl.SIZE.LARGE} title="Обновление" refreshing={this.state.loading} onRefresh={this.onRefresh} />}
                    renderItem={({item,section}) => (<ResultItem item={item} onShowDetail={this.onShowDetail} />)}
                    renderSectionHeader={({section})=><ResultSection section={section} />}
                    />
        )
    }
}

const styles = StyleSheet.create({
    flatGrid: {
        marginTop:0,
        flex:1
    },
    sectionTitle:{
        textAlign:'center',
        fontWeight:'bold'
    },
    sectionBgr:{
        backgroundColor:'orange'
        ,height:48
        ,display:'flex'
        ,justifyContent:'center'
    },
    resultLeft:{
        width:60
    }
    ,resultMiddle:{
        flexGrow:1    
        ,alignItems:'flex-start'
    },
    resultPerson:{
        display:'flex',
        flexDirection:'row'
        ,alignContent:'center'
        ,justifyContent:'center'
        ,alignItems:'center'
        ,margin:5
    }
    ,resultTextLink:{
        textDecorationLine:'underline'
        ,paddingLeft:5
        ,color:'orange'
        ,fontWeight:'bold'
        
    }
})

export default withAppContextProvider(ResultsScreen); 