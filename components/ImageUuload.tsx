import React, { FC } from "react";
import {
	Dimensions,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native";

import { Colors, Fonts } from "@/constants/theme";
const { width } = Dimensions.get("window");

type ImageUploadProps = {
	label: string;
	placeholder: string;
	value: string;
	onChangeText: (text: string) => void;
	onBlur: () => void;
	keyboardType: string;
	errors: {
		[key: string]: string;
	};
	touched: {
		[key: string]: boolean;
	};
};

const ImageUpload: FC<ImageUploadProps> = ({
	label,
	placeholder,
	value,
	onChangeText,
	onBlur,
	keyboardType,
	errors,
	touched,
}) => {
	return (
		<View style={styles.label}>
			<Text style={styles.labelText}>{label}</Text>
			<TouchableOpacity style={styles.button} onPress={() => {}}>
				<Text style={styles.buttonText}>
					{value ? "Resim Değiştir" : "Resim Seç"}
				</Text>
			</TouchableOpacity>
			{errors[label] && touched[label] && (
				<Text style={styles.labelError}>* {errors[label]}</Text>
			)}
		</View>
	);
};

export default ImageUpload;

const styles = StyleSheet.create({
	label: {
		width: width - 32,
		marginBottom: 8,
	},
	labelText: {
		...Fonts.S14W400,
		color: Colors.text,
		marginBottom: 2,
	},
	labelError: {
		...Fonts.S12W400,
		color: Colors.danger,
		marginTop: 6,
	},
	button: {
		borderRadius: 5,
		padding: 8,
		width: width - 32,
		height: 42,
		borderWidth: 1,
		borderColor: Colors.text + "20",
		backgroundColor: Colors.white,
		paddingHorizontal: 10,
		paddingVertical: 10,
		marginTop: 5,
	},
	buttonText: {
		...Fonts.S14W400,
		color: Colors.text + "80",
	},
});
