import { Colors, Fonts } from "@/constants/theme";
import { CheckListType, CheckProcessType } from "@/types/addCardType";
import React, { FC } from "react";
import { StyleSheet, Text, View } from "react-native";
import Checkbox from "./Checkbox";
import FormLayout from "./FormLayout";
import Input from "./input";

const operations = [
  {
    id: 1,
    label: "Çilingir Hizmeti",
    value: false,
  },
  {
    id: 2,
    label: "Yedek Anahtar",
    value: false,
  },
  {
    id: 3,
    label: "Kayıp Anahtar",
    value: false,
  },
  {
    id: 4,
    label: "Anahtar Mekanik Şifre Değişimi",
    value: false,
  },
  {
    id: 5,
    label: "Anahtar Elektronik Şifre Değişimi",
    value: false,
  },
  {
    id: 6,
    label: "Kontak Tamiri",
    value: false,
  },
  {
    id: 7,
    label: "Anahtar Tamiri",
    value: false,
  },
  {
    id: 8,
    label: "Anahtar Yenileme",
    value: false,
  },
  {
    id: 9,
    label: "Anahtar Yazılım Güncelleme",
    value: false,
  },
];

type CheckProcessProps = {
  setData: (data: CheckProcessType) => void;
  data: CheckProcessType;
  setStep: (step: number) => void;
  step: number;
  isActive: boolean;
};
const CheckProcess: FC<CheckProcessProps> = ({
  setData,
  data,
  setStep,
  step,
  isActive,
}) => {
  const handleOperationPress = (operation: CheckListType) => {
    const index = data.operations.findIndex(
      (o: CheckListType) => o.id === operation.id
    );
    if (index !== -1) {
      setData({
        ...data,
        operations: data.operations.filter(
          (o: CheckListType) => o.id !== operation.id
        ),
      });
    } else {
      setData({
        ...data,
        operations: [...data.operations, operation],
      });
    }
  };

  return (
    <FormLayout
      leftButtonPress={() => setStep(step - 1)}
      rightButtonPress={() => setStep(step + 1)}
      isActive={isActive}
    >
      <Text style={styles.text}>Yapılan işlemleri seçiniz</Text>
      {operations.map((operation) => (
        <Checkbox
          key={operation.id}
          label={operation.label}
          checked={
            data.operations.findIndex(
              (o: CheckListType) => o.id === operation.id
            ) !== -1
          }
          onPress={() => handleOperationPress(operation)}
        />
      ))}
      <View style={{ height: 32 }} />
      <Input
        label="İşlem Notları"
        placeholder="Notları giriniz"
        value={data.notes || ""}
        onChangeText={(text) => setData({ ...data, notes: text })}
        error={""}
        touched={false}
        keyboardType="default"
        onBlur={() => {}}
        rows={5}
      />
    </FormLayout>
  );
};

export default CheckProcess;

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  scrollView: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    flex: 1,
  },
  scrollBottom: {
    height: 10,
  },
  text: {
    ...Fonts.S14W500,
    color: Colors.text,
  },
});
