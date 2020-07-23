import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import SignUpContainer from './container/SignUpContainer';
import LogInContainer from './container/LogInContainer';
import MainScreen from './tabs/MainScreen';
import EditProfileContainer from './container/EditProfileContainer'
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
        console.disableYellowBox = true;

    }

    getInitialScreen= () => {
        AsyncStorage.getItem('token')
            .then(token => {
                if (token === null) {
                    this.setState({
                        userLogIn: false,
                    })
                } else {
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
    EditProfileContainer: {
        screen: EditProfileContainer
    }
 }, {
        initialRouteName: 'LogInContainer',
        gesturesEnabled: false,
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
    EditProfileContainer: {
        screen: EditProfileContainer
    }
 }, {
        initialRouteName: 'MainScreen',
        gesturesEnabled: false,
    }
);
