import React, { Component, useState } from "react";
import {
    Modal,
    Alert,
    StyleSheet,
    Text,
    StatusBar,
    TouchableOpacity,
    View
} from "react-native";
import Icon from 'react-native-vector-icons/AntDesign';
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-community/async-storage';

class TipPopUp extends React.Component {

    handleDeleteButton = () => {
        Alert.alert('Remove this tip',
        'Are you sure you want to remove this tip?',
        [{
            text: 'Yes', onPress: () => {
                AsyncStorage.getItem('token').then(token => {
                    fetch('http://sleep-logger-dev.herokuapp.com/v1/remove_tip', {
                        method: 'POST',
                        headers: {
                            Accept: "application/json, text/plain, */*",
                            "Content-Type": "application/json",
                            Authorization: 'Bearer ' + token,
                        },
                        body: JSON.stringify({
                            id: this.props.id
                        })
                    }
                    )
                        .then(() => alert('Deleted tip successfully'))
                        .catch(err => console.error(err))
                })
            }
        },
        {text: 'No'}])
        
    }
    // AsyncStorage.getItem('token').then(token => {
    //     fetch('http://sleep-logger-dev.herokuapp.com/v1/remove_tip', {
    //         method: 'POST',
    //         headers: {
    //             Accept: "application/json, text/plain, */*",
    //             "Content-Type": "application/json",
    //             Authorization: 'Bearer ' + token,
    //         },
    //         body: JSON.stringify({

    //             id: this.props.id,

    //         })
    //     }
    //     )
    //         .then(() => alert('Deleted tip successfully'))
    //         .catch(err => console.error(err))
    // })
    render() {
        return (
            <View style={{ opacity: 0.5 }}>
                <Modal

                    animationType="fade"
                    transparent={true}
                    visible={this.props.visible}
                >

                    <View style={[styles.centeredView, this.props.visible ? {backgroundColor: 'rgba(0,0,0,0.5)'} : '']}>
                    <StatusBar hidden={true} backgroundColor={'rgba(0,0,0,0.5)'}/>
                    <LinearGradient 
                        style={styles.modalView}
                        colors={[ '#4568dc', '#b06ab3' ]}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                    >


                            <Text style={styles.modalText}> {this.props.message} </Text>

                            <View style={{ marginTop: 10, flexDirection: 'row', justifyContent: 'space-between' }}>

                                <View style={{ paddingLeft: 15 }}>
                                    <TouchableOpacity onPress={this.props.onPress}>
                                        <Icon name={'closecircleo'} size={30} />
                                    </TouchableOpacity>
                                </View>

                                <View style={{ paddingRight: 15 }}>
                                    <TouchableOpacity onPress={this.handleDeleteButton}>
                                        <Icon name={'delete'} size={30} />
                                    </TouchableOpacity>

                                </View>
                            </View>

                        </LinearGradient>
                    </View>
                </Modal>
            </View >
        )
    }
}

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        paddingVertical: 35,
        width: '80%',
        //alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
    },
    openButton: {
        backgroundColor: "#F194FF",
        borderRadius: 20,
        padding: 10,
        elevation: 2
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        fontSize: 25,
        marginBottom: 15,
        paddingLeft: 10,
        textAlign: "left",
        color: 'white'
    },
    source: {
        fontSize: 10,
        color: 'gray',
        textAlign: 'left',
        marginBottom: 10,
    },
    deleteButton: {
        position: 'absolute',
        top: 200,
        right: 10,
    },
    goBackButton: {
        position: 'absolute',
        top: 200,
        left: 10,
    }


});

export default TipPopUp;