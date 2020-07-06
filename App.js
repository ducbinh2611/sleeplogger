import React, { Component } from 'react';
import { AppRegistry, View, Image, StyleSheet, TextInput, Button } from 'react-native';
import SignUpContainer from './container/SignUpContainer';
import HomeContainer from './container/HomeContainer';
import LogInContainer from './container/LogInContainer';
import MainScreen from './tabs/MainScreen';
import DataScreen from './tabs/DataScreen';
import { StackNavigator } from 'react-navigation';
import AsyncStorage from '@react-native-community/async-storage';

export default class App extends React.Component {
    static navigationOptions = {
        title: "Home",
    }

    state={
        userLogIn: false,
    }

    componentWillMount() {
        this.getInitialScreen()
    }

    getInitialScreen= () => {
        AsyncStorage.getItem('token')
            .then(token => {
                if (token === null) {
                    console.log('token null')
                    this.setState({
                        userLogIn: false,
                    })
                } else {
                    console.log('token not null')
                    this.setState({
                        userLogIn: true,
                    })
                }
            })
            .catch(err => console.error(err))
    }

    render() {
        if (this.state.userLogIn === false) {
            return (
                <UserNotLogIn />
            )
        } else {
            return <UserLogIn />
        }
    }
    

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    }
})


const UserNotLogIn =  StackNavigator({
    
    LogInContainer: { 
        screen: LogInContainer 
    },
    SignUpContainer: { 
        screen: SignUpContainer 
    },
    MainScreen: {
        screen: MainScreen
    },
 }, {
        initialRouteName: 'LogInContainer'
    }
);

const UserLogIn =  StackNavigator({
    MainScreen: {
        screen: MainScreen
    },
    LogInContainer: { 
        screen: LogInContainer 
    },
    SignUpContainer: { 
        screen: SignUpContainer 
    },
    
 }, {
        initialRouteName: 'MainScreen'
    }
);
