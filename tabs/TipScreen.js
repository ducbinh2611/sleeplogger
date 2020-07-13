import React from 'react';
import Icon from 'react-native-vector-icons/AntDesign';
import {
    View,
    StyleSheet,
    Dimensions,
    Text,
    TouchableOpacity,
    ScrollView,
    RefreshControl,
    ActivityIndicator
} from 'react-native';
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
        alreadySaved: false,
        list: [],
        tipObject: null,
        refreshing: false,
        fetchingData: false,
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

    //function to get all the saved tip of user
    getSavedTip = () => {
        AsyncStorage.getItem('token').then(token => {
            fetch('http://sleep-logger-dev.herokuapp.com/v1/tips', {
                method: 'GET',
                headers: {
                    Accept: "application/json, text/plain, */*",
                    "Content-Type": "application/json",
                    Authorization: 'Bearer ' + token,
                },
            }
            )
                .then((res) => (res.json()))
                .then(res => {
                    this.setState({
                        list: res,

                    })
                })
                .catch(err => console.error(err))
        })
    }

    checkSavedTip = (id) => {
        this.setState({
            alreadySaved: false
        })
        const length = this.state.list.length
        for (i = 0; i < length; i++) {
            const obj = this.state.list[i]
            if (id === obj.id) {
                this.setState({
                    alreadySaved: true
                })
            }
        }
    }

    getTip = () => {
        this.setState({
            fetchingData: true,
        })
        this.getSavedTip()
        fetch('http://sleep-logger-dev.herokuapp.com/v1/get_tips', {
            method: 'GET',
            headers: {
                Accept: "application/json, text/plain, */*",
                "Content-Type": "application/json",
            }
        })
            .then(res => res.json())
            //.then(res => console.warn(res))
            .then(res => {

                this.setState({
                    fetchingData: !this.state.fetchingData,
                    tipObject: res
                })
                this.checkSavedTip(res.id)
            }
            )
            .catch(err => console.error(err))
    }

    saveTip = () => {
        AsyncStorage.getItem('token').then(token => {
            fetch('http://sleep-logger-dev.herokuapp.com/v1/save_tip', {
                method: 'POST',
                headers: {
                    Accept: "application/json, text/plain, */*",
                    "Content-Type": "application/json",
                    Authorization: 'Bearer ' + token,
                },
                body: JSON.stringify({

                    id: this.state.tipObject.id,

                })
            }
            ).catch(err => console.error(err))
        })
    }

    deleteTip = () => {
        AsyncStorage.getItem('token').then(token => {
            fetch('http://sleep-logger-dev.herokuapp.com/v1/remove_tip', {
                method: 'POST',
                headers: {
                    Accept: "application/json, text/plain, */*",
                    "Content-Type": "application/json",
                    Authorization: 'Bearer ' + token,
                },
                body: JSON.stringify({
                    id: this.state.tipObject.id
                })
            }
            ).catch(err => console.error(err))}
        )
    }

    handleSaveButton = () => {
        if (this.state.alreadySaved) {
            this.deleteTip()
        } else {
            this.saveTip()
        }
        this.setState({
            alreadySaved: !this.state.alreadySaved
        })
    }

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
                        {!this.state.fetchingData &&
                            <Text style={styles.textTip}>
                                {this.state.tipObject.content}
                            </Text>
                        }

                        {this.state.fetchingData &&
                            <ActivityIndicator />
                        }

                        <View style={{ marginTop: 10, flexDirection: 'column', justifyContent: 'flex-end' }}>
                            <Text style={styles.textSource}>
                                - {this.state.source} -
                            </Text>


                            <TouchableOpacity
                                style={styles.saveButton}
                                onPress={this.handleSaveButton}
                            >
                                <View style={{ flexDirection: 'row' }}>
                                    <Icon name={this.state.alreadySaved ? 'heart' : 'hearto'}
                                        color={this.state.alreadySaved ? 'red' : 'grey'}
                                        size={20}
                                    />
                                    {!this.state.alreadySaved &&
                                        <Text style={styles.saveButtonText}>
                                            Save this tip
                                        </Text>
                                    }
                                    {this.state.alreadySaved &&
                                        <Text style={styles.saveButtonText}>
                                            Unsave this tip
                                        </Text>
                                    }
                                </View>
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
        marginTop: 20,
        marginBottom: 20,
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
        marginLeft: 10,
        color: 'gray',
        fontSize: 18,
        
    }



})




export default TipScreen;