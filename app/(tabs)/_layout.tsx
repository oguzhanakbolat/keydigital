import { Redirect, Tabs } from "expo-router";
import React from "react";

import { Colors } from "@/constants/theme";
import { useStore } from "@/store";

export default function TabLayout() {
	const { isAuthenticated } = useStore();

	// Login değilse, auth sayfasına yönlendir
	if (!isAuthenticated) {
		return <Redirect href="/(auth)" />;
	}

	return (
		<Tabs
			screenOptions={{
				tabBarActiveTintColor: Colors.tint,
				headerShown: false,
			}}
		>
			<Tabs.Screen
				name="index"
				options={{
					title: "Home",
				}}
			/>
			<Tabs.Screen
				name="explore"
				options={{
					title: "Explore",
				}}
			/>
		</Tabs>
	);
}
