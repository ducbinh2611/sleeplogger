import React from 'react';
import { View, ScrollView, Text, StyleSheet, Button, Dimensions } from 'react-native';
import { ListItem } from 'react-native-elements';
import TipPopUp from '../container/TipPopUp';
import LinearGradient from 'react-native-linear-gradient';

class SavedTipScreen extends React.Component {
    static navigationOptions = ({ navigation }) => {
        return {
            header: () => null
        }
    }

    state = {
        message: '',
        visible: false,
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
            message: l.name
        })
    }

    truncateString = (message) => {
        if (message.length > 40) {
            return message.substring(0, 40) + '...'
        } else {
            return message
        }
    }

    render() {
        const list = [
            {
                name: 'Amy Farhadsahdusihd uiasdhsaiudhsidb hasuydgasyudgsauygdasuydgsayu',
                subtitle: 'Vice President'
            },
            {
                name: 'Chris Jackson',
                subtitle: 'Vice Chairman'
            },
            // more items
        ]
        return (

            <LinearGradient style={{ flex: 1 }} colors={['#090E2C', '#5220AE']}>
                <ScrollView>
                    <View style={styles.container}>



                        {
                            list.map((l) => (
                                <View
                                    style={styles.listContainer}

                                >
                                    <ListItem
                                        key={l.name}
                                        title={this.truncateString(l.name)}
                                        subtitle={l.subtitle}
                                        onPress={() => {
                                            this.uploadMessage(l);
                                            this.turnOnModal();
                                        }
                                        }
                                        containerStyle={styles.listContainer}
                                        contentContainerStyle={null}


                                    />
                                </View>
                            ))
                        }

                        <Button title='Go back' onPress={this.handleBackButton} />

                        <TipPopUp
                            visible={this.state.visible}
                            onPress={() => { this.setState({ visible: false }) }}
                            message={this.state.message} />
                    </View>
                </ScrollView>
            </LinearGradient>



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


})
export default SavedTipScreen;