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

class DiaryContainerMorning extends React.Component {
    static navigationOptions = {
        tabBarLabel: 'Morning',
        tabBarIcon: ({ color }) => (
            <Icon name='sun' color={'yellow'} size={20} />
        )
    }


    state = {
        sleptTime: null,
        wakeUpTime: null,
        ease_of_sleep: -1,
        morning_feeling: -1,
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
    }

    handleButtonQ2 = (value) => {
        this.setState({
            morning_feeling: value
        })
    }

    calcDate = () => {
        const sleptHour = this.state.sleptTime.getHours()
        //console.warn('slept hour ' + sleptHour)
        if (sleptHour > 12) {
            const timeInAmPm = sleptHour - 12
            const min = this.state.sleptTime.getMinutes()
            const nightMins = (timeInAmPm * 60) + min
            const limit = 12 * 60
            const wakeUpHrs = this.state.wakeUpTime.getHours()
            const wakeUpMins = this.state.wakeUpTime.getMinutes()
            const morningMins = (wakeUpHrs * 60) + wakeUpMins
            return Math.round((morningMins + (limit - nightMins)) / 60)
        } else {
            return Math.round(
                Math.abs(this.state.wakeUpTime.getTime() - this.state.sleptTime.getTime()) / (1000 * 60 * 60))
        }
    }

    testFn = () => {
        //console.warn(this.state.sleptTime.getTime())
        return this.calcDate()
    }

    handleSubmitButton = () => {

        fetch('http://sleep-logger-dev.herokuapp.com/v1/morning_entries', {
            method: 'POST',
            headers: {
                Accept: "application/json, text/plain, */*",
                "Content-Type": "application/json",
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
        console.warn('bed time ' + this.state.sleptTime)
        console.warn('wake up time ' + this.state.wakeUpTime)
        console.warn('ease of sleep ' + this.state.ease_of_sleep)

    }

    render() {
        const { sleptTime, wakeUpTime, ease_of_sleep, morning_feeling } = this.state

        return (
            <LinearGradient colors={['#090E2C', '#5220AE']}>
                <ScrollView>
                    <View style={styles.container}>
                        <TimePicker
                            style={styles.question}
                            onChange={time => this.handleChangeSleepTime(time)}
                            question={'Last night you slept at'}
                        />

                        <TimePicker
                            style={styles.question}
                            onChange={time => this.handleChangeWakeUpTime(time)}
                            question={'Today you woke up at'}
                        />

                        <Question
                            style={styles.question}
                            question={'How was your sleep?'}>
                            <ChoiceButton path={require('../images/sad.png')}

                                onPress={() => this.handleButtonQ1(1)}> </ChoiceButton>
                            <ChoiceButton path={require('../images/neutral_face.png')}
                                onPress={() => this.handleButtonQ1(2)}> </ChoiceButton>
                            <ChoiceButton path={require('../images/happy_face.png')}
                                onPress={() => this.handleButtonQ1(3)}> </ChoiceButton>
                        </Question>

                        <Question
                            style={styles.question}
                            question={'How do you feel now?'}>
                            <ChoiceButton path={require('../images/sad.png')}
                                onPress={() => this.handleButtonQ2(1)}> </ChoiceButton>
                            <ChoiceButton path={require('../images/neutral_face.png')}
                                onPress={() => this.handleButtonQ2(2)}> </ChoiceButton>
                            <ChoiceButton path={require('../images/happy_face.png')}
                                onPress={() => this.handleButtonQ2(3)}> </ChoiceButton>
                        </Question>

                        <View style={styles.buttonContainer}>
                            <TouchableOpacity
                                style={styles.button}
                                onPress={() => {
                                    if (sleptTime && wakeUpTime && ease_of_sleep && morning_feeling) {
                                        this.handleSubmitButton()
                                    } else {
                                        alert("Key in all data first")
                                    }
                                }}
                            >
                                <Text style={styles.textInput}>
                                    Submit
                        </Text>

                            </TouchableOpacity>
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
        marginBottom: 50,

    },
    button: {
        alignItems: 'center',
        paddingHorizontal: 30,
        borderRadius: 20,
        backgroundColor: 'yellow'
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
        color: 'black',
    },

})

export default DiaryContainerMorning