import Icon from "@/constants/icons/Icon";
import { Colors, Fonts } from "@/constants/theme";
import React, { FC, useEffect, useState } from "react";
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
import Input from "./input";

const { width } = Dimensions.get("window");

type AutoSelectBoxProps = {
  label: string;
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  error: string;
  touched: boolean;
  options: string[] | null;
  required?: boolean;
};

const AutoSelectBox: FC<AutoSelectBoxProps> = ({
  label,
  placeholder,
  value,
  onChangeText,
  error,
  touched,
  options,
  required = false,
}) => {
  const [visible, setVisible] = useState(false);
  const [search, setSearch] = useState("");
  const [filteredOptions, setFilteredOptions] = useState<string[] | null>(null);

  const handleChangeText = (text: string) => {
    onChangeText(text);
    setVisible(false);
  };

  useEffect(() => {
    setSearch("");
    setFilteredOptions(options || null);
  }, [visible]);

  useEffect(() => {
    if (search.length > 0) {
      const filteredOptions = options?.filter((option) =>
        option.toLowerCase().includes(search.toLowerCase())
      );

      setFilteredOptions(filteredOptions || null);
    } else {
      setFilteredOptions(options || null);
    }
  }, [search]);

  return (
    <>
      <View style={styles.label}>
        <Text
          style={
            options && options.length > 0
              ? styles.labelText
              : styles.labelTextDisabled
          }
        >
          {label}{required && <Text style={styles.labelTextRequired}> *</Text>}
        </Text>
        <TouchableOpacity
          style={styles.selectBox}
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
              <View style={styles.modelHeaderContainer}>
                <View style={styles.modalContentHeader}>
                  <Text style={styles.modalContentHeaderText}>
                    {placeholder || label}
                  </Text>
                  <TouchableOpacity onPress={() => setVisible(false)}>
                    <Icon name="close" size={24} color={Colors.text} />
                  </TouchableOpacity>
                </View>
                <View style={styles.modelInputContainer}>
                  <Input
                    placeholder="Marka Ara..."
                    value={search}
                    onChangeText={setSearch}
                    error={error}
                    touched={touched}
                    keyboardType="default"
                    maxLength={100}
                    rows={1}
                    w={width - 64}
                  />
                </View>
              </View>
              <ScrollView>
                {filteredOptions &&
                  filteredOptions.length > 0 &&
                  filteredOptions.length > 0 &&
                  filteredOptions.map((option) => (
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

export default AutoSelectBox;

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
    height: 340,
    backgroundColor: Colors.white,
    borderRadius: 10,
    padding: 16,
    gap: 8,
    overflow: "hidden",
  },
  modelHeaderContainer: {
    width: "100%",
    alignItems: "center",
  },
  modalContentHeader: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: 8,
  },
  modelInputContainer: {
    width: "100%",
  },
  modalContentHeaderText: {
    ...Fonts.S18W500,
    color: Colors.text,
    textTransform: "capitalize",
  },
  modalContentHeaderTextRequired: {
    ...Fonts.S18W500,
    color: Colors.danger,
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
