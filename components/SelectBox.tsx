import Icon from "@/constants/icons/Icon";
import { Colors, Fonts } from "@/constants/theme";
import React, { FC, useState } from "react";
import {
  Dimensions,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";

const { width } = Dimensions.get("window");

type SelectBoxProps = {
  label: string;
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  error: string;
  touched: boolean;
  options: string[] | null;
  fullRadius?: boolean;
  labelColor?: string;
  required?: boolean;
};

const SelectBox: FC<SelectBoxProps> = ({
  label,
  placeholder,
  value,
  onChangeText,
  error,
  touched,
  options,
  fullRadius = false,
  labelColor = Colors.text,
  required = false,
}) => {
  const [visible, setVisible] = useState(false);

  const handleChangeText = (text: string) => {
    onChangeText(text);
    setVisible(false);
  };

  return (
    <>
      <View style={styles.label}>
        <Text style={[styles.labelText, { color: labelColor }]}>{label}{required && <Text style={styles.labelTextRequired}> *</Text>}</Text>
        <TouchableOpacity
          style={[styles.selectBox, fullRadius && { borderRadius: 50 }]}
          onPress={() =>
            options && options.length > 0
              ? setVisible(true)
              : options && options.length > 0
              ? handleChangeText(options[0])
              : null
          }
        >
          <Text
            style={[
              styles.selectBoxText,
              { color: value ? Colors.text : Colors.text + "80" },
            ]}
          >
            {value || placeholder}
          </Text>
        </TouchableOpacity>
        {error && touched && <Text style={styles.labelError}>* {error}</Text>}
      </View>

      <Modal visible={visible} animationType="fade" transparent={true}>
        <TouchableWithoutFeedback onPress={() => setVisible(false)}>
          <View style={styles.modalBackground}>
            <View style={styles.modalContent}>
              <View style={styles.modalContentHeader}>
                <Text style={styles.modalContentHeaderText}>
                  {placeholder || label}
                </Text>
                <TouchableOpacity onPress={() => setVisible(false)}>
                  <Icon name="close" size={24} color={Colors.text} />
                </TouchableOpacity>
              </View>
              <ScrollView>
                {options &&
                  options.length > 0 &&
                  options.map((option) => (
                    <TouchableOpacity
                      key={option}
                      style={styles.modalContentItem}
                      onPress={() => handleChangeText(option)}
                    >
                      <Text style={styles.modalContentItemText}>{option}</Text>
                    </TouchableOpacity>
                  ))}
              </ScrollView>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </>
  );
};

export default SelectBox;

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
  labelTextRequired: {
    ...Fonts.S14W400,
    color: Colors.danger,
  },
  labelTextDisabled: {
    ...Fonts.S14W400,
    color: Colors.text + "80",
    marginBottom: 2,
  },
  selectBox: {
    borderRadius: 5,
    paddingHorizontal: 8,
    paddingVertical: 12,
    width: width - 32,
    borderWidth: 1,
    borderColor: Colors.text + "20",
    backgroundColor: Colors.white,
  },
  selectBoxText: {
    ...Fonts.S14W400,
  },
  modal: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  modalBackground: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: width - 32,
    maxHeight: 300,
    height: "auto",
    backgroundColor: Colors.white,
    borderRadius: 10,
    padding: 16,
    gap: 8,
    overflow: "hidden",
  },
  modalContentHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.text + "20",
  },
  modalContentHeaderText: {
    ...Fonts.S18W500,
    color: Colors.text,
    textTransform: "capitalize",
  },
  modalContentHeaderClose: {
    ...Fonts.S14W600,
    color: Colors.text,
  },
  modalContentItem: {
    padding: 16,
    borderRadius: 10,
    backgroundColor: Colors.white,
    borderBottomWidth: 1,
    borderBottomColor: Colors.text + "20",
    alignItems: "center",
    justifyContent: "center",
  },
  modalContentItemText: {
    ...Fonts.S14W400,
    color: Colors.text,
  },
});
