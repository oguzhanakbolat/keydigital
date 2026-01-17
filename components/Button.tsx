import Icon from "@/constants/icons/Icon";
import { Colors, Fonts } from "@/constants/theme";
import React, { FC } from "react";
import {
  ActivityIndicator,
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
  secondary?: boolean;
  leftIcon?: string;
  rightIcon?: string;
  leftRadius?: boolean;
  rightRadius?: boolean;
  isLoading?: boolean;
  fullRadius?: boolean;
};

const Button: FC<ButtonProps> = ({
  title,
  onPress,
  style,
  half = false,
  outline = false,
  secondary = false,
  leftIcon = "",
  rightIcon = "",
  leftRadius = false,
  rightRadius = false,
  isLoading = false,
  fullRadius = false,
}) => {
  const buttonStyle = [
    styles.button,
    style,
    half ? styles.half : null,
    outline ? styles.outline : null,
    leftRadius ? styles.leftRadius : null,
    rightRadius ? styles.rightRadius : null,
    secondary ? styles.secondary : null,
    fullRadius ? styles.fullRadius : null,
  ];

  const titleStyle = [
    styles.title,
    outline ? styles.outlineTitle : null,
    secondary ? styles.secondaryTitle : null,
  ];
  return (
    <TouchableOpacity
      style={buttonStyle}
      onPress={onPress}
      disabled={isLoading}
    >
      {isLoading && <ActivityIndicator size="small" color={Colors.white} />}
      {rightIcon && <Icon name={rightIcon} size={18} color={Colors.text} />}
      <Text style={titleStyle}>{title}</Text>
      {leftIcon && <Icon name={leftIcon} size={18} color={Colors.white} />}
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    gap: 6,
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
  secondary: {
    backgroundColor: Colors.secondary,
  },
  outlineTitle: {
    ...Fonts.S14W500,
    color: Colors.text,
  },
  leftRadius: {
    borderTopLeftRadius: 35,
    borderBottomLeftRadius: 35,
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
  },
  rightRadius: {
    borderTopRightRadius: 35,
    borderBottomRightRadius: 35,
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
  },
  secondaryTitle: {
    color: Colors.text,
  },
  fullRadius: {
    borderRadius: 50,
  },
});
