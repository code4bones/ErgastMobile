import React,{Component} from 'react';
import {Linking,Text,StyleSheet,View} from 'react-native';
import {withAppContextProvider} from 'system/AppContext'; 

class SimpleJSONScreen extends Component {

    state = {
        details:{}
        ,title:''
    }

    componentDidMount = () => {
        console.log("Details",this.props.route.params);
        const {details,title} = this.props.route.params;
        this.setState({details,title});
        this.props.navigation.setOptions({
            title
        })
    }


    render() {
        const {details} = this.state;
        const keys = Object.keys(details);
        return (
            <View style={styles.view}>
                {
                    keys.map((key,idx)=>{
                        return (
                            <View key={key} style={styles.itemView}>
                                <View style={styles.itemKeyView}>
                                    <Text style={styles.itemKey}>{key}</Text>
                                </View>
                                <View style={styles.itemValueView}>
                                    {key === 'url' 
                                        ?
                                        <Text style={[styles.itemValue,styles.link]} onPress={()=>Linking.openURL(details[key])}>{details[key]}</Text>
                                        :
                                        <Text style={styles.itemValue}>{details[key]}</Text>
                                    }
                                </View>
                            </View>
                        )
                    })
                }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    view:{
        flex:1,
        margin:10
    },
    itemView:{
        display:'flex',
        flexDirection:'row',
        margin:10,
        alignContent:'center'
    },
    itemKeyView:{
        paddingRight:10
        ,flexGrow:1
    },
    itemKey:{
        fontSize:20        
    },
    itemValue:{
        fontSize:20
    },

    link:{
         textDecorationLine:'underline'
        ,paddingLeft:5
        ,color:'orange'
        ,fontWeight:'bold'
    }
})

export default withAppContextProvider(SimpleJSONScreen); 