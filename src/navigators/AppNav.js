import React, { useContext } from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {
    createDrawerNavigator,
    DrawerContentScrollView,
    DrawerItemList,
    DrawerItem,
  } from '@react-navigation/drawer';
import FaIcon from 'react-native-vector-icons/FontAwesome5';

import {View,Text} from 'react-native';

import SeasonsNav from 'navigators/SeasonsNav';
import ResultsNav from 'navigators/ResultsNav';
import ConstructorsNav from 'navigators/ConstructorsNav'


const Logo = (props) => 
    <View>
        <Text>Ergast - запросы</Text>
    </View>


const DrawerContent = (props) => {
    return (
        <DrawerContentScrollView {...props}>
            <DrawerItem label={(props)=><Logo {...props}  />} />
            <DrawerItemList {...props} />
        </DrawerContentScrollView>
    )
}

const Drawer = createDrawerNavigator();
const MainDrawer = (props) => {
    return (
        <Drawer.Navigator  
            drawerContent={props => <DrawerContent {...props} />} 
            initialRouteName="Seasons"
            drawerStyle={{backgroundColor:'rgba(255,255,255,1)'}}
            >
                <Drawer.Screen name="Seasons" options={{
                        title:'Сезоны',
                        drawerIcon:({color,focused,size})=><FaIcon name="calendar" size={size} color={color} />
                    }} component={SeasonsNav}  />

                <Drawer.Screen name="Results" options={{
                        title:'Результаты',
                        drawerIcon:({color,focused,size})=><FaIcon name="flag" size={size} color={color} />
                    }} component={ResultsNav}  />

                <Drawer.Screen name="Constructors" options={{
                        title:'Конструкторы',
                        drawerIcon:({color,focused,size})=><FaIcon name="wrench" size={size} color={color} />
                    }} component={ConstructorsNav}  />

        </Drawer.Navigator>
    )
}

export default (props) =>
    <NavigationContainer {...props}>
        <MainDrawer {...props} />
    </NavigationContainer>
