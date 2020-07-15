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
import SavePopUp from '../component/SavePopUp';


class TipScreen extends React.Component {
    static navigationOptions = ({ navigation }) => {
        return {
            header: () => null
        }
    }

    state = {
        alreadySaved: false,
        list: [],
        tipObject: null,
        refreshing: false,
        fetchingData: false,
        modalVisible: false,
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

    //check whether the fetched tip is already saved
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

    // get a random tip
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

    // Save the current tip
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

    // Delete the current tip from user's saved tips
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
            ).catch(err => console.error(err))
        }
        )
    }

    handleNavigationButton = () => {
        this.props.navigation.navigate('SavedTipScreen')
    }

    handleSaveButton = () => {
        if (this.state.alreadySaved) {
            this.deleteTip()
        } else {
            this.saveTip()
        }
        this.showModal()
        this.setState({
            alreadySaved: !this.state.alreadySaved
        })
    }

    showModal = () => {
        this.setState({
            modalVisible: true
        });
        setTimeout(() => {
            this.setState({
                modalVisible: false
            })
        }, 1000);
    }

    render() {
        return (


            <LinearGradient style={{ flex: 1 }} colors={['#9C51B6', '#5946B2']}>
                <ScrollView refreshControl={
                    <RefreshControl refreshing={this.state.refreshing} onRefresh={this.refreshFunction} />
                }>
                    <View style={styles.header}>
                        <Icon name={'bulb1'} color={'orange'} size={30} />
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

                        <View style={{ marginTop: 15, flexDirection: 'column', justifyContent: 'flex-end' }}>


                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <TouchableOpacity
                                    style={styles.saveButton}
                                    onPress={this.handleSaveButton}
                                >
                                    <View style={{ flexDirection: 'row' }}>
                                        <Icon name={this.state.alreadySaved ? 'heart' : 'hearto'}
                                            color={this.state.alreadySaved ? 'red' : 'white'}
                                            size={30}
                                        />
                                    </View>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    style={styles.tipBankButton}
                                    onPress={this.handleNavigationButton}
                                >
                                    <View style={{ flexDirection: 'row' }}>
                                        <Icon style={{padding: 10} }name={'bank'} size ={22}/>
                                        <Text style={{ paddingVertical: 10, fontSize:20 }}> Tip Bank </Text>
                                    </View>
                                </TouchableOpacity>

                                <SavePopUp
                                    visible={this.state.modalVisible}
                                    saved={this.state.alreadySaved}
                                    messageLine1={this.state.alreadySaved ? 'Added to'
                                        : 'Removed from'
                                    }
                                    messageLine2={' Tip Bank'}
                                />
                            </View>

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
        marginLeft: 10,
        fontSize: 30,
        fontWeight: 'bold',
        color: '#fffdd0',
    },
    tipBox: {
        alignSelf: 'center',
        backgroundColor: '#272727',
        borderRadius: 10,
        width: Math.round(Dimensions.get('window').width) - 50,
        padding: 30,
        opacity: 0.90
    },
    textTip: {
        fontSize: 23,
        color: 'white',
    },
    textSource: {
        fontSize: 17,
        fontStyle: 'italic',
        color: 'gray',
    },
    saveButton: {
        backgroundColor: '#272727',
        padding: 5,
    },
    saveButtonText: {
        marginLeft: 10,
        color: 'gray',
        fontSize: 18,
    },
    tipBankButton: {
        backgroundColor: '#fffdd0',
        borderRadius: 10,
        marginLeft: 100,
    }



})




export default TipScreen;