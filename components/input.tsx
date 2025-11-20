import { Colors, Fonts } from "@/constants/theme";
import React, { FC } from "react";
import {
	Dimensions,
	KeyboardTypeOptions,
	StyleSheet,
	Text,
	TextInput,
	View,
} from "react-native";

const { width } = Dimensions.get("window");

type InputProps = {
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

const Input: FC<InputProps> = ({
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
			<TextInput
				placeholder={placeholder}
				placeholderTextColor={Colors.text + "80"}
				style={styles.input}
				value={value}
				onChangeText={onChangeText}
				onBlur={onBlur}
				keyboardType={keyboardType as KeyboardTypeOptions}
			/>
			{errors[label] && touched[label] && (
				<Text style={styles.labelError}>* {errors[label]}</Text>
			)}
		</View>
	);
};

export default Input;

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
	input: {
		...Fonts.S14W400,
		color: Colors.text,
		borderRadius: 5,
		padding: 8,
		width: width - 32,
		height: 42,
		borderWidth: 1,
		borderColor: Colors.text + "20",
		backgroundColor: Colors.white,
		paddingHorizontal: 10,
		paddingVertical: 5,
	},
});
