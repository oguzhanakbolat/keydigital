import Button from "@/components/Button";
import Header from "@/components/Header";
import Input from "@/components/input";
import PhoneInput from "@/components/PhoneInput";
import { Colors, Fonts } from "@/constants/theme";
import { get, put } from "@/services";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import { Toast } from "toastify-react-native";
import * as Yup from "yup";

const { height } = Dimensions.get("window");

const validationShema = Yup.object().shape({
  name: Yup.string().required("Adı boş bırakılamaz"),
  phone: Yup.string()
    .required("Telefon boş bırakılamaz")
    .min(14, "Telefon numarası en az 11 karakter olmalıdır"),
  email: Yup.string()
    .email("Geçerli bir email adresi giriniz")
    .required("Email boş bırakılamaz"),
});

type formType = {
  name: string;
  phone: string;
  email: string;
};

const initialValues: formType = {
  name: "",
  phone: "",
  email: "",
};

const EditPersonnel = () => {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const editPersonnel = async (values: formType) => {
    try {
      setLoading(true);
      const data = {
        name: values.name,
        phone: values.phone,
        email: values.email,
      };

      const response = await put("users/" + id, data);

      if (response.success) {
        Toast.success("Personel başarıyla düzenlendi.");
        router.push("/(tabs)/personnel");
      } else {
        Toast.error("Bir hata oluştu. Lütfen tekrar deneyin.");
      }
    } catch {
      Toast.error("Bir hata oluştu. Lütfen tekrar deneyin.");
    } finally {
      setLoading(false);
    }
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationShema,
    onSubmit: (values) => {
      editPersonnel(values);
    },
  });

  useEffect(() => {
    getPersonnel();
  }, [id]);

  const getPersonnel = async () => {
    const response = await get(`users/${id}`);
    if (response.success) {
      formik.setValues({
        name: response.data.name,
        phone: response.data.phone,
        email: response.data.email,
      });
    }
  };

  return (
    <View style={styles.container}>
      <Header name="Personel Düzenle" back />
      <View style={styles.content}>
        <Input
          label="Personel Ad Soyad"
          placeholder="Personel adı soyadı giriniz"
          value={formik.values.name}
          onChangeText={formik.handleChange("name")}
          error={
            formik.errors.name && formik.touched.name ? formik.errors.name : ""
          }
          touched={formik.touched.name || false}
          keyboardType="default"
          onBlur={() => formik.setFieldTouched("name")}
        />

        <PhoneInput
          label="Personel Telefon"
          placeholder="Personel telefon numarası giriniz"
          value={formik.values.phone}
          onChangeText={formik.handleChange("phone")}
          error={
            formik.errors.phone && formik.touched.phone
              ? formik.errors.phone
              : ""
          }
          touched={formik.touched.phone || false}
          onBlur={() => formik.setFieldTouched("phone")}
        />

        <Input
          label="Personel Email"
          placeholder="Personel email adresi giriniz"
          value={formik.values.email}
          onChangeText={formik.handleChange("email")}
          error={
            formik.errors.email && formik.touched.email
              ? formik.errors.email
              : ""
          }
          touched={formik.touched.email || false}
          keyboardType="email-address"
          onBlur={() => formik.setFieldTouched("email")}
        />


        <Button
          title="Personel Düzenle"
          onPress={() => formik.handleSubmit()}
          isLoading={loading}
        />
      </View>
    </View>
  );
};

export default EditPersonnel;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  content: {
    paddingHorizontal: 16,
    paddingBottom: 8,
    marginBottom: 8,
    gap: 8,
  },
  list: {
    flex: 1,
    minHeight: height - 230,
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    backgroundColor: Colors.white,
    padding: 16,
    borderRadius: 8,
    marginVertical: 4,
  },
  iconContainer: {
    width: 42,
    height: 42,
    borderRadius: 21,
    borderWidth: 2,
    borderColor: Colors.danger + "50",
    justifyContent: "center",
    alignItems: "center",
    padding: 2,
    position: "relative",
  },
  icon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Colors.danger + "20",
    justifyContent: "center",
    alignItems: "center",
  },
  itemContent: {
    flex: 1,
  },
  itemName: {
    ...Fonts.S14W500,
    color: Colors.text,
  },
  itemPhone: {
    ...Fonts.S12W400,
    color: Colors.text + "99",
    marginTop: 2,
  },
  itemRight: {
    width: 30,
    backgroundColor: Colors.background,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 15,
    textAlign: "right",
  },
});
