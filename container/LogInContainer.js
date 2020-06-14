import React, {Component} from 'react';
import BlueButton from '../component/BlueButton';
import firebaseDb from '../firebaseDb';
import {  Text, StyleSheet, TextInput, KeyboardAvoidingView } from 'react-native';
import { withNavigation } from 'react-navigation';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';


class LogInContainer extends React.Component {
	static navigationOptions = {
		title: 'Log In',
	};

	state = {
		email: '',
		password: '',
		loading: false,
	};

	handleUpdateEmail = email => this.setState({email});

	handleUpdatePassword = password => this.setState({password});

	handleLogIn = () => {
		const { email, password } = this.state;
		if (email && password) {
			const req = {
				'email': email,
				'password': password,
			}
			this.setState({
				loading: true
			});
			axios.post('https://reqres.in/api/login', req)
				.then(
					res => {
						this.setState({
							loading: false
						})
						
						AsyncStorage.setItem("token", res.data.token)
								.then(
									res => {
										this.props.navigation.navigate('MainScreen')
									}
								)
						
					},
					err => {
						alert("Email or password is incorrect")
					}
				)
		} else {
			alert("Key in email and password")
		}
		
	}
	render() {
		
		const { navigation } = this.props

		const { loading, email, password, isSignUp} = this.state
		return (
			<KeyboardAvoidingView behavior='padding' style={styles.container}>
				<Text style={styles.image}>
					SLEEPLOGGER
				</Text>

				

				<TextInput
					style={styles.textInput}
					placeholder=" Email"
					onChangeText={this.handleUpdateEmail}
					value={email}
				/>
				<TextInput
					secureTextEntry={true}
					style={styles.textInput}
					placeholder=" Password"
					onChangeText={this.handleUpdatePassword}
					value={password}
				/>

				<BlueButton
					style={styles.button}
					onPress={() => navigation.navigate('MainScreen')}
					//this.handleLogIn
				>
					Log In
				</BlueButton>
				{
					isSignUp && <Text style={styles.text}> Sign Up Successfully</Text>
				}
			</KeyboardAvoidingView>

		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
	},
	image: {
		marginBottom: 40,
		fontSize: 30,
	},
	textInput: {
		borderRadius: 30,
		borderWidth: 1,
		borderColor: 'black',
		fontSize: 20,
		marginBottom: 8,
		width: 200,
		height: 30,
	},
	button: {
		marginTop: 42,
	},
	text: {
		fontSize: 20,
		color: 'green',
		marginTop: 40,
	},
});

export default withNavigation(LogInContainer);