import React, { Component } from 'react';
import { TouchableOpacity,
        Text,
        ActivityIndicator,
        StyleSheet } from 'react-native'

class SubmitButton extends React.Component {
    state={
        loading: false,
    }

    render() {
        const { loading } = this.state
        return (
            <TouchableOpacity
                                style={styles.button}
                                onPress={() => {
                                    this.setState({
                                        loading: true
                                    })
                                    this.props.onPress()
                                    this.setState({
                                        loading: false
                                    })
                                }}
                            >
                                {!loading && <Text style={styles.textInput}>
                                    Submit
                                </Text>}

                                {loading && <Text style={styles.textInput}>
                                    Submitting... 
                                </Text>} 
            </TouchableOpacity>
        )
    }
}

const styles= StyleSheet.create({
    button: {
        alignItems: 'center',
        paddingHorizontal: 30,
        borderRadius: 20,
        backgroundColor: 'transparent'
    },
    textInput: {
        marginTop: 5,
        marginBottom: 5,
        fontSize: 30,
        fontWeight: 'bold',
        color: 'white',
    },
})

export default SubmitButton