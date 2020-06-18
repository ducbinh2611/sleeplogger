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
		isSignUp: false,
		passShown: false,
	};

	handleEyeButton = () => {
		this.setState({
			passShown: !this.state.passShown
		})
	}

	handleUpdateName = name => this.setState({ name });

	handleUpdateEmail = email => this.setState({ email });

	handleUpdatePassword = password => this.setState({ password });

	handleCreateUser = () => firebaseDb.firestore()
		.collection('users')
		.add({
			name: this.state.name,
			email: this.state.email,
			password: this.state.password
		}).then(() => this.setState({
			name: '',
			email: '',
			password: '',
			isSignUp: true,
		})
		).catch(err => console.error(err));

	render() {
		const { navigation } = this.props;
		const { name, email, password, isSignUp, passShown } = this.state;
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
						/>
					</View>

					<View style={styles.inputContainer}>
						<Icon name={'ios-person'}
							size={28}
							color={'rgba(255,255,255,0.7)'}
							style={styles.inputIcon} />
						<TextInput
							style={styles.input}
							placeholder="Email"
							placeholderTextColor={'rgba(255,255,255,0.7)'}
							onChangeText={this.handleUpdateEmail}
							value={email}
						/>
					</View>

					<View style={styles.inputContainer}>
						<Icon name={'ios-lock'}
							size={28}
							color={'rgba(255,255,255,0.7)'}
							style={styles.inputIcon} />
						<TextInput
							secureTextEntry={passShown}
							style={styles.input}
							placeholder=" Password"
							placeholderTextColor={'rgba(255,255,255,0.7)'}
							onChangeText={this.handleUpdatePassword}
							value={password}
						/>

						<TouchableOpacity style={styles.eye} onPress={this.handleEyeButton}>
							<Icon name={'ios-eye'} size={26} color={'rgba(255,255,255,0.7)'} />
						</TouchableOpacity>
					</View>

					<View style={{ marginBottom: 15 }}>
						<TouchableOpacity
							style={styles.logInButton}
							onPress={() => {
								if (
									name.length &&
									email.length &&
									password.length
								) {
									this.handleCreateUser()
								}

							}}
						//this.handleLogIn
						>
							<Text style={styles.logInText}> Sign Up </Text>
						</TouchableOpacity>
					</View>
					
					<TouchableOpacity onPress={() => navigation.navigate('LogInContainer')}>
						<Text style={styles.logInText}>
							Go back to log in page
						</Text>
					</TouchableOpacity>

					<View style={{marginTop: 20}}>
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