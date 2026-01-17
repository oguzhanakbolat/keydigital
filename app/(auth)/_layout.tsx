import { Redirect, Stack } from "expo-router";
import React from "react";

import { useUserStore } from "@/store";

export default function AuthLayout() {
  const { isAuthenticated } = useUserStore();

  if (isAuthenticated) {
    return <Redirect href="/(tabs)" />;
  }

  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="index" />
      <Stack.Screen name="login" />
      <Stack.Screen name="register" />
    </Stack>
  );
}
