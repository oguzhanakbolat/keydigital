import CustomTabBar from "@/components/CustomTabBar";
import SaveFile from "@/components/SaveFile";
import { useUserStore } from "@/store";
import { Redirect, Tabs } from "expo-router";
import React from "react";

export default function TabLayout() {
  const { isAuthenticated } = useUserStore();

  // Login değilse, auth sayfasına yönlendir
  if (!isAuthenticated) {
    return <Redirect href="/(auth)" />;
  }

  return (
    <>
      <Tabs
        tabBar={(props) => <CustomTabBar {...props} />}
        screenOptions={{
          headerShown: false,
          tabBarStyle: { display: "none" },
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "Ana Sayfa",
          }}
        />
        <Tabs.Screen
          name="addperson"
          options={{
            title: "Ekle",
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: "Profil",
          }}
        />
        <Tabs.Screen
          name="changePassword"
          options={{
            title: "Şifre",
          }}
        />
      </Tabs>
      <SaveFile />
    </>
  );
}
