import { Colors, Fonts } from "@/constants/theme";
import React, { FC } from "react";
import {
	Dimensions,
	StyleProp,
	StyleSheet,
	Text,
	TouchableOpacity,
	ViewStyle,
} from "react-native";

const { width } = Dimensions.get("window");

type ButtonProps = {
	title: string;
	onPress: () => void;
	style?: StyleProp<ViewStyle>;
	half?: boolean;
	outline?: boolean;
};

const Button: FC<ButtonProps> = ({
	title,
	onPress,
	half = false,
	outline = false,
}) => {
	const buttonStyle = [
		styles.button,
		half ? styles.half : null,
		outline ? styles.outline : null,
	];
	const titleStyle = [styles.title, outline ? styles.outlineTitle : null];
	return (
		<TouchableOpacity style={buttonStyle} onPress={onPress}>
			<Text style={titleStyle}>{title}</Text>
		</TouchableOpacity>
	);
};

export default Button;

const styles = StyleSheet.create({
	button: {
		alignItems: "center",
		justifyContent: "center",
		borderRadius: 5,
		padding: 8,
		width: width - 32,
		height: 42,
		borderWidth: 1,
		borderColor: Colors.text + "20",
		backgroundColor: Colors.primary,
		paddingHorizontal: 10,
		paddingVertical: 5,
	},
	title: {
		...Fonts.S14W500,
		color: Colors.white,
	},
	half: {
		width: width / 2 - 32,
	},
	outline: {
		borderColor: Colors.text + "20",
		backgroundColor: Colors.white,
	},
	outlineTitle: {
		...Fonts.S14W500,
		color: Colors.text,
	},
});
