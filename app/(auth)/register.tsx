import React from "react";
import { Text, View } from "react-native";

import { useSafeAreaInsets } from "react-native-safe-area-context";

const RegisterScreen = () => {
	const insets = useSafeAreaInsets();

	return (
		<View style={{ paddingTop: insets.top, paddingBottom: insets.bottom }}>
			<Text>RegisterScreen</Text>
		</View>
	);
};

export default RegisterScreen;
