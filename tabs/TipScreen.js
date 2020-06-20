import React from 'react';
import Icon from 'react-native-vector-icons/AntDesign';
import { View, StyleSheet, Dimensions, Text, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-community/async-storage';

class TipScreen extends React.Component {
    static navigationOptions = {
        tabBarIcon: ({ color }) => (
            <Icon name={'like2'} size={20} />
        )
    }

    state = {
        message: 'This is a test for the tip message being displayedadasdasdgasyudfgasyudfgayudfasytdfvasytdfastydcasytfdytasfdasytfdtyasfy',
        source: 'source',
    }

    // componentDidMount = () => {

    // }
    
    handleSaveButton = () => {
        AsyncStorage.setItem('tip', JSON.stringify(true)).then(() => alert('done'))
    }
    // refresh tip?

    render() {
        return (

            
                <LinearGradient style={{flex : 1}} colors={['#090E2C', '#5220AE']}>
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
        height:500,
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
        color: 'blue',
    }



})




export default TipScreen;