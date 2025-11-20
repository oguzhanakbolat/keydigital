import { useRouter } from "expo-router";
import React from "react";
import {
	Dimensions,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native";

import Background1 from "@/components/bg1";
import Logo from "@/components/logo";
import { Colors, Fonts } from "@/constants/theme";
import { useSafeAreaInsets } from "react-native-safe-area-context";
const { width, height } = Dimensions.get("window");

const WellcomeScreen = () => {
	const insets = useSafeAreaInsets();
	const router = useRouter();

	return (
		<View
			style={[
				styles.container,
				{ paddingTop: insets.top, paddingBottom: insets.bottom },
			]}
		>
			<Background1 size={height} fill={Colors.primary} />
			<Logo size={width * 0.6} fill="white" />
			<View style={styles.content}>
				<Text style={styles.text24}>
					Key Digital&apos;e hoşgeldiniz
				</Text>
				<Text style={styles.text16}>
					Kayıt olarak veya giriş yaparak hem yapmış olduğunuz işleri
					kayıt altına alıp takip edebilirsiniz hem de sizin için
					sunulan teklifleri görebilirsiniz.
				</Text>
			</View>
			<View style={styles.buttons}>
				<TouchableOpacity
					onPress={() => router.push("/(auth)/register")}
					style={styles.button}
				>
					<Text style={styles.buttonText}>Kayıt Ol</Text>
				</TouchableOpacity>
				<TouchableOpacity
					onPress={() => router.push("/(auth)/login")}
					style={styles.button}
				>
					<Text style={styles.buttonText}>Giriş Yap</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
};

export default WellcomeScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "space-between",
		alignItems: "center",
		padding: 20,
		backgroundColor: Colors.primary + "aa",
	},
	content: {
		alignItems: "center",
		justifyContent: "center",
		gap: 20,
	},
	text24: {
		...Fonts.S24W600,
		color: Colors.white,
		textAlign: "center",
	},
	text16: {
		...Fonts.S16W400,
		color: Colors.white,
		textAlign: "center",
		lineHeight: 24,
		paddingHorizontal: 20,
	},
	buttons: {
		gap: 10,
		flexDirection: "row",
	},
	button: {
		backgroundColor: Colors.white,
		padding: 16,
		borderRadius: 5,
		flex: 1,
	},
	buttonText: {
		...Fonts.S16W500,
		color: Colors.primary,
		textAlign: "center",
	},
});
