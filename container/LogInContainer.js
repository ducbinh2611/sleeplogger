import React, { Component } from 'react';
import {
	Text, StyleSheet, TextInput,
	KeyboardAvoidingView, ImageBackground, View,
	Dimensions, TouchableOpacity, ActivityIndicator
} from 'react-native';
import { withNavigation } from 'react-navigation';
import AsyncStorage from '@react-native-community/async-storage';
import night from '../images/night.png';
import day from '../images/after_noon.png';
import Icon from 'react-native-vector-icons/Ionicons';

const { width: WIDTH, height: HEIGHT } = Dimensions.get('window')
const url = 'https://sleep-logger-dev.herokuapp.com/authenticate';

class LogInContainer extends React.Component {
	static navigationOptions = ({ navigation }) => {
		return {
			header: () => null,
			gesturesEnabled: false
		}
	}

	state = {
		email: '',
		password: '',
		loading: false,
		passHide: true,
	};

	handleEyeButton = () => {
		this.setState({
			passHide: !this.state.passHide
		})
	}

	validateEmail(email) {
		const re = /\S+@\S+\.\S+/;
		return re.test(email);
	}

	handleUpdateEmail = email => this.setState({ email });

	handleUpdatePassword = password => this.setState({ password });

	handleLogIn = () => {
		const { email, password } = this.state;
		if (email && password) {
			//if (this.validateEmail(email)) {
				const req = {
					'email': email,
					'password': password,
				}
				this.setState({
					loading: true
				});
				fetch('https://sleep-logger-dev.herokuapp.com/authenticate', {
					method: 'POST',
					headers: {
						Accept: "application/json, text/plain, */*",
						"Content-Type": "application/json",
					},
					body: JSON.stringify({

						email: this.state.email,
						password: this.state.password,


					})
				})
					.then(res => {
						const result = res.json()
						return result})
					.then(
						res => {
							this.setState({
								loading: false
							})
							if (res.token !== undefined) {
								AsyncStorage.setItem("token", res.token)
									.then(
										res => {
											this.props.navigation.navigate('MainScreen')
										}
									).catch(err => console.error(err))
							} else {
								alert("Email or password is incorrect")
							}


						}
					).catch(err => console.error(err))
			// } else {
			// 	alert("Invalid email")
			// }
		} else {
			alert("Key in email and password")
		}

	}
	render() {

		const { navigation } = this.props

		const { loading, email, password, passHide } = this.state
		return (
			<ImageBackground source={night} style={styles.container}

			>
				<KeyboardAvoidingView behavior='padding' style={styles.container}>
					<View style={styles.logoContainer}>
						<Text style={styles.logo}>
							SLEEPLOGGER
						</Text>
					</View>

					<View style={styles.inputContainer}>
						<Icon name={'ios-person'}
							size={28}
							color={'rgba(255,255,255,0.7)'}
							style={styles.inputIcon} />
						<TextInput
							autoCapitalize={'none'}
							style={styles.input}
							placeholder="Email"
							placeholderTextColor={'rgba(255,255,255,0.7)'}
							onChangeText={this.handleUpdateEmail}
							value={email}
							onSubmitEditing={() => this.refs.passwordInput.focus()}
						/>
					</View>

					<View style={styles.inputContainer}>
						<Icon name={'ios-lock'}
							size={28}
							color={'rgba(255,255,255,0.7)'}
							style={styles.inputIcon} />
						<TextInput
							secureTextEntry={passHide}
							style={styles.input}
							ref='passwordInput'
							placeholder=" Password"
							placeholderTextColor={'rgba(255,255,255,0.7)'}
							focus={this.state.focusPasswordInput}
							onChangeText={this.handleUpdatePassword}
							value={password}
							onSubmitEditing={this.handleLogIn}
						/>

						<TouchableOpacity style={styles.eye} onPress={this.handleEyeButton}>
							<Icon name={'ios-eye'} size={26} color={'rgba(255,255,255,0.7)'} />
						</TouchableOpacity>
					</View>

					<View style={{ marginBottom: 15 }}>
						<TouchableOpacity
							style={styles.logInButton}
							onPress={this.handleLogIn}
						// () => navigation.navigate('MainScreen') this.handleLogIn
						>
							<Text style={styles.logInText}> Log In </Text>
						</TouchableOpacity>
					</View>

					<TouchableOpacity onPress={() => navigation.navigate('SignUpContainer')}>
						<Text style={styles.logInText}>
							Don't have an account? Sign Up
						</Text>
					</TouchableOpacity>

					{loading &&
						<View style={styles.loading}>
							<ActivityIndicator size='large' />
						</View>
					}
				</KeyboardAvoidingView>
			</ImageBackground>


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
	logoContainer: {
		marginBottom: 15,
	},
	logo: {
		marginBottom: 40,
		fontSize: 30,
		color: 'white',
	},
	inputContainer: {
		marginTop: 10,
	},
	button: {
		marginTop: 42,
	},
	text: {
		fontSize: 20,
		color: 'green',
		marginTop: 40,
	},
	input: {
		width: WIDTH - 55,
		height: 45,
		borderRadius: 25,
		fontSize: 16,
		paddingLeft: 45,
		backgroundColor: 'rgba(0,0,0,0.35)',
		color: 'rgba(255,255,255,0.7)',
		marginHorizontal: 25,
	},
	inputIcon: {
		position: 'absolute',
		top: 8,
		left: 37,
	}, eye: {
		position: 'absolute',
		top: 8,
		right: 37,
	},
	logInButton: {
		width: WIDTH - 55,
		height: 45,
		borderRadius: 25,
		backgroundColor: '#432577',
		justifyContent: 'center',
		marginTop: 20,
	},
	logInText: {
		color: 'rgba(255,255,255,0.7)',
		fontSize: 16,
		textAlign: 'center',
	},
	loading: {
		position: 'absolute',
		left: 0,
		right: 0,
		top: 0,
		bottom: 0,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#F5FCFF88',
	}
});

export default withNavigation(LogInContainer);