import React from "react";
import {
    Modal,
    Alert,
    StyleSheet,
    Text,
    StatusBar,
    TouchableOpacity,
    View
} from "react-native";
import Icon from 'react-native-vector-icons/Entypo';

class SavePopUp extends React.Component {
    render() {
        const { saved } = this.props
        return (
            <View style={{ opacity: 0.5 }}>
                <Modal
                    animationType="fade"
                    transparent={true}
                    visible={this.props.visible}
                >

                    <View style={styles.centeredView}>

                        <View style={styles.box}>
                            <View style={styles.interior}>
                                <Icon name={saved ? 'check' : 'cross'} size={60} color={'white'} />
                                <Text style={styles.text}> {this.props.messageLine1} </Text>
                                <Text style={styles.text}> {this.props.messageLine2} </Text>
                            </View>


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
        opacity: 0.95
    },
    box: {
        width: 150,
        height: 150,
        borderRadius: 20,
        backgroundColor: '#3D3E49',
    },
    interior: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: "center",
        alignItems: "center",
        opacity: 1
    },
    text: {
        marginTop: 10,
        color: 'white',
        fontSize: 15,
        opacity: 1
    }


});

export default SavePopUp;