import { Colors, Fonts } from "@/constants/theme";
import React, { FC } from "react";
import { Dimensions, StyleSheet, Text, TextInput, View } from "react-native";

const { width } = Dimensions.get("window");

type PhoneInputProps = {
  label: string;
  placeholder?: string;
  value: string;
  onChangeText: (text: string) => void;
  onBlur: () => void;
  error?: string;
  touched?: boolean;
  fullRadius?: boolean;
  labelColor?: string;
  required?: boolean;
};

// Format: 05XX XXX XX XX
const formatPhoneNumber = (text: string): string => {
  // Sadece rakamları al
  let digits = text.replace(/\D/g, "");

  // Boşsa boş döndür
  if (digits.length === 0) return "";

  // 0 ile başlamıyorsa 0 ekle
  if (digits[0] !== "0") {
    digits = "0" + digits;
  }

  // Maksimum 11 rakam (05XX XXX XX XX)
  digits = digits.slice(0, 11);

  // Formatlama: 05XX XXX XX XX
  let formatted = "";

  for (let i = 0; i < digits.length; i++) {
    // Boşluk pozisyonları: 4, 7, 9
    if (i === 4 || i === 7 || i === 9) {
      formatted += " ";
    }
    formatted += digits[i];
  }

  return formatted;
};

const PhoneInput: FC<PhoneInputProps> = ({
  label,
  placeholder = "05XX XXX XX XX",
  value,
  onChangeText,
  onBlur,
  error = "",
  touched = false,
  fullRadius = false,
  labelColor = Colors.text,
  required = false,
}) => {
  const handleChangeText = (text: string) => {
    const formatted = formatPhoneNumber(text);
    onChangeText(formatted);
  };

  return (
    <View style={styles.label}>
      <Text style={[styles.labelText, { color: labelColor }]}>{label}{required && <Text style={styles.requiredText}> *</Text>}</Text>
      <TextInput
        placeholder={placeholder}
        placeholderTextColor={Colors.text + "80"}
        style={[styles.input, fullRadius && { borderRadius: 50 }]}
        value={value}
        onChangeText={handleChangeText}
        onBlur={onBlur}
        keyboardType="number-pad"
        maxLength={14} // 05XX XXX XX XX = 14 karakter (11 rakam + 3 boşluk)
      />
      {error && touched && <Text style={styles.labelError}>* {error}</Text>}
    </View>
  );
};

export default PhoneInput;

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
  requiredText: {
    ...Fonts.S14W400,
    color: Colors.danger,
    marginLeft: 4,
  },
});
