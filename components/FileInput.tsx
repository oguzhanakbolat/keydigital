import { Colors, Fonts } from "@/constants/theme";
import { saveFilePermanently } from "@/utils/saveImage";
import * as DocumentPicker from "expo-document-picker";
import React, { FC } from "react";
import {
  Alert,
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const { width } = Dimensions.get("window");

type FileInputProps = {
  label?: string;
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  error: string;
  touched: boolean;
  w?: number;
  textTransform?: "none" | "uppercase" | "lowercase" | "capitalize";
  fileType?: string[];
  required?: boolean;
};

const FileInput: FC<FileInputProps> = ({
  label,
  placeholder,
  value,
  onChangeText,
  error,
  touched,
  w,
  textTransform = "none",
  fileType,
  required = false,
}) => {
  const handlePress = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: fileType || ["*/*"],
        copyToCacheDirectory: true,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        const file = result.assets[0];
        // Dosyayı kalıcı konuma kaydet
        const permanentUri = await saveFilePermanently(file.uri, "immobilizer");
        onChangeText(permanentUri);
      }
    } catch {
      Alert.alert("Hata", "Dosya seçilirken bir hata oluştu.");
    }
  };

  return (
    <View style={[styles.label, { width: w ? w : width - 32 }]}>
      {label && <Text style={styles.labelText}>{label}{required && <Text style={styles.requiredText}> *</Text>}</Text>}
      <TouchableOpacity
        style={[styles.input, { width: w ? w : width - 32 }]}
        onPress={handlePress}
      >
        <Text
          style={[
            styles.inputText,
            textTransform !== "none" && { textTransform: textTransform },
            { color: value ? Colors.text : Colors.text + "80" },
          ]}
        >
          {value ? value.split("/").at(-1) : placeholder}
        </Text>
      </TouchableOpacity>

      {error && touched && <Text style={styles.labelError}>* {error}</Text>}
    </View>
  );
};

export default FileInput;

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
    borderRadius: 5,
    paddingHorizontal: 8,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: Colors.text + "20",
    backgroundColor: Colors.white,
  },
  inputText: {
    ...Fonts.S14W400,
    color: Colors.text,
  },
  requiredText: {
    ...Fonts.S14W400,
    color: Colors.danger,
    marginLeft: 4,
  },
});
