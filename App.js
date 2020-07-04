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


    render() {
        
        return (
            <View style={styles.container}>
                <NavigationApp />
            </View>
        )
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    }
})

const NavigationApp =  StackNavigator({
    
    LogInContainer: { 
        screen: LogInContainer 
    },
    SignUpContainer: { 
        screen: SignUpContainer 
    },
    MainScreen: {
        screen: MainScreen
    },
});

