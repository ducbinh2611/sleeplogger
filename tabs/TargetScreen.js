import React from 'react';
import { Text, View, StyleSheet, Dimensions } from 'react-native';
import { Slider } from 'react-native-elements';
import TimePicker from '../component/TimePicker';
import Icon from 'react-native-vector-icons/FontAwesome';
import { notificationManager } from '../Notification/NotificationManager';
import { TouchableOpacity } from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import GifImage from '../component/GifImage';


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
                value: 30,
                gif: null,
                sliding: false,
            }
    }

    componentDidMount() {
        this.localNotify = notificationManager
        this.localNotify.configure()
        this.gifGenerator()
    }

    handleTimePicker = (date) => {
        this.setState({
            targetTime: date
        })
    }

    gifGenerator = () => {
        const randomNumber = Math.floor(Math.random() * 10) // generate random int from 0 -> 9

        if (randomNumber % 5 === 0) {
            this.setState({
                gif: require('../images/cat_sleep.gif')
            })
        } else if (randomNumber % 5 === 1) {
            this.setState({
                gif: require('../images/chibi_sleep.gif')
            })
        } else if (randomNumber % 5 === 2) {
            this.setState({
                gif: require('../images/dog_sleep.gif')
            })
        } else if (randomNumber % 5 === 3) {
            this.setState({
                gif: require('../images/donald_duck_sleep.gif')
            })
        } else {
            this.setState({
                gif: require('../images/time_to_sleep.gif')
            })
        }
    }

    onPressSendNotification = () => {
        const { targetTime, value } = this.state
        const currTime = new Date()
        const earlyTime = new Date(targetTime)
        const randomNumber = Math.floor(Math.random() * 5);
        if (targetTime !== null) {
            earlyTime.setMinutes(earlyTime.getMinutes() - value);
            earlyTime.setSeconds(0, 0);
            if (earlyTime.getTime() >= currTime.getTime()) {
                this.localNotify.scheduleNotification(earlyTime, value, randomNumber)
                alert("Succesfully schedule")
            } else {
                alert("Target time cannot be earlier than current time")
            }
        } else {
            alert("Specify time first");
        }
    }

    render() {
        const screenWidth = Dimensions.get('window').width // width of the screen
        const left = this.state.value * (screenWidth * 0.65) / 100 - 147.5; // for smaller size iPhone
        const leftBig = this.state.value * (screenWidth * 0.675) / 100 - 167 // for larget size iPhone
        const { targetTime, sliding, value } = this.state
        return (
            <LinearGradient style={{ flex: 1 }} colors={['#9C51B6', '#5946B2']}>
                <View
                    style={styles.container}
                >
                    <TimePicker
                        style={styles.question}
                        question={"Tonight let's sleep at"}
                        chosenDate={targetTime}
                        onChange={(date) => this.handleTimePicker(date)}
                    >

                    </TimePicker>

                    <View style={styles.notiTime}>
                        <Text style={styles.text}>
                            Notify in advance
                        </Text>
                    </View>

                    {sliding &&
                        <Text style={{ width: 50, textAlign: 'center', 
                                left: screenWidth === 414 ? leftBig : left,
                                color: 'white' }}>
                            {Math.floor(value)}
                        </Text>
                    }

                    {!sliding &&
                        <View style={{ marginTop: 17, }} />
                    }


                    <Slider
                        style={{ width: screenWidth - 60, backgroundColor: 'transparent' }}
                        minimumValue={0}
                        maximumValue={120}
                        step={5}
                        thumbTintColor={'#3FC4E1'}
                        value={value}
                        minimumTrackTintColor={'#3FC4E1'}
                        onValueChange={(value) => {
                            this.setState({ value, sliding: true })
                            setTimeout(() => {
                                this.setState({
                                    sliding: false
                                })
                            }, 1500);
                        }
                        }
                    />

                    <View style={styles.labelSlider}>
                        <Text style={screenWidth === 414 ? styles.leftLabelLarge
                                                         : styles.leftLabel}>
                            0 mins
                        </Text>

                        <Text style={screenWidth === 414 ? styles.rightLabelLarge
                                                        : styles.rightLabel}>
                            120 mins
                        </Text>
                    </View>

                    <TouchableOpacity style={styles.button}
                        onPress={this.onPressSendNotification}>
                        <Text style={styles.text}> Remind me </Text>
                    </TouchableOpacity>

                    <GifImage onPress={this.onPressSendNotification} source={this.state.gif} />
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
        fontSize: 15,
        color: 'white',
        position: 'absolute',
        left: -155,
    },
    leftLabelLarge: {
        fontSize: 15,
        color: 'white',
        position: 'absolute',
        left: -177,
    },
    rightLabel: {
        fontSize: 15,
        color: 'white',
        position: 'absolute',
        left: 100.5,
    },
    rightLabelLarge: {
        fontSize: 15,
        color: 'white',
        position: 'absolute',
        left: 122.5,
    },
    image: {
        height: 100,
        width: 100,
    }

})

export default TargetScreen