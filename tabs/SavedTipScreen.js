import React from 'react';
import { View, ScrollView, Text, StyleSheet, Dimensions, TouchableOpacity, RefreshControl } from 'react-native';
import { ListItem } from 'react-native-elements';
import TipPopUp from '../component/TipPopUp';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Entypo';
import LoadingSign from '../component/LoadingSign';
import AsyncStorage from '@react-native-community/async-storage';
import TouchableScale from 'react-native-touchable-scale';

class SavedTipScreen extends React.Component {
    static navigationOptions = ({ navigation }) => {
        return {
            header: () => null
        }
    }

    constructor(props) {
        super(props)
        this.state = {
            loading: true,
            list: [],
            message: '',
            id: null,
            visible: false,
            refreshing: false,
            key: 0,
        }
    }

    componentWillMount() {
        this.getTips()
    }

    getTips = () => {
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
                        loading: false
                    })
                })
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
        this.props.navigation.navigate('TipScreen')
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
            message: l.content,
            id: l.id,
        })
    }

    reRender = () => {
        this.componentWillMount()
    }

    truncateString = (message) => {
        if (message.length > 35) {
            return message.substring(0, 35) + '...'
        } else {
            return message
        }
    }

    height = Dimensions.get('window').height

    render() {

        return (
            < LinearGradient style={styles.linearGradientContainer}
                colors={['#9C51B6', '#5946B2']} >
                <ScrollView
                    style={styles.linearGradientContainer}
                    refreshControl={
                        <RefreshControl refreshing={this.state.refreshing} onRefresh={this.refreshFunction} />
                    }>



                    {this.state.loading &&
                        <View style={[styles.container, { marginTop: this.height / 2 - 75 }]}>
                            <LoadingSign />
                        </View>
                    }

                    {!this.state.loading && this.state.list.length === 0 &&
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

                                <TouchableOpacity onPress={this.handleBackButton}>
                                    <Text style={styles.buttonText}>
                                        Discover more 
                                    </Text>
                                </TouchableOpacity>

                            </View>


                        </View>
                    }

                    {!this.state.loading && !this.state.list.length !== 0 &&
                        <View style={styles.container}>
                            {
                                this.state.list.map((l) => (
                                    <ListItem
                                        key={l.id}
                                        title={this.truncateString(l.content)}

                                        onPress={() => {
                                            this.uploadMessage(l);
                                            this.turnOnModal();
                                        }}
                                        containerStyle={styles.firstListContainer}
                                        contentContainerStyle={null}
                                        titleStyle={{ color: 'white', fontWeight: 'bold' }}
                                        Component={TouchableScale}
                                        friction={90} 
                                        tension={100} 
                                        activeScale={0.95}
                                        ViewComponent={LinearGradient}
                                        linearGradientProps={{
                                            colors: ['#FF9800', '#F44336'],
                                            start: { x: 1, y: 0 },
                                            end: { x: 0.2, y: 0 },
                                        }}
                                        chevron={{ color: 'white' }}

                                    >

                                    </ListItem>
                                ))


                            }

                            <TipPopUp
                                visible={this.state.visible}
                                onPress={() => { this.setState({ visible: false }) }}
                                message={this.state.message}
                                id={this.state.id}
                                source={this.state.source}
                                onChange={this.reRender}
                            />


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
    linearGradientContainer: {
        flex: 1,
    },
    firstListContainer: {
        alignSelf: 'center',
        width: Dimensions.get('window').width,
        height: 80,
        borderRadius: 10,
        marginTop: 20,
        marginBottom: 20,
        backgroundColor: 'orange'
    },
    remainingListContainer: {
        alignSelf: 'center',
        width: Dimensions.get('window').width,
        height: 80,
        borderRadius: 10,
        marginTop: -20,
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
        fontSize: 20,
        color: 'white',
        fontWeight: 'bold',
    },
    goBackBut: {
        fontSize: 18,
        color: 'white',
    },
    text: {

    }
})
export default SavedTipScreen;