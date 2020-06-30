import React, { Component, useState } from "react";
import {
    Modal,
    StyleSheet,
    Text,
    TouchableHighlight,
    View
} from "react-native";

class TipPopUp extends React.Component {
    render() {
        return (
            <View style={styles.centeredView}>
                <Modal
                    
                    animationType="slide"
                    transparent={true}
                    visible={this.props.visible}
                >
                    
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <Text style={styles.modalText}> {this.props.message} </Text>
                            {/* <Text style={styles.source}> From {this.props.source} </Text> */}
                            <TouchableHighlight
                                style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
                                onPress={this.props.onPress}
                                
                            >
                                <Text style={styles.textStyle}>Go back</Text>
                            </TouchableHighlight>
                        </View>
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
        marginTop: 22
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        paddingVertical: 35,
        width: '80%',
        alignItems: "center",
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
        fontSize:18,
        marginBottom: 15,
        textAlign: "center"
    },
    source: {
        fontSize: 10,
        color: 'gray',
        textAlign: 'left',
        marginBottom: 10,
    }


});

export default TipPopUp;