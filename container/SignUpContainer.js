import React, { Component } from 'react';
import BlueButton from '../component/BlueButton';
import firebaseDb from '../firebaseDb';
import { View, Text, StyleSheet, TextInput, KeyboardAvoidingView, ImageBackground, Dimensions, TouchableOpacity } from 'react-native';
import night from '../images/night.png';
import day from '../images/after_noon.png';
import Icon from 'react-native-vector-icons/Ionicons';

const { width: WIDTH, height: HEIGHT } = Dimensions.get('window')

class SignUpContainer extends React.Component {
	static navigationOptions = ({ navigation }) => {
		return {
			header: () => null
		}
	}

	state = {
		name: '',
		email: '',
		password: '',
		password_confirmation: '',
		isSignUp: false,
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

	handleUpdateName = name => this.setState({ name });

	handleUpdateEmail = email => this.setState({ email });

	handleUpdatePassword = password => this.setState({ password });

	handleUpdatePasswordCofm = password_confirmation => this.setState({ password_confirmation });

	reset = () => {
		this.setState({
			name: '',
			email: '',
			password: '',
			password_confirmation: '',
			isSignUp: true,
		})
	}

	handleSubmitButton = () => {
		const { name, email, password, password_confirmation } = this.state
		if (this.validateEmail(email)) {
			if (password === password_confirmation) {
				fetch('http://sleep-logger-dev.herokuapp.com/users', {
					method: 'POST',
					headers: {
						Accept: "application/json, text/plain, */*",
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						user: {
							name: name,
							email: email,
							password: password,
							password_confirmation: password_confirmation,
						}

					})
				}).then(res => res.json())
					.then(res => {
						this.reset()
					})
					.catch(err => console.error(err))
			} else {
				alert('Passwords do not match')
			}
		} else {
			alert('Input email is not valid')
		}
	}

	submitEvent = () => {
		const { name, email, password, password_confirmation } = this.state
		if (
			name.length &&
			email.length &&
			password.length &&
			password_confirmation.length
		) {
			this.handleSubmitButton()
		} else {
			alert('Please key in all data')
		}
	}

	render() {
		const { navigation } = this.props;
		const { name, email, password, password_confirmation, isSignUp, passHide } = this.state;
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
							style={styles.input}
							placeholder="Name"
							placeholderTextColor={'rgba(255,255,255,0.7)'}
							onChangeText={this.handleUpdateName}
							value={name}
							onSubmitEditing={this.submitEvent}
						/>
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
							onSubmitEditing={this.submitEvent}
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
							placeholder=" Password"
							placeholderTextColor={'rgba(255,255,255,0.7)'}
							onChangeText={this.handleUpdatePassword}
							value={password}
							onSubmitEditing={this.submitEvent}
						/>

						<TouchableOpacity style={styles.eye} onPress={this.handleEyeButton}>
							<Icon name={'ios-eye'} size={26} color={'rgba(255,255,255,0.7)'} />
						</TouchableOpacity>
					</View>

					<View style={styles.inputContainer}>
						<Icon name={'ios-lock'}
							size={28}
							color={'rgba(255,255,255,0.7)'}
							style={styles.inputIcon} />
						<TextInput
							secureTextEntry={passHide}
							style={styles.input}
							placeholder=" Confirm Password"
							placeholderTextColor={'rgba(255,255,255,0.7)'}
							onChangeText={this.handleUpdatePasswordCofm}
							value={password_confirmation}
							onSubmitEditing={this.submitEvent}
						/>

						<TouchableOpacity style={styles.eye} onPress={this.handleEyeButton}>
							<Icon name={'ios-eye'} size={26} color={'rgba(255,255,255,0.7)'} />
						</TouchableOpacity>
					</View>

					<View style={{ marginBottom: 15 }}>
						<TouchableOpacity
							style={styles.logInButton}
							onPress={this.submitEvent}
						>
							<Text style={styles.logInText}> Sign Up </Text>
						</TouchableOpacity>
					</View>

					<TouchableOpacity onPress={() => navigation.navigate('LogInContainer')}>
						<Text style={styles.logInText}>
							Go back to log in page
						</Text>
					</TouchableOpacity>

					<View style={{ marginTop: 20 }}>
						{
							isSignUp && <Text style={styles.successfulText}> Sign Up Successfully</Text>
						}
					</View>
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
	successfulText: {
		color: 'orange',
		fontSize: 20,
		textAlign: 'center',
	}
});

export default SignUpContainer