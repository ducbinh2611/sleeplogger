import React from 'react';
import {
    Text,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';

class TextButton extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            active: false,
        }
    }

    pressButton = () => {
        this.setState({
            active: !this.state.active
        })
    }

    render() {
   
        const { active, text, onPress, short } = this.props
        return (
            <TouchableOpacity
                behavior={'padding'}
                style={short ? (active ? styles.shortButtonActive
                                :styles.shortButtonInactive)
                            : (active ? styles.longButtonActive
                                :styles.longButtonInactive)}
                onPress={() => {
                    onPress();
                }}
            >
                
                <Text style={{
                    fontSize: this.props.size,
                    fontWeight: 'bold',
                    margin: 10,
                }}>
                    {text}
                </Text>
            </TouchableOpacity>
        )
    }
}


const styles = StyleSheet.create({
    longButtonInactive: {
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
    text: {
        fontSize: 6,
        fontWeight: 'bold',
        margin: 10,
    },
    longButtonActive: {
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
    shortButtonInactive: {
        borderWidth: 1,
        borderColor: 'rgba(0,0,0,0.2)',
        alignItems: 'center',
        justifyContent: 'center',
        width: 50,
        height: 50,
        backgroundColor: '#fff',
        borderRadius: 25,
        marginLeft: 20,
        marginRight: 20,
        marginTop: 5,
    },
    shortButtonActive: {
        borderWidth: 1,
        borderColor: 'rgba(0,0,0,0.2)',
        alignItems: 'center',
        justifyContent: 'center',
        width: 50,
        height: 50,
        backgroundColor: '#BF327D',
        borderRadius: 25,
        marginLeft: 20,
        marginRight: 20,
        marginTop: 5,
    },

})

export default TextButton