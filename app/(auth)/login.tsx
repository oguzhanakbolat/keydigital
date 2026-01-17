import Background2 from "@/components/bg2";
import Button from "@/components/Button";
import Input from "@/components/input";
import Logo from "@/components/Logo";
import { Colors, Fonts } from "@/constants/theme";
import { axiosApi, get, post } from "@/services";
import { useUserStore } from "@/store";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useFormik } from "formik";
import React, { useState } from "react";
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Toast } from "toastify-react-native";
import * as Yup from "yup";
const { width, height } = Dimensions.get("window");

type formType = {
  email: string;
  password: string;
};

const initialValues: formType = {
  email: "",
  password: "",
};

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Lütfen geçerli bir email adresi giriniz")
    .required("Email alanı boş bırakılamaz"),
  password: Yup.string()
    .min(6, "Şifre en az 6 karakter olmalıdır")
    .max(16, "Şifre en fazla 16 karakter olmalıdır")
    .required("Şifre alanı boş bırakılamaz"),
});

const LoginScreen = () => {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const { login } = useUserStore();

  const onLogin = async (values: formType) => {
    try {
      setError("");
      setLoading(true);
      axiosApi.defaults.headers.common[
        "Authorization"
      ] = "";
      const response: any = await post("auth/local", {
        identifier: values.email,
        password: values.password,
      });

      if (response.success) {
        axiosApi.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${response.data.jwt}`;
        const user: any = await get("/users/me?populate=*");

        if (user.success) {
          login(response.data.jwt, user.data);
          router.push("/(tabs)");
        } else {
          Toast.error("Bir hata oluştu. Lütfen tekrar deneyin.");
        }
      } else {
        Toast.error("Kullanıcı adı veya şifre hatalı");
      }
    } catch (err: any) {
      if (err.response?.status === 400) {
        Toast.error("Email veya şifre hatalı");
      } else {
        Toast.error("Bir hata oluştu. Lütfen tekrar deneyin.");
      }
    } finally {
      setSubmitting(false);
      setLoading(false);
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
      onLogin(values);
    },
  });

  return (
    <>
      <StatusBar style="light" />
      <KeyboardAwareScrollView
        contentContainerStyle={styles.keyboardAwareScrollView}
        keyboardShouldPersistTaps="handled"
      >
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
              <Text style={styles.titleText}>Giriş Yap</Text>
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

              <Input
                label="Şifre"
                placeholder="Şifrenizi giriniz"
                value={values.password}
                onChangeText={handleChange("password")}
                error={errors.password && touched.password ? errors.password : ""}
                touched={touched.password || false}
                keyboardType="default"
                labelColor={Colors.white}
                secureTextEntry
                leftIcon="lock-closed-outline"
                fullRadius
              />
              
          

            <View style={styles.buttonContainer}>
              <Button outline title="Geri" onPress={() => router.back()} half leftRadius  />
              <Button title="Giriş Yap" onPress={() => handleSubmit()} isLoading={isSubmitting || loading} half rightRadius />
            </View>

            <TouchableOpacity
              onPress={() => router.push("/(auth)/forgotPassword")}
              style={styles.button3}
            >
              <Text style={styles.button2Text}>Şifremi Unuttum</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  keyboardAwareScrollView: {
    flex: 1,
  },
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
    width: width - 32,
    height: 52,
    backgroundColor: Colors.white,
    paddingHorizontal: 16,
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
    flexDirection: "row",
    gap: 5,
  },
  button2Text: {
    ...Fonts.S16W500,
    color: Colors.white,
    textAlign: "center",
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
