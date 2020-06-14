import React from 'react';
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Dimensions,
} from 'react-native';
import TextButton from './TextButton';


const QuestionText = (props) => (
    <View style={[styles.container, props.style]}>
        <Text style={styles.header}> {props.question} </Text>
        
        {props.children}
        
    </View>
)

const styles = StyleSheet.create({
    container: {
        borderRadius: 30,
        height: 300,
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
        padding: 10,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
    },
    text: {
        marginTop: 21,
        color: 'white',
        fontWeight: 'bold',
        fontSize: 10,
    }
})

export default QuestionText