import React from 'react';
import {
    Image,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';
import { Icon } from 'react-native-elements';

class ChoiceButton extends React.Component {



    render() {
   
        const { path, onPress, active } = this.props
        


        return (
            <TouchableOpacity
                behavior={'padding'}
                style={active ? styles.choiceButtonActive
                    : styles.buttonInactive}
                onPress={() => {
                    onPress();
                }}

            >

                <Image
                    source={path}
                    style={styles.image}
                />

            </TouchableOpacity>
        )
    }
}


const styles = StyleSheet.create({
    buttonInactive: {
        borderWidth: 1,
        borderColor: 'rgba(0,0,0,0.2)',
        alignItems: 'center',
        justifyContent: 'center',
        width: 50,
        height: 50,
        backgroundColor: '#fff',
        borderRadius: 25,
        marginLeft: 5,
        marginRight: 5,
        marginTop: 5,
    },
    choiceButtonActive: {
        borderWidth: 1,
        borderColor: 'rgba(0,0,0,0.2)',
        alignItems: 'center',
        justifyContent: 'center',
        width: 50,
        height: 50,
        backgroundColor: '#BF327D',
        borderRadius: 25,
        marginLeft: 5,
        marginRight: 5,
        marginTop: 5,
    },
    image: {
        width: 30,
        height: 30,
    }
})

export default ChoiceButton