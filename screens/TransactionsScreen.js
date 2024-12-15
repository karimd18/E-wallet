import React from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";

export default function TransactionsScreen({ route }) {
	const { account } = route.params; // Get selected account

	const renderTransactionItem = ({ item }) => (
		<View style={styles.transactionItem}>
			<Text style={styles.transactionType}>
				{item.type.charAt(0).toUpperCase() + item.type.slice(1)} Transaction
			</Text>
			<Text style={styles.transactionDescription}>{item.description}</Text>
			<Text style={styles.transactionAmount}>
				Amount: ${item.amount.toLocaleString()}
			</Text>
			<Text style={styles.transactionDate}>
				Date: {new Date(item.date).toLocaleString()}
			</Text>
		</View>
	);

	return (
		<View style={styles.container}>
			<Text style={styles.title}>{account.name} Transactions</Text>
			<FlatList
				data={account.transactions}
				keyExtractor={(item) => item.id.toString()}
				renderItem={renderTransactionItem}
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
	transactionItem: {
		backgroundColor: "#fff",
		padding: 15,
		borderRadius: 10,
		marginBottom: 15,
	},
	transactionType: { fontSize: 16, fontWeight: "bold" },
	transactionDescription: { fontSize: 14, marginTop: 5, color: "gray" },
	transactionAmount: { fontSize: 14, marginTop: 5, color: "#007AFF" },
	transactionDate: { fontSize: 12, marginTop: 5, color: "gray" },
});
