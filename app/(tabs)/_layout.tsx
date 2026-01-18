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
          name="list"
          options={{
            title: "İş Listesi",
          }}
        />
        <Tabs.Screen
          name="addWork"
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
        <Tabs.Screen
          name="personnel"
          options={{
            title: "Personel",
          }}
        />
        <Tabs.Screen
          name="addPerson"
          options={{
            title: "Personel Ekle",
          }}
        />
        <Tabs.Screen
          name="listWait"
          options={{
            title: "Bekleyen İşler",
          }}
        />
        <Tabs.Screen
          name="work"
          options={{
            title: "İş Detay",
          }}
        />
        <Tabs.Screen
          name="editPersonnel"
          options={{
            title: "Personel Düzenle",
          }}
        />
      </Tabs>
      <SaveFile />
    </>
  );
}
