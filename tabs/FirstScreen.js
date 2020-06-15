import React from 'react';
import {Text, View, Button, Image, Modal, TouchableWithoutFeedback, StyleSheet } from 'react-native';
import { MateirialIcons } from '@expo/vector-icons';
import ChoiceButton from '../component/ChoiceButton';
import DiaryContainerMorning from '../container/DiaryContainerMorning';
import DiaryContainerNight from '../container/DiaryContainerNight';
import { TabNavigator } from 'react-navigation';
import Icon from 'react-native-vector-icons/AntDesign';

export default class FirstScreen extends React.Component {
    static navigationOptions = {
        
        //tabBarLabel: 'Diary',
        tabBarIcon: ({color}) => (
            // <Image
            //     source={require('../images/diary.png')}
            //     style={styles.image}
            // >

            // </Image>
            <Icon name={'book'} size={26}/>


        )    
    }

    state = {
        popUpVisible: true
    }

    closePopUp = () => this.setState({
        popUpVisible: false
    })

    render() {
        const { popUpVisible } = this.state
        
        return <MainScreen />
        
        }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#291D54',
        
        justifyContent: 'center',
        alignItems: 'center'
    },
    image: {
        width: 22,
        height: 22,
        tintColor: 'black'
    },
    word: {
        fontSize: 20,
    }
});

var MainScreen = TabNavigator({
    Diary: {screen: DiaryContainerMorning},
    Data: {screen: DiaryContainerNight},
}, {
    tabBarPosition: 'top',
    
    tabBarOptions: {
        activeTintColor: '#C67C3F',
        //activeBackgroundColor: 'grey',
         inactiveTintColor: 'white',
        // inactiveBackgroundColor: 'green',
        labelStyle: {
            fontSize: 16,
            padding: 5,
        },
        style: {
            backgroundColor: '#291D54',
            //position: 'absolute',
            //borderTopRightRadius: 20,
            //borderTopLeftRadius: 20,
            // left: 0,
            // top: 10,
            // right: 0
        }
    },
    
});

{/* <Modal
                    transparent={true}
                    visible={popUpVisible}
                    >
                        <View style={{backgroundColor:"#000000aa", flex: 1}}>
                            <View style={{  backgroundColor:"#ffffff", borderRadius: 10, margin: 50, padding: 40}}>
                                <Button 
                                    title = 'here'
                                    onPress={this.closePopUp}
                                />
                                <Text style={{fontSize: 20}}>
                                    Tips being displayed here
                                </Text>
                                <Text style={{marginTop: 10, fontSize: 15, color: 'blue' }}>
                                    Find it useful? Save it!
                                </Text>
                            </View>

                        </View>
                </Modal> */}