import React from 'react';
import { Image, StyleSheet } from 'react-native';

class GifImage extends React.Component {
    state = {
        initialized: false
    }

    gifGenerator = () => {
        const randomNumber = Math.floor(Math.random() * 10) // generate random int from 0 -> 9
        const url = null
        if (!this.state.initialized) {
            this.setState({
                initialized: true
            })
            if (randomNumber % 5 === 0) {
                return require('../images/cat_sleep.gif')
            } else if (randomNumber % 5 === 1) {
                return require('../images/chibi_sleep.gif')
            } else if (randomNumber % 5 === 2) {
                return require('../images/dog_sleep.gif')
            } else if (randomNumber % 5 === 3) {
                return require('../images/donald_duck_sleep.gif')
            } else {
                return require('../images/time_to_sleep.gif')
            }
        }
    }

    render() {
        return (
            <Image style={styles.image} source={this.props.source} />
        )
    }
}

const styles = StyleSheet.create({
    image: {
        height: 100,
        width: 100,
    }
})

export default GifImage