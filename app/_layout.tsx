import { usePoppins } from "@/constants/theme";
import { useStore } from "@/store";
import { Stack } from "expo-router";
import { useEffect } from "react";
import "react-native-reanimated";

export default function RootLayout() {
	const [fontsLoaded] = usePoppins();
	const { loginControl } = useStore();

	useEffect(() => {
		loginControl();
	}, []);

	if (!fontsLoaded) {
		return null;
	}

	return (
		<>
			<Stack
				screenOptions={{
					headerShown: false,
				}}
			>
				<Stack.Screen
					name="modal"
					options={{
						presentation: "modal",
						title: "Modal",
						headerShown: true,
					}}
				/>
			</Stack>
		</>
	);
}
