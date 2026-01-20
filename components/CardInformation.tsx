import { cityList, districtList } from "@/constants/data/city";
import { CardInformationType } from "@/types/addCardType";
import { useFormik } from "formik";
import React, { FC, useEffect, useRef } from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import DateInput from "./DateInput";
import FormLayout from "./FormLayout";
import Input from "./input";
import PhoneInput from "./PhoneInput";
import SelectBox from "./SelectBox";

const { height } = Dimensions.get("window");

const initialValues: CardInformationType = {
  tckn: "",
  name: "",
  surname: "",
  birthdate: "",
  email: "",
  phone: "",
  address: "",
  city: "",
  district: "",
  gender: "",
};

type CardInformationProps = {
  step: number;
  setStep: (step: number) => void;
  setData: (data: CardInformationType) => void;
  list: CardInformationType;
  isActive: boolean;
};

const CardInformation: FC<CardInformationProps> = ({
  step,
  setStep,
  setData,
  list,
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
    formik.setFieldValue("tckn", list.tckn);
    formik.setFieldValue("name", list.name);
    formik.setFieldValue("surname", list.surname);
    formik.setFieldValue("birthdate", list.birthdate);
    formik.setFieldValue("email", list.email);
    formik.setFieldValue("phone", list.phone);
    formik.setFieldValue("address", list.address);
    formik.setFieldValue("city", list.city);
    formik.setFieldValue("district", list.district);
    formik.setFieldValue("gender", list.gender);
  }, [list]);

  useEffect(() => {
    if (step === 2) {
      ref.current?.scrollToPosition(0, 0, true);
    }
  }, [step]);

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
            label="TCKN"
            placeholder="TCKN giriniz"
            value={formik.values.tckn || ""}
            onChangeText={formik.handleChange("tckn")}
            error={formik.errors.tckn || ""}
            touched={formik.touched.tckn || false}
            keyboardType="numeric"
            onBlur={() => formik.setFieldTouched("tckn")}
            maxLength={11}
            required
          />
          <Input
            label="Adı"
            placeholder="Kimlikte kayıtlı adını giriniz"
            value={formik.values.name || ""}
            onChangeText={formik.handleChange("name")}
            error={formik.errors.name || ""}
            touched={formik.touched.name || false}
            keyboardType="default"
            onBlur={() => formik.setFieldTouched("name")}
            required
          />
          <Input
            label="Soyadı"
            placeholder="Kimlikte kayıtlı soyadı giriniz"
            value={formik.values.surname || ""}
            onChangeText={formik.handleChange("surname")}
            error={formik.errors.surname || ""}
            touched={formik.touched.surname || false}
            keyboardType="default"
            onBlur={() => formik.setFieldTouched("surname")}
            required={true}
          />
          <DateInput
            label="Doğum Tarihi"
            placeholder="Kimlikte kayıtlı doğum tarihi giriniz"
            value={formik.values.birthdate || ""}
            onChangeText={formik.handleChange("birthdate")}
            error={formik.errors.birthdate || ""}
            touched={formik.touched.birthdate || false}
            onBlur={() => formik.setFieldTouched("birthdate")}
          />
          <Input
            label="Email"
            placeholder="Email giriniz"
            value={(formik.values.email || "").toLowerCase()}
            onChangeText={formik.handleChange("email")}
            error={formik.errors.email || ""}
            touched={formik.touched.email || false}
            keyboardType="email-address"
            onBlur={() => formik.setFieldTouched("email")}
          />
          <PhoneInput
            label="Telefon"
            placeholder="Telefon giriniz"
            value={formik.values.phone || ""}
            onChangeText={formik.handleChange("phone")}
            error={formik.errors.phone || ""}
            touched={formik.touched.phone || false}
            onBlur={() => formik.setFieldTouched("phone")}
            required
          />
          <SelectBox
            label="İl"
            placeholder="İl seçiniz"
            value={formik.values.city || ""}
            onChangeText={formik.handleChange("city")}
            error={formik.errors.city || ""}
            touched={formik.touched.city || false}
            options={cityList}
            required
          />
          <SelectBox
            label="İlçe"
            placeholder="İlçe seçiniz"
            value={formik.values.district || ""}
            onChangeText={formik.handleChange("district")}
            error={formik.errors.district || ""}
            touched={formik.touched.district || false}
            options={
              formik.values.city ? districtList[formik.values.city] : null
            }
            required
          />
          <Input
            label="Adres"
            placeholder="Adres giriniz"
            value={formik.values.address || ""}
            onChangeText={formik.handleChange("address")}
            error={formik.errors.address || ""}
            touched={formik.touched.address || false}
            keyboardType="default"
            rows={3}
            onBlur={() => formik.setFieldTouched("address")}
          />

          <SelectBox
            label="Cinsiyet"
            placeholder="Cinsiyet seçiniz"
            value={formik.values.gender || ""}
            onChangeText={formik.handleChange("gender")}
            error={formik.errors.gender || ""}
            touched={formik.touched.gender || false}
            options={["Erkek", "Kadın"]}
          />
        </View>
      </KeyboardAwareScrollView>
    </FormLayout>
  );
};

export default CardInformation;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: height - 220,
  },
  scrollView: {
    paddingBottom: 16,
  },
});
