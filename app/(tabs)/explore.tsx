import Button from "@/components/Button";
import OcrIdCardBack from "@/components/OcrIdCardBack";
import OcrIdCardFront from "@/components/OcrIdCardFront";
import { Colors, Fonts } from "@/constants/theme";
import { IdCardType } from "@/utils/IdCard";
import { useFormik } from "formik";
import { useState } from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import * as Yup from "yup";

const { width, height } = Dimensions.get("window");

export default function AddCarScreen() {
	const insets = useSafeAreaInsets();
	const formik = useFormik({
		initialValues: {
			brand: "",
		},
		validationSchema: Yup.object().shape({
			brand: Yup.string().required("Marka is required"),
		}),
		onSubmit: (values) => {
			console.log(values);
		},
	});

	const [image, setIdCardImage] = useState<string | null>(null);
	const [idCardList, setIdCardList] = useState<IdCardType>({
		tckn: null,
		name: null,
		surname: null,
		birthdate: null,
	});

	return (
		<View style={styles.container}>
			<View style={[styles.header, { paddingTop: insets.top + 8 }]}>
				<View style={styles.stepContainer}>
					<View style={styles.circle}>
						<Text style={styles.circleText}>1</Text>
					</View>
					<Text style={styles.stepTitle}>Kimlik Kartı</Text>
				</View>

				<View style={styles.stepContainer}>
					<View style={styles.circlePassive}>
						<Text style={styles.circleTextPassive}>2</Text>
					</View>
					<View style={styles.circlePassive}>
						<Text style={styles.circleTextPassive}>3</Text>
					</View>
					<View style={styles.circlePassive}>
						<Text style={styles.circleTextPassive}>4</Text>
					</View>
					<View style={styles.circlePassive}>
						<Text style={styles.circleTextPassive}>5</Text>
					</View>
				</View>
			</View>

			<View style={styles.content}>
				<View style={styles.formContainer}>
					<View
						style={[
							styles.form,
							{ minHeight: height - insets.top - 120 },
						]}
					>
						<View>
							<OcrIdCardFront
								setImage={setIdCardImage}
								setList={setIdCardList}
							/>
							<OcrIdCardBack setImage={setIdCardImage} />
						</View>

						<View style={styles.buttonContainer}>
							<Button
								title="İptal Et"
								onPress={formik.handleSubmit}
								half
								outline
							/>
							<Button
								title="Devam Et"
								onPress={formik.handleSubmit}
								half
							/>
						</View>
					</View>
				</View>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: Colors.white,
		flex: 1,
	},
	header: {
		paddingHorizontal: 16,
		paddingBottom: 8,
		borderBottomWidth: 1,
		borderBottomColor: Colors.primary,
		gap: 8,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
	},
	stepContainer: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		gap: 8,
	},
	circle: {
		width: 24,
		height: 24,
		backgroundColor: Colors.primary,
		borderRadius: 12,
		alignItems: "center",
		justifyContent: "center",
	},
	circleText: {
		...Fonts.S14W500,
		color: Colors.white,
	},
	circlePassive: {
		width: 24,
		height: 24,
		backgroundColor: Colors.primary + "40",
		borderRadius: 12,
		alignItems: "center",
		justifyContent: "center",
	},
	circleTextPassive: {
		...Fonts.S14W500,
		color: Colors.white,
	},
	stepTitle: {
		...Fonts.S14W500,
		color: Colors.text,
	},
	content: {
		width,
		flex: 1,
	},
	formContainer: {
		flexDirection: "column",
	},
	form: {
		width,
		padding: 16,
		gap: 16,
		backgroundColor: Colors.danger + "10",
		flex: 1,
		justifyContent: "space-between",
	},

	title: {
		...Fonts.S16W500,
		color: Colors.primary,
	},
	dots: {
		flexDirection: "row",
		alignItems: "center",
		gap: 3,
	},
	dot: {
		width: 8,
		height: 8,
		backgroundColor: Colors.primary + "40",
		borderRadius: 5,
	},
	buttonContainer: {
		flexDirection: "row",
		gap: 10,
		alignItems: "center",
		justifyContent: "center",
	},
});
