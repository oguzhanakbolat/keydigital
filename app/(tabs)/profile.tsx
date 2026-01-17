import Header from "@/components/Header";
import Icon from "@/constants/icons/Icon";
import { Colors, Fonts } from "@/constants/theme";
import { useUserStore } from "@/store";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const Profile = () => {
  const { logout, user } = useUserStore();
  const router = useRouter();
  const role =
    user?.role?.name === "Authenticated" ? "Şirket Sahibi" : "Şirket Çalışanı";

  return (
    <View style={styles.container}>
      <Header name="Profil" />
      <View style={styles.content}>
        <View style={styles.profileContainer}>
          <View style={styles.profileImage}>
            <View style={styles.profileImageBorder}>
              <View style={styles.profileImageInner}>
                {user?.avatar ? (
                  <Image
                    source={{ uri: user?.avatar }}
                    style={styles.profileImageInnerImage}
                  />
                ) : (
                  <Icon name="user" size={100} color={Colors.white} />
                )}
              </View>
            </View>
            <View style={styles.profileNameContainer}>
              <View style={styles.profileName}>
                <Text style={styles.profileNameText}>
                  {user?.name?.toUpperCase()}
                </Text>
              </View>
            </View>
          </View>
          <View style={styles.profileItem}>
            <Text style={styles.title}>Adınız</Text>
            <Text style={styles.value}>{user?.username}</Text>
          </View>
          <View style={styles.profileItem}>
            <Text style={styles.title}>Email</Text>
            <Text style={styles.value}>{user?.email}</Text>
          </View>
          <View style={styles.profileItem}>
            <Text style={styles.title}>Telefon</Text>
            <Text style={styles.value}>{user?.phone}</Text>
          </View>
          <View style={styles.profileItem}>
            <Text style={styles.title}>Çalıştığı Şirket</Text>
            <Text style={styles.value}>{user?.company?.name}</Text>
          </View>
          <View style={styles.profileItem}>
            <Text style={styles.title}>Rol</Text>
            <Text style={styles.value}>{role}</Text>
          </View>

          <View style={styles.logoutButtonContainer}>
            <TouchableOpacity style={styles.logoutButton} onPress={logout}>
              <Ionicons
                name={"log-out-outline"}
                size={20}
                color={Colors.white}
              />
              <Text style={styles.logoutButtonText}>Çıkış yap</Text>
            </TouchableOpacity>
            {user?.role?.name === "Authenticated" && (
              <>
                <TouchableOpacity
                  style={styles.changePasswordButton}
                  onPress={() => router.push("/(tabs)/changePassword")}
                >
                  <Ionicons
                    name={"lock-closed-outline"}
                    size={20}
                    color={Colors.white}
                  />
                  <Text style={styles.logoutButtonText}>Şifre Değiştir</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>
      </View>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  content: {
    paddingHorizontal: 16,
    paddingBottom: 8,
    marginBottom: 8,
    gap: 8,
  },
  profileContainer: {
    gap: 8,
  },
  profileImage: {
    justifyContent: "center",
    alignItems: "center",
    margin: 16,
    marginBottom: 64,
  },
  profileImageInner: {
    width: 120,
    height: 120,
    borderRadius: 60,
    overflow: "hidden",
    backgroundColor: Colors.primary,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  profileNameContainer: {
    position: "absolute",
    bottom: -20,
    left: 0,
    right: 0,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  profileName: {
    borderRadius: 30,
    backgroundColor: Colors.primary,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderWidth: 2,
    borderColor: Colors.white,
  },
  profileNameText: {
    ...Fonts.S14W500,
    color: Colors.white,
  },
  profileImageBorder: {
    width: 140,
    height: 140,
    borderRadius: 70,
    overflow: "hidden",
    borderWidth: 3,
    borderColor: Colors.primary,
    justifyContent: "center",
    alignItems: "center",
  },
  profileImageInnerImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  profileItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 8,
    borderBottomWidth: 1,
    borderBottomColor: Colors.primary + "20",
    paddingBottom: 8,
    marginBottom: 8,
  },
  title: {
    ...Fonts.S14W500,
    color: Colors.text,
  },
  value: {
    ...Fonts.S14W400,
    color: Colors.text,
  },
  logoutButtonContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    marginTop: 16,
  },
  changePasswordButton: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
    backgroundColor: Colors.primary,
    padding: 8,
    borderRadius: 5,
    width: 150,
    height: 42,
    borderWidth: 1,
    borderColor: Colors.primary,
  },
  logoutButton: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
    backgroundColor: Colors.danger + "aa",
    padding: 8,
    borderRadius: 5,
    width: 150,
    height: 42,
    borderWidth: 1,
    borderColor: Colors.danger + "55",
  },
  logoutButtonText: {
    ...Fonts.S14W500,
    color: Colors.white,
  },
});
