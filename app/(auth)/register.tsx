import Background2 from "@/components/bg2";
import Button from "@/components/Button";
import Input from "@/components/input";
import Logo from "@/components/Logo";
import PhoneInput from "@/components/PhoneInput";
import SelectBox from "@/components/SelectBox";
import { cityList, districtList } from "@/constants/data/city";
import { Colors, Fonts } from "@/constants/theme";
import { axiosApi, post } from "@/services";
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
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Toast } from "toastify-react-native";
import * as Yup from "yup";
const { width, height } = Dimensions.get("window");

type formType = {
  email: string;
  password: string;
  confirmPassword: string;
  name: string;
  surname: string;
  phone: string;
  city: string;
  district: string;
  address: string;
  taxNumber: string;
  taxOffice: string;
  companyName: string;
};

const initialValues: formType = {
  email: "",
  password: "",
  confirmPassword: "",
  name: "",
  surname: "",
  phone: "",
  city: "",
  district: "",
  address: "",
  taxNumber: "",
  taxOffice: "",
  companyName: "",
};

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Lütfen geçerli bir email adresi giriniz")
    .required("Email alanı boş bırakılamaz"),
  password: Yup.string()
    .min(6, "Şifre en az 6 karakter olmalıdır")
    .max(16, "Şifre en fazla 16 karakter olmalıdır")
    .required("Şifre alanı boş bırakılamaz"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Şifreler eşleşmiyor")
    .required("Şifre tekrarı boş bırakılamaz"),
  name: Yup.string()
    .required("Ad alanı boş bırakılamaz"),
  surname: Yup.string()
    .required("Soyad alanı boş bırakılamaz"),
  phone: Yup.string()
    .required("Telefon alanı boş bırakılamaz"),
  city: Yup.string()
    .required("İl alanı boş bırakılamaz"),
  district: Yup.string()
    .required("İlçe alanı boş bırakılamaz"),
  address: Yup.string()
    .required("Adres alanı boş bırakılamaz"),
  taxNumber: Yup.string()
    .required("Vergi numarası alanı boş bırakılamaz"),
  taxOffice: Yup.string()
    .required("Vergi dairesi alanı boş bırakılamaz"),
  companyName: Yup.string()
    .required("Şirket adı alanı boş bırakılamaz"),
});

const RegisterScreen = () => {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);

  const onRegister = async (values: formType) => {
    try {
      setLoading(true);
      axiosApi.defaults.headers.common[
        "Authorization"
      ] = "";


	  const data = {
		name: values.companyName,
		taxNumber: values.taxNumber,
		taxOffice: values.taxOffice,
		address: values.address,
		city: values.city,
		district: values.district,
	  };

	  const response: any = await post("companies", {data});

	  if (response.success) {
		Toast.success("Şirket başarıyla oluşturuldu.");

		const companyId = response.data.data.id - 1;

		const userData = {
			name: values.name + " " + values.surname,
			username: values.email,
			phone: values.phone,
			email: values.email,
			password: values.password,
			confirmed: true,
			company: companyId,
			role: 1,
		};

		const userResponse: any = await post("users", userData);

		if (userResponse.success) {
			Toast.success("Kullanıcı başarıyla oluşturuldu.");
			router.push("/(auth)/login");
		} else {
			Toast.error("Kullanıcı oluşturulurken bir hata oluştu.");
		}

	  } else {
		Toast.error("Şirket oluşturulurken bir hata oluştu.");
	  }

    } catch (err: any) {
      if (err.response?.status === 400) {
        Toast.error("Bir hata oluştu. Lütfen tekrar deneyin.");
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
      onRegister(values);
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
		  <KeyboardAwareScrollView
				style={styles.keyboardAwareScrollView}
				contentContainerStyle={styles.keyboardAwareScrollViewContent}
				keyboardShouldPersistTaps="handled"
				enableOnAndroid={true}
				extraScrollHeight={20}
			>
			<Logo size={width * 0.3} fill="white" />

			<View style={styles.form}>
				<View style={styles.title}>
				<Text style={styles.titleText}>Kayıt Ol</Text>
				</View>

				<Input
					label="Kullanıcı Adı"
					placeholder="Adınızı giriniz"
					value={values.name}
					onChangeText={handleChange("name")}
					error={errors.name && touched.name ? errors.name : ""}
					touched={touched.name || false}
					keyboardType="default"
					fullRadius
					labelColor={Colors.white}
				/>

				<Input
					label="Soyadı"
					placeholder="Soyadınızı giriniz"
					value={values.surname}
					onChangeText={handleChange("surname")}
					error={errors.surname && touched.surname ? errors.surname : ""}
					touched={touched.surname || false}
					keyboardType="default"
					fullRadius
					labelColor={Colors.white}
				/>

				<Input
					label="Email"
					placeholder="Email adresinizi giriniz"
					value={values.email}
					onChangeText={handleChange("email")}
					error={errors.email && touched.email ? errors.email : ""}
					touched={touched.email || false}
					keyboardType="email-address"
					fullRadius
					labelColor={Colors.white}
				/>

				<Input
					label="Şifre"
					placeholder="Şifrenizi giriniz"
					value={values.password}
					onChangeText={handleChange("password")}
					error={errors.password && touched.password ? errors.password : ""}
					touched={touched.password || false}
					keyboardType="default"
					secureTextEntry={true}
					fullRadius
					labelColor={Colors.white}
				/>

				<Input
					label="Şifre Tekrar"
					placeholder="Şifrenizi tekrar giriniz"
					value={values.confirmPassword}
					onChangeText={handleChange("confirmPassword")}
					error={errors.confirmPassword && touched.confirmPassword ? errors.confirmPassword : ""}
					touched={touched.confirmPassword || false}
					keyboardType="default"
					secureTextEntry={true}
					fullRadius
					labelColor={Colors.white}
				/>

				<PhoneInput
					label="Telefon"
					placeholder="Telefon numaranızı giriniz"
					value={values.phone}
					onChangeText={handleChange("phone")}
					error={errors.phone && touched.phone ? errors.phone : ""}
					touched={touched.phone || false}
					onBlur={() => handleBlur("phone")}
					fullRadius
					labelColor={Colors.white}
				/>

				<Input
					label="Şirket Adı"
					placeholder="Şirket adınızı giriniz"
					value={values.companyName}
					onChangeText={handleChange("companyName")}
					error={errors.companyName && touched.companyName ? errors.companyName : ""}
					touched={touched.companyName || false}
					keyboardType="default"
					fullRadius
					labelColor={Colors.white}
				/>

				<Input
					label="Vergi Numarası"
					placeholder="Vergi numarasınızı giriniz"
					value={values.taxNumber}
					onChangeText={handleChange("taxNumber")}
					error={errors.taxNumber && touched.taxNumber ? errors.taxNumber : ""}
					touched={touched.taxNumber || false}
					keyboardType="numeric"
					fullRadius
					labelColor={Colors.white}
				/>

				<Input
					label="Vergi Dairesi"
					placeholder="Vergi dairesinizi giriniz"
					value={values.taxOffice}
					onChangeText={handleChange("taxOffice")}
					error={errors.taxOffice && touched.taxOffice ? errors.taxOffice : ""}
					touched={touched.taxOffice || false}
					keyboardType="default"
					fullRadius
					labelColor={Colors.white}
				/>

			
				<SelectBox
					label="İl"
					placeholder="İlinizi giriniz"
					value={values.city}
					onChangeText={handleChange("city")}
					error={errors.city && touched.city ? errors.city : ""}
					touched={touched.city || false}
					options={cityList}
					fullRadius
					labelColor={Colors.white}
				/>

				<SelectBox
					label="İlçe"
					placeholder="İlçenizi giriniz"
					value={values.district}
					onChangeText={handleChange("district")}
					error={errors.district && touched.district ? errors.district : ""}
					touched={touched.district || false}
					options={values.city ? districtList[values.city] : null}
					fullRadius
					labelColor={Colors.white}
				/>

				<Input
					label="Adres"
					placeholder="Adresinizi giriniz"
					value={values.address}
					onChangeText={handleChange("address")}
					error={errors.address && touched.address ? errors.address : ""}
					touched={touched.address || false}
					keyboardType="default"
					fullRadius
					labelColor={Colors.white}
				/>

<View style={styles.buttonContainer}>
				<Button outline title="Geri" onPress={() => router.back()} half leftRadius fullRadius />	
				<Button title="Kayıt Ol" onPress={handleSubmit} isLoading={isSubmitting || loading} half rightRadius fullRadius />
				</View>
			</View>
			</KeyboardAwareScrollView>
        </View>
    </>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  keyboardAwareScrollView: {
    flex: 1,
    width: "100%",
  },
  keyboardAwareScrollViewContent: {
    flexGrow: 1,
    alignItems: "center",
    paddingBottom: 40,
    paddingHorizontal: 16,
  },
  container: {
    flex: 1,
    width,
    height,
    justifyContent: "center",
    alignItems: "center",
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
