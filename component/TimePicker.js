import React, { useState } from 'react';
import { 
  StyleSheet, 
  Text, 
  TouchableOpacity,
  View,
  Dimensions,
} from 'react-native';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from 'moment';
class TimePicker extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isPickerVisible: false,
            chosenDate: '',
            chosenDateObj: null,
        }
        
    }

    handlePicker = (dateTime) => {
        //console.warn(dateTime)
        this.setState({
            isPickerVisible: false,
            chosenDate: moment(dateTime).format('LT'),
            chosenDateObj: dateTime,
        })
        
        this.props.onChange(dateTime)
    }

    showPicker = () => {
        this.setState({
            isPickerVisible: true,
        })
    }

    hidePicker = () => {
        this.setState({
            isPickerVisible: false,
        })
    }
    
    render() {
        return (
    
        <View style={[styles.container, this.props.style]}>
            <Text style={styles.header}> 
                {this.props.question} {this.state.chosenDate} 
            </Text>
            
            <TouchableOpacity 
                style={styles.button}
                onPress={this.showPicker}>
                    <Text style={styles.textInButton}>
                        Select Time
                    </Text>
            </TouchableOpacity>

            <DateTimePickerModal
                isVisible={this.state.isPickerVisible}
                onConfirm={this.handlePicker}
                onCancel={this.hidePicker}
                headerTextIOS={'Select time'}
                
                mode={'time'}
                locale={"en"}
            />
                
            
        </View>
        )
    }}

const styles = StyleSheet.create({
    container: {
        borderRadius: 30,
        height: 100,
        width: Math.round(Dimensions.get('window').width) - 50,
        flexDirection: 'column',
        backgroundColor: '#6337A6',
        justifyContent: 'center',
        alignItems: 'center',
    }, 
    header: {
        fontSize: 20,
        color: 'white',
    },
    options: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
    },
    button: {
        marginTop: 5,
        padding: 10,
        backgroundColor: '#6337A6',
        borderRadius: 30,
        borderColor: '#EFCEB2',
        borderWidth: 0.5
    },
    textInButton: {
        fontSize: 20,
        color: 'white',
        fontWeight: 'bold'
    }
})

export default TimePicker