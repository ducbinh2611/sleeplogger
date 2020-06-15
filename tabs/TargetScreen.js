import React from 'react';
import {Text, View, Button, Image, Modal, TouchableWithoutFeedback, StyleSheet } from 'react-native';
import { MateirialIcons } from '@expo/vector-icons';
import { TabNavigator } from 'react-navigation';
import TimePicker from '../component/TimePicker';
import Icon from 'react-native-vector-icons/FontAwesome';
import {notificationManager} from '../Notification/NotificationManager';
import { TouchableOpacity } from 'react-native-gesture-handler';
import moment from 'moment';

class TargetScreen extends React.Component {
    static navigationOptions= {
        tabBarLabel: 'Target',
        tabBarIcon: ({color}) => (
            <Icon name='bell' color={color} size={20} />
        )

    }

    constructor(props) {
        super(props)
        this.localNotify = null,
        this.state= {
            targetTime: null
        }
    }

    componentDidMount() {
        this.localNotify = notificationManager
        this.localNotify.configure()
        console.warn(notificationManager)
    }

    handleTimePicker = (date) => {
        this.setState({
            targetTime: date
        })
    }

    onPressSendNotification = () => {
        // this.localNotify.showNotification(
        //     1,
        //     "App Notification",
        //     "Local Notification",
        //     {}, //data
        //     {}, //options
        // )
        if(this.state.targetTime !== null) {
            this.state.targetTime.setMinutes(this.state.targetTime.getMinutes() - 30);
            this.state.targetTime.setSeconds(0,0);
            this.localNotify.scheduleNotification(this.state.targetTime)
        } else {
            alert("Specify time first");
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
                    onChange={(date) => this.handleTimePicker(date)}
                >

                </TimePicker>
                <TouchableOpacity style = {styles.button}
                 onPress={this.onPressSendNotification}>
                     <Text> Remind me </Text>
                 </TouchableOpacity>
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
    button: {
        alignItems: 'center',
        backgroundColor: 'gray',
        padding: 10,
        width: 200,
        marginTop: 10,
    }

})

export default TargetScreen