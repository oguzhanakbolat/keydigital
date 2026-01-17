import { Colors, Fonts } from "@/constants/theme";
import React, { FC } from "react";
import { Dimensions, StyleSheet, Text, TextInput, View } from "react-native";

const { width } = Dimensions.get("window");

type DateInputProps = {
  label: string;
  placeholder?: string;
  value: string;
  onChangeText: (text: string) => void;
  onBlur: () => void;
  error?: string;
  touched?: boolean;
};

const formatDateInput = (text: string, prevValue: string): string => {
  const digitsOnly = text.replace(/\D/g, "");

  if (prevValue && text.length < prevValue.length) {
    if (prevValue.endsWith("-")) {
      return prevValue.slice(0, -2);
    }
    const newDigits = text.replace(/\D/g, "");
    return formatDigitsToDate(newDigits);
  }

  return formatDigitsToDate(digitsOnly);
};

const formatDigitsToDate = (digits: string): string => {
  let result = "";

  for (let i = 0; i < digits.length && i < 8; i++) {
    const char = digits[i];

    if (i === 0) {
      if (!["0", "1", "2", "3"].includes(char)) {
        result += "0" + char;
        if (result.length === 2) result += "-";
        continue;
      }
      result += char;
    } else if (result.replace(/\-/g, "").length === 1) {
      result += char;
      if (result.replace(/\-/g, "").length === 2) result += "-";
    } else if (result.replace(/\-/g, "").length === 2) {
      if (!["0", "1"].includes(char)) {
        result += "0" + char;
        if (result.replace(/\-/g, "").length === 4) result += "-";
        continue;
      }
      result += char;
    } else if (result.replace(/\-/g, "").length === 3) {
      result += char;
      if (result.replace(/\-/g, "").length === 4) result += "-";
    } else if (result.replace(/\-/g, "").length === 4) {
      if (!["1", "2"].includes(char)) {
        continue; // Geçersiz karakter, atla
      }
      result += char;
    } else if (result.replace(/\-/g, "").length >= 5) {
      result += char;
    }
  }

  return result;
};

const DateInput: FC<DateInputProps> = ({
  label,
  placeholder = "GG.AA.YYYY",
  value,
  onChangeText,
  onBlur,
  error = "",
  touched = false,
}) => {
  const handleChangeText = (text: string) => {
    const formatted = formatDateInput(text, value);
    onChangeText(formatted);
  };

  return (
    <View style={styles.label}>
      <Text style={styles.labelText}>{label}</Text>
      <TextInput
        placeholder={placeholder}
        placeholderTextColor={Colors.text + "80"}
        style={styles.input}
        value={value}
        onChangeText={handleChangeText}
        onBlur={onBlur}
        keyboardType="number-pad"
        maxLength={10} // DD.MM.YYYY = 10 karakter
      />
      {error && touched && <Text style={styles.labelError}>* {error}</Text>}
    </View>
  );
};

export default DateInput;

const styles = StyleSheet.create({
  label: {
    width: width - 32,
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
    width: width - 32,
    borderWidth: 1,
    borderColor: Colors.text + "20",
    backgroundColor: Colors.white,
  },
});
