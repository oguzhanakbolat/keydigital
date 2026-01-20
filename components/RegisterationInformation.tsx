import { brandList, modelList } from "@/constants/data/brand";
import { cityList, districtList } from "@/constants/data/city";
import { Colors, Fonts } from "@/constants/theme";
import { CardInformationType, RegistrationCardType } from "@/types/addCardType";
import { useFormik } from "formik";
import React, { FC, useEffect, useRef } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import AutoSelectBox from "./AutoSelectBox";
import FormLayout from "./FormLayout";
import Input from "./input";
import PhoneInput from "./PhoneInput";
import SelectBox from "./SelectBox";

const initialValues: RegistrationCardType = {
  plate: null,
  chassisNumber: null,
  brand: null,
  model: null,
  year: null,
  name: null,
  surname: null,
  tckn: null,
  email: null,
  phone: null,
  address: null,
  city: null,
  district: null,
  allData: [],
};

type RegisterationInformationProps = {
  step: number;
  setStep: (step: number) => void;
  setData: (data: RegistrationCardType) => void;
  list: RegistrationCardType;
  cardInformation: CardInformationType;
  isActive: boolean;
};

const RegisterationInformation: FC<RegisterationInformationProps> = ({
  step,
  setStep,
  setData,
  list,
  cardInformation,
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

  const checkCardInformation = () => {
    formik.setFieldValue("tckn", cardInformation.tckn || "");
    formik.setFieldValue("name", cardInformation.name || "");
    formik.setFieldValue("surname", cardInformation.surname || "");
    formik.setFieldValue("email", cardInformation.email || "");
    formik.setFieldValue("phone", cardInformation.phone || "");
    formik.setFieldValue("address", cardInformation.address || "");
    formik.setFieldValue("city", cardInformation.city || "");
    formik.setFieldValue("district", cardInformation.district || "");
  };

  const resetCardInformation = () => {
    formik.setFieldValue("tckn", "");
    formik.setFieldValue("name", "");
    formik.setFieldValue("surname", "");
    formik.setFieldValue("email", "");
    formik.setFieldValue("phone", "");
    formik.setFieldValue("address", "");
    formik.setFieldValue("city", "");
    formik.setFieldValue("district", "");
  };

  useEffect(() => {
    formik.setFieldValue("tckn", list.tckn || "");
    formik.setFieldValue("name", list.name || "");
    formik.setFieldValue("surname", list.surname || "");
    formik.setFieldValue("email", list.email || "");
    formik.setFieldValue("phone", list.phone || "");
    formik.setFieldValue("address", list.address || "");
    formik.setFieldValue("city", list.city || "");
    formik.setFieldValue("district", list.district || "");
    formik.setFieldValue("plate", list.plate || "");
    formik.setFieldValue("chassisNumber", list.chassisNumber || "");
    formik.setFieldValue("brand", list.brand || "");
    formik.setFieldValue("model", list.model || "");
    formik.setFieldValue("year", list.year || "");
    formik.setFieldValue("allData", list.allData || []);
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
        showsVerticalScrollIndicator={false}
        ref={ref}
      >
        <>
          <Input
            label="Plaka"
            placeholder="Plaka giriniz"
            value={formik.values.plate || ""}
            onChangeText={formik.handleChange("plate")}
            error={formik.errors.plate || ""}
            touched={formik.touched.plate || false}
            keyboardType="default"
            textTransform="uppercase"
            onBlur={() => formik.setFieldTouched("plate")}
            required
          />
          <Input
            label="Şasi No"
            placeholder="Şasi No giriniz"
            value={formik.values.chassisNumber || ""}
            onChangeText={formik.handleChange("chassisNumber")}
            error={formik.errors.chassisNumber || ""}
            touched={formik.touched.chassisNumber || false}
            keyboardType="default"
            onBlur={() => formik.setFieldTouched("chassisNumber")}
            textTransform="uppercase"
            required
          />
          <AutoSelectBox
            label="Marka"
            placeholder="Marka seçiniz"
            value={formik.values.brand || ""}
            onChangeText={formik.handleChange("brand")}
            error={formik.errors.brand || ""}
            touched={formik.touched.brand || false}
            options={brandList}
            required
          />
          <SelectBox
            label="Model"
            placeholder="Model seçiniz"
            value={formik.values.model || ""}
            onChangeText={formik.handleChange("model")}
            error={formik.errors.model || ""}
            touched={formik.touched.model || false}
            options={
              formik.values.brand
                ? modelList[formik.values.brand as keyof typeof modelList]
                : null
            }
            required
          />
          <Input
            label="Yıl"
            placeholder="Yıl giriniz"
            value={formik.values.year || ""}
            onChangeText={formik.handleChange("year")}
            error={formik.errors.year || ""}
            touched={formik.touched.year || false}
            keyboardType="numeric"
            onBlur={() => formik.setFieldTouched("year")}
            required
          />
          <View style={styles.registerationInformationButtonContainer}>
            <Text style={styles.registerationInformationButtonText}>
              Kimlik ve Ruhsat Aynı Kişiye mi Ait?{" "}
            </Text>
            <View style={styles.buttonsContainer}>
              <TouchableOpacity
                style={styles.yesButton}
                onPress={resetCardInformation}
              >
                <Text style={styles.text}>Hayır</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.noButton}
                onPress={checkCardInformation}
              >
                <Text style={styles.text}>Evet</Text>
              </TouchableOpacity>
            </View>
          </View>

          <Input
            label="TCKN"
            placeholder="TCKN giriniz"
            maxLength={11}
            value={formik.values.tckn || ""}
            onChangeText={formik.handleChange("tckn")}
            error={formik.errors.tckn || ""}
            touched={formik.touched.tckn || false}
            keyboardType="numeric"
            onBlur={() => formik.setFieldTouched("tckn")}
            required
          />
          <Input
            label="İsim"
            placeholder="İsim giriniz"
            value={formik.values.name || ""}
            onChangeText={formik.handleChange("name")}
            error={formik.errors.name || ""}
            touched={formik.touched.name || false}
            keyboardType="default"
            onBlur={() => formik.setFieldTouched("name")}
            required
          />
          <Input
            label="Soyisim"
            placeholder="Soyisim giriniz"
            value={formik.values.surname || ""}
            onChangeText={formik.handleChange("surname")}
            error={formik.errors.surname || ""}
            touched={formik.touched.surname || false}
            keyboardType="default"
            onBlur={() => formik.setFieldTouched("surname")}
            required
          />
          <Input
            label="Email"
            placeholder="Email giriniz"
            value={formik.values.email || ""}
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
            onBlur={() => formik.setFieldTouched("address")}
            rows={3}
          />
        </>
      </KeyboardAwareScrollView>
    </FormLayout>
  );
};

export default RegisterationInformation;

const styles = StyleSheet.create({
  scrollView: {
    paddingBottom: 16,
  },
  registerationInformationButtonContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  registerationInformationButtonText: {
    ...Fonts.S14W400,
    color: Colors.text,
    marginRight: 10,
  },
  buttonsContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  yesButton: {
    backgroundColor: Colors.warning,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
  },
  noButton: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
  },
  text: {
    color: Colors.white,
    ...Fonts.S14W500,
  },
});
