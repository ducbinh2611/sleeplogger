import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';

class LoadingSign extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <View style={styles.container}>
                <ActivityIndicator size={'large'} color={'white'}/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
    }
})

export default LoadingSign