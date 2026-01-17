import Icon from "@/constants/icons/Icon";
import { Colors, Fonts } from "@/constants/theme";
import React from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";

const { width } = Dimensions.get("window");

const Empty = ({ text, icon }: { text: string; icon: string }) => {
  return (
    <View style={styles.emptyContainer}>
      <Icon name={icon} size={42} color={Colors.text + "80"} />
      <Text style={styles.emptyText}>{text}</Text>
    </View>
  );
};

export default Empty;

const styles = StyleSheet.create({
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 16,
    minHeight: width - 16,
    width: width - 16,
  },
  emptyText: {
    ...Fonts.S14W400,
    color: Colors.text + "80",
    textAlign: "center",
  },
});
