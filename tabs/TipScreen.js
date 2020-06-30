import React from 'react';
import Icon from 'react-native-vector-icons/AntDesign';
import { View, StyleSheet, Dimensions, Text, TouchableOpacity, ScrollView, RefreshControl } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-community/async-storage';

class TipScreen extends React.Component {
    static navigationOptions = {
        tabBarIcon: ({ tintColor }) => (
            <Icon name={'like2'} color={tintColor} size={20} />
        ),
        headerStyle: {
            backgroundColor: '#9C51B6'
        },
    }

    state = {
        message: '',
        source: '',
        refreshing: false,
    }

    componentWillMount() {
        this.getTip()
    }

    refreshFunction = () => {
        this.setState({
            refreshing: true
        })
        this.getTip()
        this.setState({
            refreshing: false,
        })
    }

    getTip = () => {
        fetch('http://sleep-logger-dev.herokuapp.com/get_tips', {
            method: 'GET',
            headers: {
                Accept: "application/json, text/plain, */*",
                "Content-Type": "application/json",
            }
        })
            .then(res => res.json())
            .then(res => {
                
                this.setState({
                    message: res.tip.content
                })
            }
            )
            .catch(err => console.error(err))
    }

    handleSaveButton = () => {
        AsyncStorage.getItem('token').then(token => {
            fetch('http://sleep-logger-dev.herokuapp.com/v1/tips', {
                method: 'POST',
                headers: {
                    Accept: "application/json, text/plain, */*",
                    "Content-Type": "application/json",
                    Authorization: 'Bearer ' + token,
                },
                body: JSON.stringify({
                    tip: {
                        content: this.state.message,
                    }
                })
            }
            )
                .then(() => alert('Saved tip successfully'))
                .catch(err => console.error(err))
        })
    }
    // refresh tip?

    render() {
        return (


            <LinearGradient style={{ flex: 1 }} colors={['#9C51B6', '#5946B2']}>
                <ScrollView refreshControl={
                    <RefreshControl refreshing={this.state.refreshing} onRefresh={this.refreshFunction} />
                }>
                    <View style={styles.header}>
                        <Icon name={'aliwangwang-o1'} color={'orange'} size={30} />
                        <Text style={styles.textHeader}> Do you know? </Text>
                    </View>

                    <View style={styles.tipBox}>
                        <Text style={styles.textTip}>
                            {this.state.message}
                        </Text>

                        <View style={{ marginTop: 10, flexDirection: 'column', justifyContent: 'flex-end' }}>
                            <Text style={styles.textSource}>
                                - {this.state.source} -
                        </Text>

                            <TouchableOpacity
                                style={styles.saveButton}
                                onPress={this.handleSaveButton}
                            >
                                <Text style={styles.saveButtonText}>
                                    Find it useful? Save it to your tips bank
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
    containter: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: 500,
    },
    header: {
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        padding: 20,
        marginTop: 30,
        marginBottom: 30,
    },
    textHeader: {
        fontSize: 30,
        fontWeight: 'bold',
        color: 'blue',
    },
    tipBox: {
        alignSelf: 'center',
        backgroundColor: 'purple',
        borderRadius: 10,
        width: Math.round(Dimensions.get('window').width) - 50,
        padding: 30,
    },
    textTip: {
        fontSize: 20,
        color: 'white',
    },
    textSource: {
        fontSize: 17,
        fontStyle: 'italic',
        color: 'gray',
    },
    saveButton: {
        backgroundColor: 'purple',
        padding: 5,
    },
    saveButtonText: {
        fontSize: 15,
        color: '#F3D0EB',
    }



})




export default TipScreen;