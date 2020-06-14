import React, {Component} from 'react';
import BlueButton from '../component/BlueButton';
import firebaseDb from '../firebaseDb';
import {  Text, StyleSheet, TextInput, KeyboardAvoidingView } from 'react-native';


class SignUpContainer extends React.Component {
	static navigationOptions = {
		title: 'Sign Up',
	};

	state = {
		name: '',
		email: '',
		password: '',
		isSignUp: false,
	};

	handleUpdateName = name => this.setState({name});

	handleUpdateEmail = email => this.setState({email});

	handleUpdatePassword = password => this.setState({password});

	handleCreateUser = () => firebaseDb.firestore()
								.collection('users')
								.add({
									name: this.state.name,
									email: this.state.email,
									password: this.state.password
								}).then(() => this.setState({
									name:'',
									email:'',
									password:'',
									isSignUp: true,
									})
								).catch(err => console.error(err));

	render() {
		const { navigate } = this.props.navigation;
		const { name, email, password, isSignUp} = this.state;
		return (
			<KeyboardAvoidingView behavior='padding' style={styles.container}>
				<Text style={styles.image}>
					SLEEPLOGGER
				</Text>

				<TextInput
					style={styles.textInput}
					placeholder=" Name"
					onChangeText={this.handleUpdateName}
					value={name}
				/>

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
					onPress={() => {
						if (
							name.length &&
							email.length &&
							password.length
						) {
							this.handleCreateUser()
						}

					}}
				>
					Sign Up
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

export default SignUpContainer