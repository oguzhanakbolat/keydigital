import Icon from "@/constants/icons/Icon";
import { Colors, Fonts } from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const Header = ({
  name,
  back = false,
  leftButton,
  rightButton,
  printButton,
}: {
  name: string;
  back?: boolean;
  leftButton?: () => void;
  rightButton?: () => void;
  printButton?: () => void;
}) => {
  const insets = useSafeAreaInsets();
  const router = useRouter();

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      {back ? (
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Icon name="back" size={18} color={Colors.text} />
        </TouchableOpacity>
      ) :  
      !!leftButton ? (
        <TouchableOpacity style={styles.leftButton} onPress={leftButton}>
          <Icon name="back" size={21} color={Colors.text} />
        </TouchableOpacity>
      ) : (
        <View style={styles.leftButton} />
      )}
      <Text style={styles.title}>{name}</Text>
      {rightButton ? (
        <TouchableOpacity style={styles.rightButton} onPress={rightButton}>
          <Icon name="plus" size={21} color={Colors.text} />
        </TouchableOpacity>
      ) : !!printButton ? (
        <TouchableOpacity style={styles.rightButton} onPress={printButton}>
          <Ionicons name="print-outline" size={21} color={Colors.text} />
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
