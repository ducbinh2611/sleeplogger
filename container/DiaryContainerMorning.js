import {
    ScrollView,
    Text,
    View,
    StyleSheet,
    TouchableOpacity
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import React, { Component } from 'react';
import Question from '../component/Question';
import ChoiceButton from '../component/ChoiceButton';
import TimePicker from '../component/TimePicker';
import Icon from 'react-native-vector-icons/Feather';
import AsyncStorage from '@react-native-community/async-storage';
import SubmitButton from '../component/SubmitButton';

class DiaryContainerMorning extends React.Component {
    static navigationOptions = {
        tabBarLabel: <View />,
        tabBarIcon: ({ tintColor }) => (
            <Icon name='sun' color={tintColor} size={tintColor === 'white' ? 20 : 26} />
        )
    }


    state = {
        q1o1: false,
        q1o2: false,
        q1o3: false,
        q2o1: false,
        q2o2: false,
        q2o3: false,
        submitSuccess: false,
        sleptTime: null,
        wakeUpTime: null,
        ease_of_sleep: -1,
        morning_feeling: -1,
    }

    reset = () => {
        this.setState({
            q1o1: false,
            q1o2: false,
            q1o3: false,
            q2o1: false,
            q2o2: false,
            q2o3: false,
            submitSuccess: true,
            sleptTime: null,
            wakeUpTime: null,
            ease_of_sleep: -1,
            morning_feeling: -1,
        })
    }

    handleChangeSleepTime = (value) => {
        this.setState({
            sleptTime: value
        })

    }

    handleChangeWakeUpTime = (value) => {
        this.setState({
            wakeUpTime: value
        })
    }

    handleButtonQ1 = (value) => {
        this.setState({
            ease_of_sleep: value
        })
        const { q1o1, q1o2, q1o3 } = this.state
        if (value === 1) {
            if (q1o1) {
                this.setState({
                    q1o1: !this.state.q1o1
                })
            } else {
                this.setState({
                    q1o1: !this.state.q1o1,
                    q1o2: false,
                    q1o3: false
                })
            }
        } else if (value === 2) {
            if (q1o2) {
                this.setState({
                    q1o2: !this.state.q1o2
                })
            } else {
                this.setState({
                    q1o2: !this.state.q1o2,
                    q1o1: false,
                    q1o3: false
                })
            }
        } else {
            if (q1o3) {
                this.setState({
                    q1o3: !this.state.q1o3
                })
            } else {
                this.setState({
                    q1o3: !this.state.q1o3,
                    q1o1: false,
                    q1o2: false
                })
            }
        }
    }

    handleButtonQ2 = (value) => {
        this.setState({
            morning_feeling: value
        })
        const { q2o1, q2o2, q2o3 } = this.state
        if (value === 1) {
            if (q2o1) {
                this.setState({
                    q2o1: !this.state.q2o1
                })
            } else {
                this.setState({
                    q2o1: !this.state.q2o1,
                    q2o2: false,
                    q2o3: false
                })
            }
        } else if (value === 2) {
            if (q2o2) {
                this.setState({
                    q2o2: !this.state.q2o2
                })
            } else {
                this.setState({
                    q2o2: !this.state.q2o2,
                    q2o1: false,
                    q2o3: false
                })
            }
        } else {
            if (q2o3) {
                this.setState({
                    q2o3: !this.state.q2o3
                })
            } else {
                this.setState({
                    q2o3: !this.state.q2o3,
                    q2o1: false,
                    q2o2: false
                })
            }
        }
    }

    //function to calculate the sleeping hours to .5
    calcDate = () => {
        const sleptHour = this.state.sleptTime.getHours()
        const wakeUpHour = this.state.wakeUpTime.getHours()
        //console.warn('slept hour ' + sleptHour)
        if (sleptHour > 12 && wakeUpHour < 12) {
            const timeInAmPm = sleptHour - 12
            const min = this.state.sleptTime.getMinutes()
            const nightMins = (timeInAmPm * 60) + min
            const limit = 12 * 60
            const wakeUpHrs = this.state.wakeUpTime.getHours()
            const wakeUpMins = this.state.wakeUpTime.getMinutes()
            const morningMins = (wakeUpHrs * 60) + wakeUpMins
            return Math.round(((morningMins + (limit - nightMins)) / 60) * 2) / 2
        } else {
            const hourNotRound = Math.abs(this.state.wakeUpTime.getTime() - 
                                            this.state.sleptTime.getTime()) / (1000 * 60 * 60)
            const hourRounded = Math.round(hourNotRound * 2) / 2
            return hourRounded
        }
    }


    handleSubmitButton = () => {
        const { sleptTime, wakeUpTime, ease_of_sleep, morning_feeling } = this.state
        if (sleptTime !== null
            && wakeUpTime !== null
            && ease_of_sleep !== -1
            && morning_feeling !== -1) {
            AsyncStorage.getItem('token').then(token => {
                
                fetch('http://sleep-logger-dev.herokuapp.com/v1/morning_entries', {
                    method: 'POST',
                    headers: {
                        Accept: "application/json, text/plain, */*",
                        "Content-Type": "application/json",
                        Authorization: 'Bearer ' + token,
                    },
                    body: JSON.stringify({
                        morning_entry: {
                            bed_time: this.state.sleptTime,
                            wake_up_time: this.state.wakeUpTime,
                            ease_of_sleep: this.state.ease_of_sleep,
                            hours_of_sleep: this.calcDate(),
                            morning_feeling: this.state.morning_feeling,
                        }

                    })

                }
                )
                //.then(res => console.warn(this.calcDate()))
                .then(() => this.reset())
                .catch(err => console.error(err))
            })
            //.then(res => res.text()).then(res => console.warn('res ' + res))
             
            // console.warn('wake up time ' + this.state.wakeUpTime)
            // console.warn('ease of sleep ' + this.state.ease_of_sleep)
        } else {
            alert("Key in all data first")
        }
    }

    render() {
        return (
            <LinearGradient colors={['#9C51B6', '#5946B2']}>
                <ScrollView>
                    <View style={styles.container}>
                        <TimePicker
                            style={styles.question}
                            chosenDate={this.state.sleptTime}
                            onChange={time => this.handleChangeSleepTime(time)}
                            question={'Last night you slept at'}
                        />

                        <TimePicker
                            style={styles.question}
                            chosenDate={this.state.wakeUpTime}
                            onChange={time => this.handleChangeWakeUpTime(time)}
                            question={'Today you woke up at'}
                        />

                        <Question
                            style={styles.question}
                            question={'How was your sleep?'}>
                            <ChoiceButton path={require('../images/sad.png')}
                                active={this.state.q1o1}
                                onPress={() => this.handleButtonQ1(1)}> </ChoiceButton>
                            <ChoiceButton path={require('../images/neutral_face.png')}
                                active={this.state.q1o2}
                                onPress={() => this.handleButtonQ1(2)}> </ChoiceButton>
                            <ChoiceButton path={require('../images/happy_face.png')}
                                active={this.state.q1o3}
                                onPress={() => this.handleButtonQ1(3)}> </ChoiceButton>
                        </Question>

                        <Question
                            style={styles.question}
                            question={'How do you feel now?'}>
                            <ChoiceButton path={require('../images/sad.png')}
                                active={this.state.q2o1}
                                onPress={() => this.handleButtonQ2(1)}> </ChoiceButton>
                            <ChoiceButton path={require('../images/neutral_face.png')}
                                active={this.state.q2o2}
                                onPress={() => this.handleButtonQ2(2)}> </ChoiceButton>
                            <ChoiceButton path={require('../images/happy_face.png')}
                                active={this.state.q2o3}
                                onPress={() => this.handleButtonQ2(3)}> </ChoiceButton>
                        </Question>

                        <View style={styles.buttonContainer}>
                            <SubmitButton onPress={this.handleSubmitButton}/>
                            {this.state.submitSuccess &&
                                <View style={styles.noti}>
                                    <Text style={styles.notiText}>
                                        Submit successfully
                                    </Text>
                                </View>    
                            }
                        </View>

                    </View>
                </ScrollView>
            </LinearGradient>

        )
    }
}

const styles = StyleSheet.create({
    container: {
        //backgroundColor: '#291D54',

        flex: 1,
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'center',
    },
    buttonContainer: {
        marginTop: 40,
        marginBottom: 100,

    },
    button: {
        alignItems: 'center',
        paddingHorizontal: 30,
        borderRadius: 20,
        backgroundColor: 'transparent'
    },
    question: {
        marginTop: 20,
        marginBottom: 20,
    },
    textInput: {
        marginTop: 5,
        marginBottom: 5,
        fontSize: 30,
        fontWeight: 'bold',
        color: 'white',
    },
    noti: {
        marginTop: 10,
        marginLeft: 10,
    },
    notiText: {
        fontSize: 16,
        color:'yellow',
    }

})

export default DiaryContainerMorning