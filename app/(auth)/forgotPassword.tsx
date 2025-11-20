import Background2 from "@/components/bg2";
import Logo from "@/components/logo";
import { Colors, Fonts } from "@/constants/theme";
import { useStore } from "@/store";
import axios from "axios";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useFormik } from "formik";
import React, { useState } from "react";
import {
	Dimensions,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
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

const ForgotPasswordScreen = () => {
	const insets = useSafeAreaInsets();
	const router = useRouter();
	const [error, setError] = useState<string>("");
	const { login } = useStore();

	const onLogin = async (values: formType) => {
		try {
			setError("");
			const response = await axios.post(
				"https://hunter.akbolat.net/api/auth/local",
				{
					identifier: values.email,
					password: values.password,
				}
			);

			if (response.status === 200) {
				login(response.data.jwt, response.data.user);
				router.push("/(tabs)");
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
			onLogin(values);
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

				<Logo size={width * 0.6} fill="white" />

				<View style={styles.form}>
					<View style={styles.title}>
						<Text style={styles.titleText}>Şifremi Unuttum</Text>
					</View>

					<View style={styles.label}>
						<Text style={styles.labelText}>Email</Text>
						<TextInput
							placeholder="Email adresinizi giriniz..."
							placeholderTextColor={Colors.text + "80"}
							style={styles.input}
							value={values.email}
							onChangeText={handleChange("email")}
							onBlur={handleBlur("email")}
							keyboardType="email-address"
						/>
						{errors.email && touched.email && (
							<Text style={styles.labelError}>
								* {errors.email}
							</Text>
						)}
					</View>

					{error && (
						<View style={styles.errorContainer}>
							<Text style={styles.errorText}>{error}</Text>
						</View>
					)}
					<View style={styles.buttonContainer}>
						<TouchableOpacity
							onPress={() => router.back()}
							style={styles.button}
						>
							<Text style={styles.buttonText}>Geri</Text>
						</TouchableOpacity>
						<TouchableOpacity
							onPress={() => handleSubmit()}
							disabled={isSubmitting}
							style={styles.button2}
						>
							<Text style={styles.button2Text}>Şifre Al</Text>
						</TouchableOpacity>
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
		gap: 10,
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
