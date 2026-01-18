import Empty from "@/components/Empty";
import Header from "@/components/Header";
import Icon from "@/constants/icons/Icon";
import { Colors, Fonts } from "@/constants/theme";
import { get } from "@/services";
import { useUserStore } from "@/store/userStore";
import { useFocusEffect, useRouter } from "expo-router";
import React, { useCallback, useState } from "react";
import {
  Dimensions,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const { height } = Dimensions.get("window");

const Item = ({ item }: { item: any }) => {
  const router = useRouter();
  return (
    <TouchableOpacity
      style={styles.item}
      onPress={() => router.push(`/(tabs)/personnel/${item.id}` as any)}
    >
      <View style={styles.iconContainer}>
        <View style={styles.icon}>
          <Icon name="user" size={24} color={Colors.text + "99"} />
        </View>
      </View>
      <View style={styles.itemContent}>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemPhone}>{item.phone}</Text>
      </View>
      <View style={styles.itemRight}>
        <Icon name="next" size={18} color={Colors.text + "99"} />
      </View>
    </TouchableOpacity>
  );
};

const Personnel = () => {
  const { user } = useUserStore();
  const router = useRouter();
  const [personnel, setPersonnel] = useState<any[]>([]);
  const addPersonnel = () => {
    router.push("/(tabs)/addPersonnel");
  };

  const getPersonnel = async () => {
    const response = await get(
      "users?filters[company][$eq]=" + user?.company?.id
    );

    if (response.success) {
      setPersonnel(response.data);
    }
  };

  useFocusEffect(
    useCallback(() => {
      getPersonnel();
    }, [])
  );

  return (
    <View style={styles.container}>
      <Header name="Personel" rightButton={() => addPersonnel()} />
      <View style={styles.content}>
        <FlatList
          showsVerticalScrollIndicator={false}
          style={styles.list}
          data={personnel}
          renderItem={({ item }) => <Item item={item} />}
          ListEmptyComponent={() => (
            <Empty text="Henüz kayıt ettiğiniz personel yok" icon="user" />
          )}
        />
      </View>
    </View>
  );
};

export default Personnel;

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
  list: {
    flex: 1,
    minHeight: height - 230,
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    backgroundColor: Colors.white,
    padding: 16,
    borderRadius: 8,
    marginVertical: 4,
  },
  iconContainer: {
    width: 42,
    height: 42,
    borderRadius: 21,
    borderWidth: 2,
    borderColor: Colors.danger + "50",
    justifyContent: "center",
    alignItems: "center",
    padding: 2,
    position: "relative",
  },
  icon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Colors.danger + "20",
    justifyContent: "center",
    alignItems: "center",
  },
  itemContent: {
    flex: 1,
  },
  itemName: {
    ...Fonts.S14W500,
    color: Colors.text,
  },
  itemPhone: {
    ...Fonts.S12W400,
    color: Colors.text + "99",
    marginTop: 2,
  },
  itemRight: {
    width: 30,
    backgroundColor: Colors.background,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 15,
    textAlign: "right",
  },
});
