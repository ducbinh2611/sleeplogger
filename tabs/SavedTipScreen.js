import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

class SavedTipScreen extends React.Component {
    static navigationOptions = ({ navigation }) => {
        return {
           header: () => null
        } 
    }

    handleBackButton = () => {
        this.props.navigation.navigate('DataScreen')
    }

    render() {
        return (
            <View>
                <Text>
                    Hi
                </Text>
                <Button title='Go back' onPress= {this.handleBackButton}/>
            </View>
        )
    }
}

export default SavedTipScreen;