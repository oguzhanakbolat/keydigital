import Icon from "@/constants/icons/Icon";
import { Colors } from "@/constants/theme";
import { useRouter } from "expo-router";
import React, { FC } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import Button from "./Button";

type SaveButtonsProps = {
  leftButtonPress: () => void;
  rightButtonPress: () => void;
  lastItem?: boolean;
};

const SaveButtons: FC<SaveButtonsProps> = ({
  leftButtonPress,
  rightButtonPress,
  lastItem = false,
}) => {
  const router = useRouter();
  return (
    <View style={styles.buttonContainer}>
      <Button
        title={"Geri"}
        onPress={leftButtonPress}
        half
        secondary
        rightIcon="back"
        leftRadius
      />
      <Button
        title={lastItem ? "Kaydet" : "Devam Et"}
        onPress={rightButtonPress}
        half
        leftIcon={lastItem ? "save" : "next"}
        rightRadius
      />
      <TouchableOpacity
        style={styles.homeButton}
        onPress={() => router.push("/")}
      >
        <Icon name="home" size={32} color={Colors.white} />
      </TouchableOpacity>
    </View>
  );
};

export default SaveButtons;

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },
  homeButton: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: Colors.warning,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 3,
    borderColor: Colors.white,
    position: "absolute",
  },
});
