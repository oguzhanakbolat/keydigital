import Button from "@/components/Button";
import Header from "@/components/Header";
import Input from "@/components/input";
import { Colors } from "@/constants/theme";
import { post } from "@/services";
import { log } from "@/utils/logger";
import { useRouter } from "expo-router";
import { useFormik } from "formik";
import React from "react";
import { Alert, StyleSheet, View } from "react-native";
import * as Yup from "yup";

const ChangePassword = () => {
  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      currentPassword: "",
      newPassword: "",
      passwordConfirmation: "",
    },
    validationSchema: Yup.object().shape({
      currentPassword: Yup.string().required("Şifre alanı boş bırakılamaz"),
      newPassword: Yup.string().required("Şifre alanı boş bırakılamaz"),
      passwordConfirmation: Yup.string().required(
        "Şifre alanı boş bırakılamaz"
      ),
    }),
    onSubmit: (values) => {
      sentData();
    },
  });
  const sentData = async () => {
    try {
      const response: any = await post("auth/change-password", {
        currentPassword: formik.values.currentPassword,
        password: formik.values.newPassword,
        passwordConfirmation: formik.values.passwordConfirmation,
      });

      if (response.success) {
        Alert.alert("Şifre başarıyla değiştirildi");
        router.push("/(tabs)/profile");
      } else {
        const error =
          response.error.error.message === "Passwords do not match"
            ? "Şifreler eşleşmiyor"
            : response.error.error.message ===
              "The provided current password is invalid"
            ? "Mevcut Şifre Hatalı"
            : response.error.error.message ===
              "Your new password must be different than your current password"
            ? "Yeni Şifre Mevcut Şifre ile aynı olamaz"
            : response.error.error.message;
        Alert.alert(error);
      }
    } catch (error) {
      log("error", error);
    }
  };
  return (
    <View style={styles.container}>
      <Header name="Şifre Değiştir" />
      <View style={styles.content}>
        <Input
          label="Mevcut Şifre"
          placeholder="Mevcut Şifre"
          value={formik.values.currentPassword}
          onChangeText={formik.handleChange("currentPassword")}
          onBlur={() => formik.handleBlur("currentPassword")}
          keyboardType="default"
          secureTextEntry
          error={
            formik.errors.currentPassword && formik.touched.currentPassword
              ? formik.errors.currentPassword
              : ""
          }
          touched={formik.touched.currentPassword || false}
        />
        <Input
          label="Yeni Şifre"
          placeholder="Yeni Şifre"
          value={formik.values.newPassword}
          onChangeText={formik.handleChange("newPassword")}
          onBlur={() => formik.handleBlur("newPassword")}
          keyboardType="default"
          error={
            formik.errors.newPassword && formik.touched.newPassword
              ? formik.errors.newPassword
              : ""
          }
          touched={formik.touched.newPassword || false}
          secureTextEntry
        />
        <Input
          label="Yeni Şifre Tekrar"
          placeholder="Yeni Şifre Tekrar"
          value={formik.values.passwordConfirmation}
          onChangeText={formik.handleChange("passwordConfirmation")}
          onBlur={() => formik.handleBlur("passwordConfirmation")}
          keyboardType="default"
          error={
            formik.errors.passwordConfirmation &&
            formik.touched.passwordConfirmation
              ? formik.errors.passwordConfirmation
              : ""
          }
          touched={formik.touched.passwordConfirmation || false}
          secureTextEntry
        />
        <Button title="Şifre Değiştir" onPress={() => formik.handleSubmit()} />
      </View>
    </View>
  );
};

export default ChangePassword;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  content: {
    paddingHorizontal: 16,
    paddingBottom: 8,
    gap: 8,
    flex: 1,
    justifyContent: "center",
    marginBottom: 120,
  },
});
