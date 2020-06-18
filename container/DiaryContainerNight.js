import { ScrollView, Text, View, Image, StyleSheet, TextInput, KeyboardAvoidingView, TouchableOpacity } from 'react-native';
import React, { Component } from 'react';
import QuestionText from '../component/QuestionText'
import TextButton from '../component/TextButton';
import Icon from 'react-native-vector-icons/Feather';
import LinearGradient from 'react-native-linear-gradient';


class DiaryContainerNight extends React.Component {
    static navigationOptions = {
        tabBarLabel: 'Night',
        tabBarIcon: ({ color }) => (
            <Icon name='moon' color={'yellow'} size={20} />
        )
    }

    state = {
        q1o1: false,
        q1o2: false,
        q1o3: false,
        q1o4: false,
        q2o1: false,
        q2o2: false,
        q2o3: false,
        q2o4: false,
        q3o1: false,
        q3o2: false,
        q3o3: false,
        q3o4: false,
        q4o1: false,
        q4o2: false,
        q5o1: false,
        q5o2: false,
        q6o1: false,
        q6o2: false,
        napMorning: -1,
        napAfternoon: -1,
        napMEvening: -1,
        caffeineMorning: -1,
        caffeineAfternoon: -1,
        caffeineEvening: -1,
    }

    handleNapMorning = (value) => {
        this.setState({
            napMorning: value
        })
        const { q4o1, q4o2 } = this.state
        if (value === 0) {
            if (q4o1) {
                this.setState({
                    q4o1: !this.state.q4o1
                })
            } else {
                this.setState({
                    q4o1: !this.state.q4o1,
                    q4o2: false,
                })
            }
        } else {
            if (q4o2) {
                this.setState({
                    q4o2: !this.state.q4o2
                })
            } else {
                this.setState({
                    q4o2: !this.state.q4o2,
                    q4o1: false,
                })
            }
        }
    }

    handleNapAfternoon = (value) => {
        this.setState({
            napAfternoon: value
        })
        const { q5o1, q5o2 } = this.state
        if (value === 0) {
            if (q5o1) {
                this.setState({
                    q5o1: !this.state.q5o1
                })
            } else {
                this.setState({
                    q5o1: !this.state.q5o1,
                    q5o2: false,
                })
            }
        } else {
            if (q5o2) {
                this.setState({
                    q5o2: !this.state.q5o2
                })
            } else {
                this.setState({
                    q5o2: !this.state.q5o2,
                    q5o1: false,
                })
            }
        }
    }

    handleNapEvening = (value) => {
        this.setState({
            napEvening: value
        })
        const { q6o1, q6o2 } = this.state
        if (value === 0) {
            if (q6o1) {
                this.setState({
                    q6o1: !this.state.q6o1
                })
            } else {
                this.setState({
                    q6o1: !this.state.q6o1,
                    q6o2: false,
                })
            }
        } else {
            if (q6o2) {
                this.setState({
                    q6o2: !this.state.q6o2
                })
            } else {
                this.setState({
                    q6o2: !this.state.q6o2,
                    q6o1: false,
                })
            }
        }
    }

    handleCafMorning = (value) => {
        this.setState({
            caffeineMorning: value
        })
        const { q1o1, q1o2, q1o3, q1o4 } = this.state
        if (value === 0) {
            if (q1o1) {
                this.setState({
                    q1o1: !this.state.q1o1
                })
            } else {
                this.setState({
                    q1o1: !this.state.q1o1,
                    q1o2: false,
                    q1o3: false,
                    q1o4: false,
                })
            }
        } else if ( value === 1 ) {
            if (q1o2) {
                this.setState({
                    q1o2: !this.state.q1o2
                })
            } else {
                this.setState({
                    q1o2: !this.state.q1o2,
                    q1o1: false,
                    q1o3: false,
                    q1o4: false,
                })
            }
        } else if (value === 2) {
            if (q1o3) {
                this.setState({
                    q1o3: !this.state.q1o3
                })
            } else {
                this.setState({
                    q1o3: !this.state.q1o3,
                    q1o1: false,
                    q1o2: false,
                    q1o4: false,
                })
            }
        } else {
            if (q1o4) {
                this.setState({
                    q1o4: !this.state.q1o4
                })
            } else {
                this.setState({
                    q1o4: !this.state.q1o4,
                    q1o1: false,
                    q1o2: false,
                    q1o3: false,
                })
            }
        }
    }

    handleCafAfternoon = (value) => {
        this.setState({
            caffeineAfternoon: value
        })
        const { q2o1, q2o2, q2o3, q2o4 } = this.state
        if (value === 0) {
            if (q2o1) {
                this.setState({
                    q2o1: !this.state.q2o1
                })
            } else {
                this.setState({
                    q2o1: !this.state.q2o1,
                    q2o2: false,
                    q2o3: false,
                    q2o4: false,
                })
            }
        } else if ( value === 1 ) {
            if (q2o2) {
                this.setState({
                    q2o2: !this.state.q2o2
                })
            } else {
                this.setState({
                    q2o2: !this.state.q2o2,
                    q2o1: false,
                    q2o3: false,
                    q2o4: false,
                })
            }
        } else if (value === 2) {
            if (q2o3) {
                this.setState({
                    q2o3: !this.state.q2o3
                })
            } else {
                this.setState({
                    q2o3: !this.state.q2o3,
                    q2o1: false,
                    q2o2: false,
                    q2o4: false,
                })
            }
        } else {
            if (q2o4) {
                this.setState({
                    q2o4: !this.state.q2o4
                })
            } else {
                this.setState({
                    q2o4: !this.state.q2o4,
                    q2o1: false,
                    q2o2: false,
                    q2o3: false,
                })
            }
        }
    }

    handleCafEvening = (value) => {
        this.setState({
            caffeineEvening: value
        })
        const { q3o1, q3o2, q3o3, q3o4 } = this.state
        if (value === 0) {
            if (q3o1) {
                this.setState({
                    q3o1: !this.state.q3o1
                })
            } else {
                this.setState({
                    q3o1: !this.state.q3o1,
                    q3o2: false,
                    q3o3: false,
                    q3o4: false,
                })
            }
        } else if ( value === 1 ) {
            if (q3o2) {
                this.setState({
                    q3o2: !this.state.q3o2
                })
            } else {
                this.setState({
                    q3o2: !this.state.q3o2,
                    q3o1: false,
                    q3o3: false,
                    q3o4: false,
                })
            }
        } else if (value === 2) {
            if (q3o3) {
                this.setState({
                    q3o3: !this.state.q3o3
                })
            } else {
                this.setState({
                    q3o3: !this.state.q3o3,
                    q3o1: false,
                    q3o2: false,
                    q3o4: false,
                })
            }
        } else {
            if (q3o4) {
                this.setState({
                    q3o4: !this.state.q3o4
                })
            } else {
                this.setState({
                    q3o4: !this.state.q3o4,
                    q3o1: false,
                    q3o2: false,
                    q3o3: false,
                })
            }
        }
    }

    render() {
        const { napMorning, napAfternoon, napEvening,
            caffeineMorning, caffeineAfternoon, caffeineEvening,
            q1o1, q1o2, q1o3, q1o4, q2o1, q2o2, q2o3, q2o4,
            q3o1, q3o2, q3o3, q3o4, q4o1, q4o2, q5o1, q5o2, q6o1, q6o2 } = this.state
        return (
            <LinearGradient colors={['#090E2C', '#5220AE']}>
                <ScrollView>
                    <View style={styles.container}>

                        <QuestionText
                            //style={styles.questionComponent}
                            question={'How much caffeine did you take?'}
                            style={styles.question}
                        >
                            <View style={styles.options}>
                                <Text style={styles.text}>Morning    </Text>
                                <TextButton size={10} text={'None'} short={false} active={q1o1}
                                    onPress={() => this.handleCafMorning(0)}> </TextButton>
                                <TextButton size={10} text={'Low'} short={false} active={q1o2}
                                    onPress={() => this.handleCafMorning(1)}> </TextButton>
                                <TextButton size={10} text={'Medium'} short={false} active={q1o3}
                                    onPress={() => this.handleCafMorning(2)}> </TextButton>
                                <TextButton size={10} text={'High'} short={false} active={q1o4}
                                    onPress={() => this.handleCafMorning(3)}> </TextButton>
                            </View>

                            <View style={styles.options}>
                                <Text style={styles.text}>Afternoon</Text>
                                <TextButton size={10} text={'None'} short={false} active={q2o1}
                                    onPress={() => this.handleCafAfternoon(0)}> </TextButton>
                                <TextButton size={10} text={'Low'} short={false} active={q2o2}
                                    onPress={() => this.handleCafAfternoon(1)}> </TextButton>
                                <TextButton size={10} text={'Medium'} short={false} active={q2o3}
                                    onPress={() => this.handleCafAfternoon(2)}> </TextButton>
                                <TextButton size={10} text={'High'} short={false} active={q2o4}
                                    onPress={() => this.handleCafAfternoon(3)}> </TextButton>
                            </View>

                            <View style={styles.options}>
                                <Text style={styles.text}>Night         </Text>
                                <TextButton size={10} text={'None'} short={false} active={q3o1}
                                    onPress={() => this.handleCafEvening(0)}> </TextButton>
                                <TextButton size={10} text={'Low'} short={false} active={q3o2}
                                    onPress={() => this.handleCafEvening(1)}> </TextButton>
                                <TextButton size={10} text={'Medium'} short={false} active={q3o3}
                                    onPress={() => this.handleCafEvening(2)}> </TextButton>
                                <TextButton size={10} text={'High'} short={false} active={q3o4}
                                    onPress={() => this.handleCafEvening(3)}> </TextButton>
                            </View>
                        </QuestionText>

                        <QuestionText
                            //style={styles.questionComponent}
                            question={'Did you take a nap in the'}
                            style={styles.question}
                        >
                            <View style={styles.options}>
                                <Text style={styles.text}>Morning?    </Text>
                                <TextButton size={15} text={'Yes'} short={true} active={q4o2}
                                    onPress={() => this.handleNapMorning(1)}> </TextButton>
                                <TextButton size={15} text={'No'} short={true} active={q4o1}
                                    onPress={() => this.handleNapMorning(0)}> </TextButton>

                            </View>

                            <View style={styles.options}>
                                <Text style={styles.text}>Afternoon?</Text>
                                <TextButton size={15} text={'Yes'} short={true} active={q5o2}
                                    onPress={() => this.handleNapAfternoon(1)}> </TextButton>
                                <TextButton size={15} text={'No'} short={true} active={q5o1}
                                    onPress={() => this.handleNapAfternoon(0)}> </TextButton>

                            </View>

                            <View style={styles.options}>
                                <Text style={styles.text}>Evening?     </Text>
                                <TextButton size={15} text={'Yes'} short={true} active={q6o2}
                                    onPress={() => this.handleNapEvening(1)}> </TextButton>
                                <TextButton size={15} text={'No'} short={true} active={q6o1}
                                    onPress={() => this.handleNapEvening(0)}> </TextButton>

                            </View>
                        </QuestionText>

                        <View style={styles.buttonContainer}>
                            <TouchableOpacity
                                style={styles.button}
                                onPress={() => {
                                    if (napMorning && napAfternoon && napEvening
                                        && caffeineAfternoon && caffeineEvening && caffeineMorning) {
                                        console.warn('nap morn ' + napMorning);
                                        console.warn('nap aft ' + napAfternoon);
                                        console.warn('nap even ' + napEvening);
                                        console.warn('caf mor ' + caffeineMorning);
                                        console.warn('caf aft ' + caffeineAfternoon);
                                        console.warn('caf eve ' + caffeineEvening);
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
    question: {
        fontSize: 20,
        marginBottom: 20,
        marginTop: 20,
    },
    options: {
        padding: 10,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
    },
    text: {
        marginTop: 23,
        color: 'white',
        fontWeight: 'bold',
        fontSize: 13,
    },
    button: {
        alignItems: 'center',
        paddingHorizontal: 30,
        borderRadius: 20,
        backgroundColor: 'yellow',
        marginBottom: 10,
    },
    buttonContainer: {
        marginTop: 40,
        marginBottom: 40,

    },
    textInput: {
        marginTop: 5,
        marginBottom: 5,
        fontSize: 30,
        fontWeight: 'bold',
        color: 'black',
    },
})

export default DiaryContainerNight