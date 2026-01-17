import { RequiredInformationType } from "@/types/addCardType";
import { useFormik } from "formik";
import React, { FC, useEffect, useRef } from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import FileInput from "./FileInput";
import FormLayout from "./FormLayout";
import Input from "./input";

const { height } = Dimensions.get("window");

const initialValues: RequiredInformationType = {
  mechanicalPasswordCode: "",
  pinCode: "",
  csCode: "",
  immobilizerFile: "",
  piece: null,
};

type RequiredInformationProps = {
  setStep: (step: number) => void;
  setData: (data: RequiredInformationType) => void;
  list: RequiredInformationType;
  step: number;
  isActive: boolean;
};

const RequiredInformation: FC<RequiredInformationProps> = ({
  setStep,
  setData,
  list,
  step,
  isActive,
}) => {
  const ref = useRef<KeyboardAwareScrollView>(null);
  const formik = useFormik({
    initialValues,
    onSubmit: (values) => {
      setData(values);
      setStep(step + 1);
    },
  });

  useEffect(() => {
    formik.setFieldValue("mechanicalPasswordCode", list.mechanicalPasswordCode);
    formik.setFieldValue("pinCode", list.pinCode);
    formik.setFieldValue("csCode", list.csCode);
    formik.setFieldValue("immobilizerFile", list.immobilizerFile);
    formik.setFieldValue("piece", list.piece);
  }, [list]);

  return (
    <FormLayout
      leftButtonPress={() => setStep(step - 1)}
      rightButtonPress={() => formik.handleSubmit()}
      isActive={isActive}
    >
      <KeyboardAwareScrollView
        enableOnAndroid={true}
        contentContainerStyle={styles.scrollView}
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="on-drag"
        ref={ref}
      >
        <View>
          <Input
            label="Mekanik Şifre Kodu"
            placeholder="Mekanik şifre kodunu giriniz"
            value={formik.values.mechanicalPasswordCode || ""}
            onChangeText={formik.handleChange("mechanicalPasswordCode")}
            error={formik.errors.mechanicalPasswordCode || ""}
            touched={formik.touched.mechanicalPasswordCode || false}
            keyboardType="default"
            onBlur={() => formik.setFieldTouched("mechanicalPasswordCode")}
          />
          <Input
            label="PIN Kodu"
            placeholder="PIN kodunu giriniz"
            value={formik.values.pinCode || ""}
            onChangeText={formik.handleChange("pinCode")}
            error={formik.errors.pinCode || ""}
            touched={formik.touched.pinCode || false}
            keyboardType="default"
            onBlur={() => formik.setFieldTouched("pinCode")}
          />
          <Input
            label="CS Kodu"
            placeholder="CS kodunu giriniz"
            value={formik.values.csCode || ""}
            onChangeText={formik.handleChange("csCode")}
            error={formik.errors.csCode || ""}
            touched={formik.touched.csCode || false}
            keyboardType="default"
            onBlur={() => formik.setFieldTouched("csCode")}
          />
          <FileInput
            label="İmmobilizer Dosyası"
            placeholder="İmmobilizer dosyasını seçiniz"
            value={formik.values.immobilizerFile || ""}
            onChangeText={formik.handleChange("immobilizerFile")}
            error={formik.errors.immobilizerFile || ""}
            touched={formik.touched.immobilizerFile || false}
            fileType={[
              "application/pdf",
              "application/msword",
              "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
            ]}
          />
          <Input
            label="Kaç Anahtar Yapıldı"
            placeholder="Kaç anahtar yaptığını giriniz"
            value={formik.values.piece?.toString() || ""}
            onChangeText={formik.handleChange("piece")}
            error={formik.errors.piece || ""}
            touched={formik.touched.piece || false}
            keyboardType="numeric"
            onBlur={() => formik.setFieldTouched("piece")}
          />
        </View>
      </KeyboardAwareScrollView>
    </FormLayout>
  );
};

export default RequiredInformation;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: height - 220,
  },
  scrollView: {
    paddingBottom: 16,
  },
});
