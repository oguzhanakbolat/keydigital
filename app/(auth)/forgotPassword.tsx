import Background2 from "@/components/bg2";
import Button from "@/components/Button";
import Input from "@/components/input";
import Logo from "@/components/Logo";
import { Colors, Fonts } from "@/constants/theme";
import { post } from "@/services";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useFormik } from "formik";
import React, { useState } from "react";
import {
  Dimensions,
  StyleSheet,
  Text,
  View
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Toast } from "toastify-react-native";
import * as Yup from "yup";
const { width, height } = Dimensions.get("window");

type formType = {
  email: string;
};

const initialValues: formType = {
  email: "",
};

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Lütfen geçerli bir email adresi giriniz")
    .required("Email alanı boş bırakılamaz"),
});

const ForgotPasswordScreen = () => {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const [error, setError] = useState<string>("");

  const onForgotPassword = async (values: formType) => {
    try {
      setError("");
      const response = await post(
        "/company/get-password",
        {
          email: values.email
        }
      );

      if (response.success) {
        Toast.success("Şifre başarıyla gönderildi.");
        // router.push("/(auth)/login");
      } else {
        Toast.error("Şifre sıfırlarken bir hata oluştu. Lütfen tekrar deneyin.");
      }
    } catch (err: any) {
      if (err.response?.status === 400) {
        setError("Email veya şifre hatalı");
      } else {
        setError("Bir hata oluştu. Lütfen tekrar deneyin.");
      }
    } finally {
      setSubmitting(false);
    }
  };

  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    isSubmitting,
    setSubmitting,
  } = useFormik({
    initialValues,
    validationSchema,
    onSubmit: () => {
      onForgotPassword(values);
    },
  });

  return (
    <>
      <StatusBar style="light" />
      <View
        style={[
          styles.container,
          {
            paddingTop: insets.top + 32,
            paddingBottom: insets.bottom,
          },
        ]}
      >
        <Background2 size={width} fill={Colors.primary} />

        <Logo size={width * 0.4} fill="white"  />

        <View style={styles.form}>
          <View style={styles.title}>
            <Text style={styles.titleText}>Şifremi Unuttum</Text>
          </View>

          <Input
            label="Email"
            placeholder="Email adresinizi giriniz"
            value={values.email}
            onChangeText={handleChange("email")}
            error={errors.email && touched.email ? errors.email : ""}
            touched={touched.email || false}
            keyboardType="email-address"
            labelColor={Colors.white}
            leftIcon="mail-outline"
            fullRadius
          />

        
          <View style={styles.buttonContainer}>
            <Button outline title="Geri" onPress={() => router.back()} half leftRadius  />
            <Button title="Şifremi Sıfırla" onPress={() => handleSubmit()} isLoading={isSubmitting} half rightRadius />
          </View>
        </View>
      </View>
    </>
  );
};

export default ForgotPasswordScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width,
    height,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 16,
    backgroundColor: Colors.primary + "aa",
  },
  title: {
    alignItems: "flex-start",
    justifyContent: "flex-start",
    width: width - 32,
    marginTop: 64,
    marginBottom: 32,
  },
  titleText: {
    ...Fonts.S18W500,
    lineHeight: 24,
    color: Colors.white,
  },
  errorContainer: {
    width: width - 32,
    backgroundColor: "#ff000020",
    borderRadius: 5,
    padding: 12,
    borderWidth: 1,
    borderColor: "#ff0000",
  },
  errorText: {
    ...Fonts.S14W400,
    color: "#ff0000",
    textAlign: "center",
  },
  input: {
    ...Fonts.S16W400,
    color: Colors.text,
    borderRadius: 5,
    padding: 10,
    width: width - 32,
    height: 46,
    backgroundColor: Colors.white,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginTop: 5,
  },
  label: {
    width: width - 32,
    marginBottom: 16,
  },
  labelText: {
    ...Fonts.S14W600,
    color: Colors.white,
    marginBottom: 2,
  },
  labelError: {
    ...Fonts.S12W400,
    color: Colors.danger,
    marginTop: 6,
  },
  button: {
    borderWidth: 0.5,
    borderColor: Colors.white,
    borderRadius: 5,
    paddingVertical: 10,
    width: width / 2 - 32,
    height: 46,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    ...Fonts.S16W500,
    color: Colors.white,
  },
  button2: {
    backgroundColor: Colors.primary,
    width: width / 2 - 32,
    height: 46,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  button2Text: {
    ...Fonts.S16W500,
    color: Colors.white,
  },
  button3: {
    width: width / 2 - 32,
    height: 46,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonContainer: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    marginVertical: 30,
    paddingHorizontal: 16,
  },
  form: {
    alignItems: "center",
    justifyContent: "center",
    gap: 5,
    flexDirection: "column",
    width: width - 32,
  },
});
