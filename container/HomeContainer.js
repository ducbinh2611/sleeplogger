import {  Header, Text, View, Image, StyleSheet, TextInput, KeyboardAvoidingView, TouchableOpacity } from 'react-native';
import React, {Component} from 'react';
import LogInButton from '../component/LogInButton';
import LogInContainer from '../container/LogInContainer';
import SignUpContainer from '../container/SignUpContainer';
import { StackNavigator, withNavigation } from 'react-navigation'; 





class HomeContainer extends React.Component {
    

    render() {
        
        const { navigation } = this.props
        console.log(navigation)
        return (
              
            <View style={styles.container}>
                
                
                <Text style={styles.logo}>
                    SLEEPLOGGER
                </Text>

                <Text style={styles.text}>
                    Your sleep diary is here!
                </Text>

                <LogInButton 
                    style={styles.button}
                    onPress={() => navigation.navigate('LogInContainer')}>
                        Log In
                </LogInButton>

                <Text style={styles.noAccount}>
                    Don't have an account?
                </Text>

                <LogInButton 
                    style={styles.button}
                    onPress={() => navigation.navigate('SignUpContainer')}>
                        Sign Up 
                </LogInButton>
            </View>
        
        )
    }  
} 

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    logo: {
        fontSize: 30,
    },
    text: {
        marginBottom: 40,
        fontSize: 20,
    },
    noAccount: {
        marginTop:20,
        fontSize:20,
    },
    button: {
        marginTop:10,
        marginBottom:20,
    }
})



export default HomeContainer