import React, { useState, useRef } from "react";
import {
	View,
	Text,
	TextInput,
	StyleSheet,
	Alert,
	TouchableOpacity,
	Modal,
	Keyboard,
} from "react-native";
import * as Clipboard from "expo-clipboard";
import OTPInputView from "@twotalltotems/react-native-otp-input";

export default function LoginScreen({ navigation }) {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [isOtpVisible, setOtpVisible] = useState(false);
	const [otp, setOtp] = useState(""); // Generated OTP
	const [enteredOtp, setEnteredOtp] = useState(""); // User-inputted OTP
	const otpRef = useRef(null); // Reference for OTP Input

	const defaultUsername = "admin";
	const defaultPassword = "final@2023";

	// Generate a 4-digit OTP
	const generateOtp = () => Math.floor(1000 + Math.random() * 9000).toString();

	// Handle Login
	const handleLogin = () => {
		if (username === defaultUsername && password === defaultPassword) {
			const generatedOtp = generateOtp();
			setOtp(generatedOtp);
			console.log("Generated OTP:", generatedOtp); // Log OTP for debugging
			setOtpVisible(true);
		} else {
			Alert.alert("Error", "Invalid username or password.");
		}
	};

	// Handle OTP Verification
	const handleVerifyOtp = () => {
		if (enteredOtp === otp) {
			Alert.alert("Success", "OTP Verified Successfully!");
      setOtpVisible(false);
      navigation.navigate("Accounts");
    } else {
			Alert.alert("Error", "Invalid OTP. Please try again.");
		}
	};

	// Focus OTP Input on Modal Display
	const focusOtpInput = () => {
		otpRef.current && otpRef.current.focusField(0); // Focus the first OTP field
	};

	return (
		<View style={styles.container}>
			<Text style={styles.title}>Login</Text>
			<TextInput
				style={styles.input}
				placeholder="Username"
				value={username}
				onChangeText={setUsername}
			/>
			<TextInput
				style={styles.input}
				placeholder="Password"
				value={password}
				onChangeText={setPassword}
				secureTextEntry
			/>
			<TouchableOpacity style={styles.button} onPress={handleLogin}>
				<Text style={styles.buttonText}>Login</Text>
			</TouchableOpacity>

			{/* OTP Modal */}
			<Modal
				visible={isOtpVisible}
				transparent
				animationType="slide"
				onShow={focusOtpInput} // Automatically focus OTP input on modal display
			>
				<View style={styles.modalContainer}>
					<View style={styles.modalContent}>
						<Text style={styles.title}>Confirm OTP</Text>
						<Text style={styles.subtitle}>
							Enter the 4-digit OTP sent to your phone number.
						</Text>

						{/* OTP Input */}
						<TouchableOpacity
							activeOpacity={1}
							onPress={focusOtpInput} // Allow manual focusing when pressed
						>
							<OTPInputView
								ref={otpRef} // Add reference to OTP input
								style={styles.otpInput}
								pinCount={4}
								code={enteredOtp} // Display pasted OTP
								autoFocusOnLoad={true} // Automatically focus
								codeInputFieldStyle={styles.otpBox}
								codeInputHighlightStyle={styles.otpBoxActive}
								keyboardType="number-pad"
								onCodeChanged={(code) => setEnteredOtp(code)}
								onCodeFilled={(code) => setEnteredOtp(code)}
							/>
						</TouchableOpacity>

						<TouchableOpacity
							style={styles.verifyButton}
							onPress={handleVerifyOtp}
						>
							<Text style={styles.verifyButtonText}>Verify OTP</Text>
						</TouchableOpacity>
					</View>
				</View>
			</Modal>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		padding: 20,
		backgroundColor: "#f7f7f7",
	},
	title: {
		fontSize: 24,
		fontWeight: "bold",
		marginBottom: 20,
		textAlign: "center",
	},
	input: {
		height: 50,
		borderColor: "#ccc",
		borderWidth: 1,
		marginBottom: 15,
		padding: 10,
		borderRadius: 5,
		backgroundColor: "#fff",
	},
	button: {
		backgroundColor: "#007AFF",
		paddingVertical: 15,
		borderRadius: 5,
		alignItems: "center",
	},
	buttonText: {
		color: "white",
		fontSize: 16,
		fontWeight: "bold",
	},
	modalContainer: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "rgba(0, 0, 0, 0.5)",
	},
	modalContent: {
		backgroundColor: "white",
		padding: 20,
		borderRadius: 10,
		width: "90%",
		alignItems: "center",
	},
	subtitle: {
		fontSize: 14,
		color: "gray",
		marginBottom: 20,
		textAlign: "center",
	},
	otpInput: {
		width: "80%",
		height: 100,
	},
	otpBox: {
		width: 50,
		height: 50,
		borderWidth: 1,
		borderColor: "#ccc",
		borderRadius: 10,
		fontSize: 20,
		color: "#000",
		textAlign: "center",
	},
	otpBoxActive: {
		borderColor: "#007AFF",
	},
	buttonContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
		width: "100%",
		marginTop: 20,
	},
	actionButton: {
		backgroundColor: "#007AFF",
		padding: 10,
		borderRadius: 5,
		alignItems: "center",
		width: "45%",
	},
	actionButtonText: {
		color: "white",
		fontWeight: "bold",
		textAlign: "center",
	},
	verifyButton: {
		backgroundColor: "#007AFF",
		paddingVertical: 15,
		borderRadius: 5,
		marginTop: 20,
		width: "100%",
		alignItems: "center",
	},
	verifyButtonText: {
		color: "white",
		fontSize: 16,
		fontWeight: "bold",
	},
});
