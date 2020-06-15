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
    }

    handleNapAfternoon = (value) => {
        this.setState({
            napAfternoon: value
        })
    }

    handleNapEvening = (value) => {
        this.setState({
            napEvening: value
        })
    }

    handleCafMorning = (value) => {
        this.setState({
            caffeineMorning: value
        })
    }

    handleCafAfternoon = (value) => {
        this.setState({
            caffeineAfternoon: value
        })
    }

    handleCafEvening = (value) => {
        this.setState({
            caffeineEvening: value
        })
    }

    render() {
        const { napMorning, napAfternoon, napEvening,
            caffeineMorning, caffeineAfternoon, caffeineEvening } = this.state
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
                                <TextButton size={10} text={'None'} short={false}
                                    onPress={() => this.handleCafMorning(0)}> </TextButton>
                                <TextButton size={10} text={'Low'} short={false}
                                    onPress={() => this.handleCafMorning(1)}> </TextButton>
                                <TextButton size={10} text={'Medium'} short={false}
                                    onPress={() => this.handleCafMorning(2)}> </TextButton>
                                <TextButton size={10} text={'High'} short={false}
                                    onPress={() => this.handleCafMorning(3)}> </TextButton>
                            </View>

                            <View style={styles.options}>
                                <Text style={styles.text}>Afternoon</Text>
                                <TextButton size={10} text={'None'} short={false}
                                    onPress={() => this.handleCafAfternoon(0)}> </TextButton>
                                <TextButton size={10} text={'Low'} short={false}
                                    onPress={() => this.handleCafAfternoon(1)}> </TextButton>
                                <TextButton size={10} text={'Medium'} short={false}
                                    onPress={() => this.handleCafAfternoon(2)}> </TextButton>
                                <TextButton size={10} text={'High'} short={false}
                                    onPress={() => this.handleCafAfternoon(3)}> </TextButton>
                            </View>

                            <View style={styles.options}>
                                <Text style={styles.text}>Night         </Text>
                                <TextButton size={10} text={'None'} short={false}
                                    onPress={() => this.handleCafEvening(0)}> </TextButton>
                                <TextButton size={10} text={'Low'} short={false}
                                    onPress={() => this.handleCafEvening(1)}> </TextButton>
                                <TextButton size={10} text={'Medium'} short={false}
                                    onPress={() => this.handleCafEvening(2)}> </TextButton>
                                <TextButton size={10} text={'High'} short={false}
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
                                <TextButton size={15} text={'Yes'} short={true}
                                    onPress={() => this.handleNapMorning(1)}> </TextButton>
                                <TextButton size={15} text={'No'} short={true}
                                    onPress={() => this.handleNapMorning(0)}> </TextButton>

                            </View>

                            <View style={styles.options}>
                                <Text style={styles.text}>Afternoon?</Text>
                                <TextButton size={15} text={'Yes'} short={true}
                                    onPress={() => this.handleNapAfternoon(1)}> </TextButton>
                                <TextButton size={15} text={'No'} short={true}
                                    onPress={() => this.handleNapAfternoon(0)}> </TextButton>

                            </View>

                            <View style={styles.options}>
                                <Text style={styles.text}>Evening?     </Text>
                                <TextButton size={15} text={'Yes'} short={true}
                                    onPress={() => this.handleNapEvening('1')}> </TextButton>
                                <TextButton size={15} text={'No'} short={true}
                                    onPress={() => this.handleNapEvening('0')}> </TextButton>

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