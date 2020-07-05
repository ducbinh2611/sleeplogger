import React, { Component } from 'react';
import FirstScreen from './FirstScreen';
import SecondScreen from './SecondScreen';
import TargetScreen from './TargetScreen';
import TipScreen from './TipScreen';
import { TabNavigator } from 'react-navigation';
import moment from 'moment';
import { View, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Icon from 'react-native-vector-icons/SimpleLineIcons';

var MainScreenStack = TabNavigator({
    Diary: { screen: FirstScreen },
    Target: { screen: TargetScreen },
    Tip: { screen: TipScreen },
    Data: { screen: SecondScreen },
}, {
    tabBarPosition: 'bottom',
    swipeEnabled: false,
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
class MainScreen extends React.Component {
    static navigationOptions = ({ navigation }) => {
        return {
            title: moment(new Date()).format('MMMM Do YYYY'),
            headerLeft: null,
            headerRight: (
                <View style={{ marginRight: 20 }}>
                    <TouchableOpacity
                        onPress={() => {
                            Alert.alert('Log Out',
                                'Are you sure you want to log out?',
                                [{
                                    text: 'Yes', onPress: () => {
                                        
                                        AsyncStorage.removeItem('token')
                                            .then(() => {
                                                navigation.navigate('LogInContainer')
                                            })
                                            .catch(err => console.error(err))
                                    }
                                },
                                { text: 'No' }])

                        }}
                    >
                        <Icon name={'logout'} size={20} color={'white'} />
                    </TouchableOpacity>
                </View>
            ),
            headerTitleStyle: {
                color: 'white'
            },
            headerStyle: {
                backgroundColor: '#9C51B6'
            },
            screenOptions: {
                gestureEnabled: true,
                gestureDirection: "horizontal",

            },
        }
    }


    render() {

        return (
            <MainScreenStack />
        )
    }
}

// MainScreen.navigationOptions = {
//     title: date,
//     headerLeft: null,
//     headerRight: (
//         <Button
//             onPress={({ props }) => console.warn(props)}
//             title="Info"
//             color="white"
//         />
//     ),
//     headerTitleStyle: {
//         color: 'white'
//     },
//     screenOptions: {
//         gestureEnabled: true,
//         gestureDirection: "horizontal",

//     },
// };



export default MainScreen;