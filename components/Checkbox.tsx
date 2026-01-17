import { Colors, Fonts } from "@/constants/theme";
import React, { FC } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

type CheckboxProps = {
  label: string;
  checked: boolean;
  onPress: () => void;
};

const Checkbox: FC<CheckboxProps> = ({
  label = "",
  checked = false,
  onPress = () => {},
}) => {
  return (
    <TouchableOpacity style={styles.checkbox} onPress={onPress}>
      <View style={[styles.checkboxIcon, checked && styles.checkboxIconActive]}>
        {checked && <View style={styles.checkboxIconChecked} />}
      </View>

      <Text style={styles.checkboxText}>{label}</Text>
    </TouchableOpacity>
  );
};

export default Checkbox;

const styles = StyleSheet.create({
  checkbox: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    gap: 10,
    paddingTop: 12,
  },
  checkboxIcon: {
    width: 16,
    height: 16,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: Colors.text + "60",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.white,
  },
  checkboxIconActive: {
    borderColor: Colors.primary,
    backgroundColor: Colors.primary + "10",
  },
  checkboxText: {
    ...Fonts.S14W400,
    color: Colors.text,
  },
  checkboxIconChecked: {
    width: 8,
    height: 8,
    borderRadius: 3,
    backgroundColor: Colors.primary,
  },
});
