import React from 'react';
import { View, ScrollView, Text, StyleSheet, Button, Dimensions, TouchableOpacity, RefreshControl } from 'react-native';
import { ListItem } from 'react-native-elements';
import TipPopUp from '../container/TipPopUp';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Entypo';
import AsyncStorage from '@react-native-community/async-storage';
let a = 0;

class SavedTipScreen extends React.Component {
    static navigationOptions = ({ navigation }) => {
        return {
            header: () => null
        }
    }

    constructor(props) {
        super(props)
        this.state = {
            list: [],
            message: '',
            visible: false,
            empty: false,
            refreshing: false,
        }
    }

    componentWillMount() {
        this.getTips()
    }

    getTips = () => {
        AsyncStorage.getItem('token').then(token => {
            //console.warn(token);
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
                .then(res => this.setState({
                    list: res
                }))
                //.then(() => console.warn(this.state.list))
                .catch(err => console.error(err))
        })
    }

    refreshFunction = () => {
        this.setState({
            refreshing: true
        })
        this.getTips()
        this.setState({
            refreshing: false,
        })
    }

    handleBackButton = () => {
        this.props.navigation.navigate('DataScreen')
    }

    turnOffModal = () => {
        console.warn('before ' + this.state.visible)
        this.setState = ({
            visible: false,
        })
        console.warn('turn off here ' + this.state.visible)
    }

    turnOnModal = () => {
        this.setState({
            visible: true,
        })
    }

    uploadMessage = (l) => {
        this.setState({
            message: l.content
        })
    }

    uploadSource = (l) => {
        this.setState({
            source: l.subtitle
        })
    }

    checkEmpty = () => {
        AsyncStorage.getItem('cm').then(token => {
            console.warn(token)
            if (token === 'true') {
                this.setState({
                    empty: false
                })
            } else {
                this.setState({
                    empty: true,
                })
            }
        })
    }

    truncateString = (message) => {
        if (message.length > 35) {
            return message.substring(0, 35) + '...'
        } else {
            return message
        }
    }

    render() {
        // const list = [
        //     {
        //         name: 'Amy Farhadsahdusihd uiasdhsaiudhsidb hasuydgasyudgsauygdasuydgsayu',
        //         subtitle: 'National Health Centre'
        //     },
        //     {
        //         name: 'Chris Jackson',
        //         subtitle: 'National Health Centre'
        //     },
        //     // more items
        // ]
        return (

            <LinearGradient style={{ flex: 1 }} colors={['#9C51B6', '#5946B2']}>
                <ScrollView refreshControl={
                    <RefreshControl refreshing={this.state.refreshing} onRefresh={this.refreshFunction} />
                }>
                    {this.state.list.length === 0 &&
                        <View style={styles.emptyContainer}>
                            <View style={styles.emptyTextContainer}>
                                <Text style={styles.emptyText}>
                                    You don't have any saved tips yet
                                </Text>

                            </View>

                            <View style={styles.sadEmoticon}>
                                <Icon style={styles.sadEmoticon} name={'emoji-sad'} size={20}
                                    color={'white'} />
                            </View>

                            <View style={styles.buttonContainer}>

                                <Text style={styles.buttonText}>
                                    Discover more at Tip
                                </Text>

                            </View>

                            
                        </View>
                    }

                    {!this.state.list.length !== 0 &&
                        <View style={styles.container}>



                            {

                                this.state.list.map((l) => (
                                    <View
                                        style={styles.listContainer}

                                    >
                                        <ListItem
                                            key={l.id}
                                            title={this.truncateString(l.content)}

                                            onPress={() => {
                                                this.uploadMessage(l);
                                                //this.uploadSource(l);
                                                this.turnOnModal();
                                            }
                                            }
                                            containerStyle={styles.listContainer}
                                            contentContainerStyle={null}


                                        >

                                        </ListItem>
                                    </View>
                                ))


                            }

                            <TouchableOpacity style={{marginTop: 15, marginBottom: 50,}} onPress={this.handleBackButton}>
                                <Text style={styles.goBackBut}> Go back </Text>
                            </TouchableOpacity>

                            <TipPopUp
                                visible={this.state.visible}
                                onPress={() => { this.setState({ visible: false }) }}
                                message={this.state.message}
                                source={this.state.source} />
                        </View>}
                </ScrollView>
            </LinearGradient >



        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    },
    listContainer: {
        alignSelf: 'center',
        width: Dimensions.get('window').width - 20,
        borderRadius: 30,
        marginTop: 20,
        marginBottom: 20,
        backgroundColor: 'orange'
    },
    emptyContainer: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 200,
    },
    emptyTextContainer: {
        marginTop: 50,
    },
    emptyText: {
        fontSize: 18,
        alignSelf: 'center',
        color: 'white',
    },
    sadEmoticon: {
        position: 'absolute',
        top: 26,
        right: 14,
    },
    buttonContainer: {
        marginTop: 20,
    },
    buttonText: {
        fontSize: 15,
        color: 'white',
        fontWeight: 'bold',
    },
    goBackBut: {
        fontSize: 18,
        color: 'white',
    }
})
export default SavedTipScreen;