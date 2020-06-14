import React from 'react';
import { 
  StyleSheet, 
  Text, 
  TouchableOpacity,
  View,
  Dimensions,
} from 'react-native';
import ChoiceButton from './ChoiceButton';

const Question = (props) => (
    <View style={[styles.container, props.style]}>
        <Text style={styles.header}> {props.question} </Text>
        <View style={styles.options}>
            {props.children}
        </View>
    </View>
)

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
    }
})

export default Question