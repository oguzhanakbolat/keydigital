import Icon from "@/constants/icons/Icon";
import { Colors, Fonts } from "@/constants/theme";
import React from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";

const { width } = Dimensions.get("window");

const CustomToast = ({
  type,
  text1,
}: {
  type: "error" | "success" | "info" | "warn";
  text1?: string;
  text2?: string;
  hide?: () => void;
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        {text1 && (
          <Text style={{ ...Fonts.S14W400, color: Colors.text }}>{text1}</Text>
        )}
      </View>
      <View style={styles.iconContainer}>
        {type === "error" ? (
          <View style={styles.errorIcon}>
            <Icon name="close" size={20} color={Colors.white} />
          </View>
        ) : type === "success" ? (
          <View style={styles.successIcon}>
            <Icon name="check" size={20} color={Colors.white} />
          </View>
        ) : type === "info" ? (
          <View style={styles.infoIcon}>
            <Text
              style={{
                ...Fonts.S14W600,
                color: Colors.white,
              }}
            >
              i
            </Text>
          </View>
        ) : type === "warn" ? (
          <View style={styles.warnIcon}>
            <Text
              style={{
                ...Fonts.S14W600,
                color: Colors.white,
              }}
            >
              !
            </Text>
          </View>
        ) : null}
      </View>
    </View>
  );
};

export default CustomToast;

const styles = StyleSheet.create({
  container: {
    width: width - 32,
    borderRadius: 32,
    paddingLeft: 16,
    paddingRight: 8,
    paddingVertical: 8,
    flexDirection: "row",
    marginTop: 16,
    borderWidth: 1,
    borderColor: Colors.secondary,
    backgroundColor: Colors.white,
    boxShadow: "0px 0px 10px 0px rgba(0, 0, 0, 0.1)",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
  },
  textContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  iconContainer: {
    width: 36,
    height: 36,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  errorIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.danger,
  },
  successIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.success,
  },
  infoIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.primary,
  },
  warnIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.warning,
  },
});
