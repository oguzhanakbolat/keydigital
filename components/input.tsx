import { Colors, Fonts } from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";
import React, { FC, useEffect, useState } from "react";
import {
  Dimensions,
  KeyboardTypeOptions,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const { width } = Dimensions.get("window");

type InputProps = {
  label?: string;
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  onBlur?: () => void;
  keyboardType: string;
  error: string;
  touched: boolean;
  maxLength?: number;
  rows?: number;
  w?: number;
  textTransform?: "none" | "uppercase" | "lowercase" | "capitalize";
  secureTextEntry?: boolean;
  labelColor?: string;
  leftIcon?: string;
  fullRadius?: boolean;
  required?: boolean;
};

const Input: FC<InputProps> = ({
  label,
  placeholder,
  value,
  onChangeText,
  onBlur,
  keyboardType,
  error,
  touched,
  maxLength,
  rows = 1,
  w,
  textTransform = "none",
  secureTextEntry = false,
  labelColor = Colors.text,
  leftIcon,
  fullRadius = false,
  required = false,
}) => {
  const [showPassword, setShowPassword] = useState(secureTextEntry);

  useEffect(() => {
    setShowPassword(secureTextEntry);
  }, [secureTextEntry]);

  return (
    <View style={[styles.label, { width: w ? w : width - 32 }]}>
      {label && <Text style={[styles.labelText, { color: labelColor }]}>{label}{required && <Text style={styles.requiredText}> *</Text>}</Text>}
      <TextInput
        placeholder={placeholder}
        placeholderTextColor={Colors.text + "80"}
        style={[
          styles.input,
          rows > 1 && { height: rows * 28 },
          { width: w ? w : width - 32 },
          textTransform !== "none" && { textTransform: textTransform },
          { paddingLeft: leftIcon ? 42 : 16 },
          fullRadius && { borderRadius: 50 },
        ]}
        multiline={rows > 1}
        numberOfLines={rows}
        value={value}
        onChangeText={onChangeText}
        onBlur={onBlur}
        keyboardType={keyboardType as KeyboardTypeOptions}
        maxLength={maxLength}
        secureTextEntry={showPassword}
      />
      {leftIcon && 
        <View style={[styles.leftIconContainer, { top: label ? 30 : 9 }]}>
          <Ionicons name={leftIcon as any} size={27} color={Colors.text + "80"} />
        </View>
      }
      {secureTextEntry && (
        <TouchableOpacity
          style={styles.showPasswordButton}
          onPress={() => setShowPassword(!showPassword)}
        >
          <Ionicons
            name={showPassword ? "eye-outline" : "eye-off-outline"}
            size={24}
            color={Colors.text + "80"}
          />
        </TouchableOpacity>
      )}
      {error && touched && <Text style={styles.labelError}>* {error}</Text>}
    </View>
  );
};

export default Input;

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
    paddingHorizontal: 8,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: Colors.text + "20",
    backgroundColor: Colors.white,
  },
  showPasswordButton: {
    position: "absolute",
    right: 10,
    top: 30,
    zIndex: 10,
    backgroundColor: Colors.white,
    borderRadius: 5,
    padding: 3,
    height: 30,
    width: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  leftIconContainer: {
    position: "absolute",
    left: 8,
    zIndex: 10,
  },
  requiredText: {
    ...Fonts.S14W400,
    color: Colors.danger,},
});
