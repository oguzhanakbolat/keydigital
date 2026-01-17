import Icon from "@/constants/icons/Icon";
import { Colors, Fonts } from "@/constants/theme";
import { router } from "expo-router";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const Header = ({
  name,
  back,
  rightButton,
}: {
  name: string;
  back?: boolean;
  rightButton?: () => void;
}) => {
  const insets = useSafeAreaInsets();
  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      {back ? (
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Icon name="back" size={18} color={Colors.text} />
        </TouchableOpacity>
      ) : (
        <View style={styles.leftButton} />
      )}
      <Text style={styles.title}>{name}</Text>
      {rightButton ? (
        <TouchableOpacity style={styles.rightButton} onPress={rightButton}>
          <Icon name="plus" size={21} color={Colors.text} />
        </TouchableOpacity>
      ) : (
        <View style={styles.rightButton} />
      )}
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingBottom: 8,
    marginBottom: 8,
    gap: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: Colors.white,
    boxShadow: "0 0 3px 0 rgba(0, 0, 0, 0.1)",
  },
  title: {
    ...Fonts.S16W500,
    color: Colors.text,
    textAlign: "center",
    flex: 1,
  },
  backButton: {
    width: 42,
    height: 42,
    justifyContent: "center",
    alignItems: "flex-start",
  },
  rightButton: {
    width: 42,
    height: 42,
    justifyContent: "center",
    alignItems: "flex-end",
  },
  leftButton: {
    width: 42,
    height: 42,
    justifyContent: "center",
    alignItems: "flex-start",
  },
});
