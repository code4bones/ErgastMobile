import React,{useEffect,useState} from 'react';
import {Linking,Text,StyleSheet,View} from 'react-native';

export default SimpleJSONScreen = ({route,navigation}) => {
    const [keys,setKeys] = useState([]);
    const [details,setDetails] = useState([]);

    useEffect(()=>{
        const {details,title} = route.params;
        const keys = Object.keys(details);
        setKeys(keys);
        setDetails(details);
        navigation.setOptions({
            title
        })
    },[])

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

