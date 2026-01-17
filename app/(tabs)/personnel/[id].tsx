import Alert from "@/components/Alert";
import Header from "@/components/Header";
import Icon from "@/constants/icons/Icon";
import { Colors, Fonts } from "@/constants/theme";
import { get, remove } from "@/services";
import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Toast } from "toastify-react-native";

const PersonnelDetail = () => {
  const { id } = useLocalSearchParams();
  const [personnel, setPersonnel] = useState<any>(null);
  const [processes, setProcesses] = useState<any[]>([]);
  const [showModal, setShowModal] = useState(false);

  const getPersonnel = async () => {
    const response = await get(`users/${id}?populate=*`);
    if (response.success) {
      setPersonnel(response.data);

      const res = await get(
        "/processes?filters[user][$eq]=" +
          id +
          "&filters[company][$eq]=" +
          response.data?.company?.id
      );

      setProcesses(res?.data?.meta?.pagination?.total || 0);
    }
  };


  const deletePersonnel = async () => {
    const response = await remove(`users/${id}`);
    if (response.success) {
      Toast.success("Personel başarıyla silindi.");
      router.push("/(tabs)/personnel");
    } else {
      Toast.error("Bir hata oluştu. Lütfen tekrar deneyin.");
    }
  };

  useEffect(() => {
    getPersonnel();
  }, [id]);

  return (
    <View style={styles.container}>
      <Header name="Personel Detay" />
      <View style={styles.content}>
        <View style={styles.profileContainer}>
          <View style={styles.profileImage}>
            <View style={styles.profileImageBorder}>
              <View style={styles.profileImageInner}>
                {personnel?.avatar ? (
                  <Image
                    source={{ uri: personnel?.avatar }}
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
                  {personnel?.name?.toUpperCase()}
                </Text>
              </View>
            </View>
          </View>

          <View style={styles.countContainer}>
            <View style={styles.countItem}>
              <Text style={styles.countItemTitle}>Toplam İş :</Text>
              <Text style={styles.countItemValue}>{processes}</Text>
            </View>
          </View>

          <View style={styles.profileItem}>
            <Text style={styles.title}>Adınız</Text>
            <Text style={styles.value}>{personnel?.name}</Text>
          </View>
          <View style={styles.profileItem}>
            <Text style={styles.title}>Email</Text>
            <Text style={styles.value}>{personnel?.email}</Text>
          </View>
          <View style={styles.profileItem}>
            <Text style={styles.title}>Telefon</Text>
            <Text style={styles.value}>{personnel?.phone}</Text>
          </View>
          <View style={styles.profileItem}>
            <Text style={styles.title}>Çalıştığı Şirket</Text>
            <Text style={styles.value}>{personnel?.company?.name}</Text>
          </View>
          <View style={styles.profileItem}>
            <Text style={styles.title}>Rol</Text>
            <Text style={styles.value}>
              {personnel?.role?.name === "Authenticated"
                ? "Şirket Sahibi"
                : "Şirket Çalışanı"}
            </Text>
          </View>

          <View style={styles.logoutButtonContainer}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => router.push("/(tabs)/personnel")}
            >
              <Ionicons
                name={"arrow-back-outline"}
                size={20}
                color={Colors.white}
              />
              <Text style={styles.logoutButtonText}>Geri</Text>
            </TouchableOpacity>
            {personnel?.role?.name !== "Authenticated" && (
              <TouchableOpacity
                style={styles.logoutButton}
                onPress={() => setShowModal(true)}
              >
                <Ionicons
                  name={"trash-outline"}
                  size={20}
                  color={Colors.white}
                />
                <Text style={styles.logoutButtonText}>Sil</Text>
              </TouchableOpacity>
            )}
            <>
              <TouchableOpacity
                style={styles.changePasswordButton}
                onPress={() =>
                  router.push(("/(tabs)/editPersonnel/" + id) as any)
                }
              >
                <Ionicons
                  name={"pencil-outline"}
                  size={20}
                  color={Colors.white}
                />
                <Text style={styles.logoutButtonText}>Düzenle</Text>
              </TouchableOpacity>
            </>
          </View>
        </View>
      </View>
      <Alert
        showModal={showModal}
        setShowModal={setShowModal}
        title="Personel Sil"
        description="Personel silmek istediğinize emin misiniz?"
        onConfirm={deletePersonnel}
        onCancel={() => setShowModal(false)}
        confirmText="Sil"
        cancelText="İptal"
      />
    </View>
  );
};

export default PersonnelDetail;

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
    marginBottom: 42,
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
    width: 120,
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
    width: 120,
    height: 42,
    borderWidth: 1,
    borderColor: Colors.danger + "55",
  },
  logoutButtonText: {
    ...Fonts.S14W500,
    color: Colors.white,
  },
  backButton: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
    backgroundColor: Colors.warning,
    padding: 8,
    borderRadius: 5,
    width: 120,
    height: 42,
    borderWidth: 1,
    borderColor: Colors.warning + "55",
  },
  countContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 3,
    borderColor: Colors.primary + "50",
    borderRadius: 50,
    padding: 3,
    marginBottom: 24,
  },
  countItem: {
    flex: 1,
    flexDirection: "row",
    gap: 8,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.primary + "55",
    padding: 8,
    borderRadius: 50,
  },
  countItemTitle: {
    ...Fonts.S14W400,
    color: Colors.text + "AA",
  },
  countItemValue: {
    ...Fonts.S24W500,
    color: Colors.text,
  },
});
