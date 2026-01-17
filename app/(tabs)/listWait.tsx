import Header from "@/components/Header";
import Icon from "@/constants/icons/Icon";
import { Colors, Fonts } from "@/constants/theme";
import {
  deletePendingWork,
  getPendingWorks,
  PendingWork,
} from "@/utils/pendingWorks";
import { useFocusEffect, useRouter } from "expo-router";
import React, { useCallback, useEffect, useState } from "react";
import {
  Dimensions,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const { width } = Dimensions.get("window");

const List = () => {
  const router = useRouter();
  const [pendingWorks, setPendingWorks] = useState<PendingWork[]>([]);

  const getPendingData = async () => {
    const pendingWorks = await getPendingWorks();
    setPendingWorks(pendingWorks);
  };

  const deletePendingWorkItem = async (id: string) => {
    const success = await deletePendingWork(id);
    if (success) {
      getPendingData();
    }
  };

  useEffect(() => {
    getPendingData();
  }, []);

  useFocusEffect(
    useCallback(() => {
      getPendingData();
    }, [])
  );

  return (
    <View style={styles.container}>
      <Header name="Liste" />

      <FlatList
        data={pendingWorks}
        renderItem={({ item }) => (
          <View style={styles.pendingWorkContainer}>
            <TouchableOpacity
              onPress={() => router.push(`/addWork?pendingId=${item.id}`)}
            >
              <Text>
                {item.data.cardInformation.name
                  ? item.data.cardInformation.name +
                    " " +
                    item.data.cardInformation.surname
                  : item.data.id}
              </Text>
              <Text style={styles.pendingWorkStep}>
                {item.step}. Adımda kaldınız...
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.deleteButton}
              onPress={() => deletePendingWorkItem(item.id)}
            >
              <Icon
                name="circle-close"
                size={24}
                color={Colors.danger + "aa"}
              />
            </TouchableOpacity>
          </View>
        )}
        ListEmptyComponent={() => (
          <View style={styles.emptyContainer}>
            <Icon name="list" size={42} color={Colors.text + "80"} />
            <Text style={styles.emptyText}>Tamamlanmayı Bekleyen İş Yok</Text>
          </View>
        )}
        ListFooterComponent={() => <View style={styles.footerContainer} />}
      />
    </View>
  );
};

export default List;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  pendingWorkContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: width - 16,
    paddingVertical: 10,
    marginHorizontal: 8,
    borderBottomWidth: 1,
    borderBottomColor: Colors.primary + "20",
    borderTopWidth: 1,
    borderTopColor: Colors.white,
  },
  pendingWorkStep: {
    ...Fonts.S12W400,
    color: Colors.text + "80",
  },
  deleteButton: {
    width: 42,
    height: 42,
    justifyContent: "center",
    alignItems: "center",
  },
  footerContainer: {
    height: 140,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 16,
    minHeight: 100,
    width: width - 16,
    margin: 8,
  },
  emptyText: {
    ...Fonts.S14W400,
    color: Colors.text + "80",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: 100,
  },
});
