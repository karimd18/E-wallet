import React, { useState, useEffect } from "react";
import {
	View,
	Text,
	FlatList,
	TouchableOpacity,
	StyleSheet,
} from "react-native";

export default function AccountsScreen({ navigation }) {
	const [accounts, setAccounts] = useState([]);

	// Fetch accounts from the JSON file
	useEffect(() => {
		const fetchAccounts = async () => {
			const response = require("../data/accounts.json");
			setAccounts(response.accounts); // Access "accounts" array
		};
		fetchAccounts();
	}, []);

	const renderAccountItem = ({ item }) => (
		<TouchableOpacity
			style={styles.accountItem}
			onPress={
				() => navigation.navigate("Transactions", { account: item }) // Pass account to Transactions Screen
			}
		>
			<Text style={styles.accountName}>{item.name}</Text>
			<Text style={styles.accountBalance}>
				Balance: {item.currency} {item.balance.toLocaleString()}
			</Text>
		</TouchableOpacity>
	);

	return (
		<View style={styles.container}>
			<Text style={styles.title}>Accounts</Text>
			<FlatList
				data={accounts}
				keyExtractor={(item) => item.id.toString()}
				renderItem={renderAccountItem}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: { flex: 1, padding: 20, backgroundColor: "#f7f7f7" },
	title: {
		fontSize: 24,
		fontWeight: "bold",
		marginBottom: 20,
		textAlign: "center",
	},
	accountItem: {
		backgroundColor: "#fff",
		padding: 15,
		borderRadius: 10,
		marginBottom: 15,
	},
	accountName: { fontSize: 18, fontWeight: "bold" },
	accountBalance: { fontSize: 14, color: "gray" },
});
