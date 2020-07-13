import React from 'react';
import { Text, View, StyleSheet, Dimensions } from 'react-native';
import { Slider } from 'react-native-elements';
import TimePicker from '../component/TimePicker';
import Icon from 'react-native-vector-icons/FontAwesome';
import { notificationManager } from '../Notification/NotificationManager';
import { TouchableOpacity } from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';


class TargetScreen extends React.Component {
    static navigationOptions = {
        tabBarLabel: 'Target',
        tabBarIcon: ({ tintColor }) => (
            <Icon name='bell' color={tintColor} size={20} />
        ),
        headerStyle: {
            backgroundColor: '#090E2C'
        },

    }

    constructor(props) {
        super(props)
        this.localNotify = null,
            this.state = {
                targetTime: null,
                value: 30
            }
    }

    componentDidMount() {
        this.localNotify = notificationManager
        this.localNotify.configure()
    }

    handleTimePicker = (date) => {
        this.setState({
            targetTime: date
        })
    }

    onPressSendNotification = () => {
        const { targetTime, value } = this.state
        if (targetTime !== null) {
            targetTime.setMinutes(targetTime.getMinutes() - value);
            targetTime.setSeconds(0, 0);
            this.localNotify.scheduleNotification(targetTime)
            alert("Succesfully schedule")
        } else {
            alert("Specify time first");
        }
    }
    
    render() {
        const screenWidth = Dimensions.get('window').width // width of the screen
        const left = this.state.value * (screenWidth * 0.65)/100 - 147.5; // 

        
        return (
            //['#090E2C', '#5220AE']
            <LinearGradient style={{ flex: 1 }} colors={['#9C51B6', '#5946B2']}>
                <View
                    style={styles.container}
                >
                    <TimePicker
                        style={styles.question}
                        question={'Tonight I want to go to bed at'}
                        chosenDate={this.state.targetTime}
                        onChange={(date) => this.handleTimePicker(date)}
                    >

                    </TimePicker>
                    
                    <View style={styles.notiTime}>
                        <Text style={styles.text}>
                            Notify me in advance
                        </Text>
                    </View>

                    <Text style={{ width: 50, textAlign: 'center', left: left, color:'white' }}>
                        {Math.floor(this.state.value)}
                    </Text>

                    
                    <Slider
                        style={{ width: screenWidth - 60, backgroundColor: 'transparent' }}
                        minimumValue={0}
                        maximumValue={120}
                        value={this.state.value}
                        onValueChange={(value) => this.setState({ value })}
                    />
                    
                    <View style={styles.labelSlider}>
                        <Text style={styles.leftLabel}>
                            0 mins
                        </Text>

                        <Text style={styles.rightLabel}>
                            120 mins
                        </Text>
                    </View>

                    <TouchableOpacity style={styles.button}
                        onPress={this.onPressSendNotification}>
                        <Text style={styles.text}> Remind me </Text>
                    </TouchableOpacity>
                </View>
            </LinearGradient>
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
        backgroundColor: 'orange',
        marginTop: 20,
        marginBottom: 20,
    },
    button: {
        alignItems: 'center',
        //backgroundColor: 'gray',
        padding: 10,
        width: 200,
        marginTop: 20,
    },
    text: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white'
    },
    notiTime: {
        marginTop: 20,
        marginBottom: 15,
    },
    labelSlider: {
        flexDirection: 'row',
        marginTop: 3,
    },
    leftLabel: {
        fontSize:15,
        color: 'white',
        position: 'absolute',
        left: -155,
    },
    rightLabel: {
        fontSize:15,
        color: 'white',
        position: 'absolute',
        left: 100.5,
    },

})

export default TargetScreen