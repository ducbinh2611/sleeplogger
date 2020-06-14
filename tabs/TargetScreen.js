import React from 'react';
import {Text, View, Button, Image, Modal, TouchableWithoutFeedback, StyleSheet } from 'react-native';
import { MateirialIcons } from '@expo/vector-icons';
import { TabNavigator } from 'react-navigation';
import TimePicker from '../component/TimePicker';
import Icon from 'react-native-vector-icons/FontAwesome';

class TargetScreen extends React.Component {
    static navigationOptions= {
        tabBarLabel: 'Target',
        tabBarIcon: ({color}) => (
            <Icon name='bell' color={color} size={20} />
        )

    }

    constructor(props) {
        super(props)
        this.state= {
            targetTime: ''
        }
    }
    render() {
        return (
            <View
                style={styles.container}
            >
                <TimePicker
                    style={styles.question}
                    question={'Tonight I want to go to bed at'}
                >

                </TimePicker>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column'
    },
    question: {
        marginTop: 20,
        marginBottom: 20,
    },

})

export default TargetScreen