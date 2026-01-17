import Header from "@/components/Header";
import SearchInput from "@/components/SearchInput";
import Icon from "@/constants/icons/Icon";
import { Colors, Fonts } from "@/constants/theme";
import { get } from "@/services";
import { useUserStore } from "@/store";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
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
  const { user } = useUserStore();
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any[]>([]);

  const getData = async () => {
    setLoading(true);
    let url = "/processes";
    
    if(user?.role?.name === "Authenticated") {
      url += "?filters[company][$eq]=" + user?.company?.id;
    } else {
      url += "?filters[user][$eq]=" + user?.id + "&filters[company][$eq]=" + user?.company?.id;
    }
    
    if (search) {
      url += "&filters[name][$containsi]=" + search;
    }
    const response = await get(url);

    if (response.success) {
      setData(response.data.data);
    }
    setLoading(false);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <View style={styles.container}>
      <Header name="Liste" />
      <View style={styles.searchContainer}>
        <SearchInput
          placeholder="Ara"
          value={search}
          onChangeText={setSearch}
          keyboardType="default"
        />
      </View>

      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={Colors.text + "80"} />
        </View>
      ) : (
        <FlatList
          data={data}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.pendingWorkContainer}>
              <TouchableOpacity onPress={() => router.push(`/work/${item.documentId}`)}>
                <Text>{item.name}</Text>
                <Text style={styles.pendingWorkStep}>
                  {item.plate} | {item.brand} {item.model} {item.year}
                </Text>
              </TouchableOpacity>
            </View>
          )}
          ListEmptyComponent={() => (
            <View style={styles.emptyContainer}>
              <Icon name="list" size={42} color={Colors.text + "80"} />
              <Text style={styles.emptyText}>Henüz kayıt ettiğiniz iş yok</Text>
            </View>
          )}
          ListFooterComponent={() => <View style={styles.footerContainer} />}
        />
      )}
    </View>
  );
};

export default List;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  searchContainer: {
    marginHorizontal: 16,
    marginTop: 8,
  },
  pendingWorkContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: width - 32,
    paddingVertical: 10,
    marginHorizontal: 16,
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
