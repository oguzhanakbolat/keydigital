import Icon from "@/constants/icons/Icon";
import { Colors, Fonts } from "@/constants/theme";
import React, { FC } from "react";
import {
  Dimensions,
  KeyboardTypeOptions,
  StyleSheet,
  TextInput,
  View,
} from "react-native";

const { width } = Dimensions.get("window");

type InputProps = {
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  onBlur?: () => void;
  keyboardType: string;
  maxLength?: number;
  rows?: number;
  w?: number;
  textTransform?: "none" | "uppercase" | "lowercase" | "capitalize";
};

const SearchInput: FC<InputProps> = ({
  placeholder,
  value,
  onChangeText,
  onBlur,
  keyboardType,
  maxLength,
  rows = 1,
  w,
  textTransform = "none",
}) => (
  <View style={[styles.label, { width: w ? w : width - 32 }]}>
    <TextInput
      placeholder={placeholder}
      placeholderTextColor={Colors.text + "80"}
      style={[
        styles.input,
        rows > 1 && { height: rows * 28 },
        { width: w ? w : width - 32 },
        textTransform !== "none" && { textTransform: textTransform },
      ]}
      multiline={rows > 1}
      numberOfLines={rows}
      value={value}
      onChangeText={onChangeText}
      onBlur={onBlur}
      keyboardType={keyboardType as KeyboardTypeOptions}
      maxLength={maxLength}
    />
    <View style={styles.searchIconContainer}>
      <Icon name="search" size={21} color={Colors.text + "40"} />
    </View>
  </View>
);

export default SearchInput;

const styles = StyleSheet.create({
  label: {
    marginBottom: 16,
  },
  labelText: {
    ...Fonts.S14W400,
    color: Colors.text,
    marginBottom: 2,
  },
  labelError: {
    ...Fonts.S12W400,
    color: Colors.danger,
    marginTop: 6,
  },
  input: {
    ...Fonts.S14W400,
    color: Colors.text,
    borderRadius: 5,
    paddingLeft: 42,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: Colors.text + "10",
    backgroundColor: Colors.white,
  },
  searchIconContainer: {
    position: "absolute",
    left: 12,
    top: 12,
    zIndex: 10,
  },
});
