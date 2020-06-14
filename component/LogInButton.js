import React from 'react';
import { 
  StyleSheet, 
  Text, 
  TouchableOpacity,
  View 
} from 'react-native';

const LogInButton = props => (
	<TouchableOpacity style={[styles.container, props.style]} onPress={props.onPress}>
		<Text style={styles.text}>{props.children}</Text>
		
	</TouchableOpacity>
)
 
const styles = StyleSheet.create({
	container: {
		borderRadius: 30,
		backgroundColor: '#003D7C'
	},
	text: {
		fontSize: 20,
		width:200,
		height:30,
		borderRadius: 5,
		color: 'white',
		textAlign: 'center'
	},
	
})

export default LogInButton