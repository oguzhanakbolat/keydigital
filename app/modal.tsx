import { Link, Redirect } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

import { useStore } from "@/store";

export default function ModalScreen() {
	const { isAuthenticated } = useStore();

	// Login değilse, auth sayfasına yönlendir
	if (!isAuthenticated) {
		return <Redirect href="/(auth)" />;
	}

	return (
		<View style={styles.container}>
			<Text>This is a modal</Text>
			<Link href="/" dismissTo style={styles.link}>
				<Text>Go to home screen</Text>
			</Link>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
		padding: 20,
	},
	link: {
		marginTop: 15,
		paddingVertical: 15,
	},
});
