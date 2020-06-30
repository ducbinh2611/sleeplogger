import React, { Component } from 'react';
import FirstScreen from './FirstScreen';
import SecondScreen from './SecondScreen';
import TargetScreen from './TargetScreen';
import TipScreen from './TipScreen';
import { TabNavigator } from 'react-navigation';
import moment from 'moment';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';

var MainScreen = TabNavigator({
    Diary: { screen: FirstScreen },
    Target: { screen: TargetScreen },
    Tip: { screen: TipScreen},
    Data: { screen: SecondScreen },
}, {
    tabBarPosition: 'bottom',
    swipeEnabled: true,
    tabBarOptions: {
        activeTintColor: 'orange',
        // activeBackgroundColor: 'grey',
        inactiveTintColor: 'black',
        // inactiveBackgroundColor: 'green',
        labelStyle: {
            fontSize: 16,
            padding: 2,
        },
        style: {
            backgroundColor: 'white',
            position: 'absolute',
            borderTopRightRadius: 20,
            borderTopLeftRadius: 20,
            left: 0,
            bottom: 0,
            right: 0
        }
    }
});
// const Tab = createBottomTabNavigator();


// const MainScreen = () => (
//     <NavigationContainer>
//         <Tab.Navigator
//         initialRouteName="Diary"
//         tabBarOptions={{
//             activeTintColor: '#e91e63',
//         }}
//         >
//         <Tab.Screen
//             name="Diary"
//             component={FirstScreen}
//             options={{
//             tabBarLabel: 'Diary',
//             tabBarIcon: ({ color, size }) => (
//                 <Icon name="ios-home" color={color} size={size} />
//             ),
//             }}
//         />
//         <Tab.Screen
//             name="Target"
//             component={TargetScreen}
//             options={{
//             tabBarLabel: 'Target',
//             tabBarIcon: ({ color, size }) => (
//                 <Icon name="ios-notifications" color={color} size={size} />
//             ),
//             }}
//         />
//         <Tab.Screen
//             name="Data"
//             component={SecondScreen}
//             options={{
//             tabBarLabel: 'Data',
//             tabBarIcon: ({ color, size }) => (
//                 <Icon name="ios-person" color={color} size={size} />
//             ),
//             }}
//         />
//         </Tab.Navigator>
//     </NavigationContainer>
// );
const date = moment(new Date()).format('MMMM Do YYYY');

MainScreen.navigationOptions = {
    title: date,
    headerLeft: null,
    headerTitleStyle: {
        color: 'white'
    },

    //header: null,
    //headerMode: 'none'
};



export default MainScreen;