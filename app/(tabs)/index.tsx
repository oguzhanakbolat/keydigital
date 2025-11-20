import { useStore } from "@/store";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function HomeScreen() {
	const { logout } = useStore();
	return (
		<View style={styles.container}>
			<Text>Home</Text>
			<TouchableOpacity onPress={logout}>
				<Text>Çıkış Yap</Text>
			</TouchableOpacity>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	titleContainer: {
		flexDirection: "row",
		alignItems: "center",
		gap: 8,
	},
	stepContainer: {
		gap: 8,
		marginBottom: 8,
	},
	reactLogo: {
		height: 178,
		width: 290,
		bottom: 0,
		left: 0,
		position: "absolute",
	},
});
