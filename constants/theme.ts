import {
  Poppins_100Thin,
  Poppins_200ExtraLight,
  Poppins_300Light,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold,
  Poppins_700Bold,
  Poppins_800ExtraBold,
  Poppins_900Black,
  useFonts,
} from "@expo-google-fonts/poppins";

export const usePoppins = () => {
  const [fontsLoaded] = useFonts({
    Poppins_100Thin,
    Poppins_200ExtraLight,
    Poppins_300Light,
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_700Bold,
    Poppins_800ExtraBold,
    Poppins_900Black,
  });

  return [fontsLoaded];
};

export const Fonts = {
  S10W400: {
    fontFamily: "Poppins_400Regular",
    fontSize: 10,
  },
  S10W500: {
    fontFamily: "Poppins_500Medium",
    fontSize: 10,
  },
  S12W400: {
    fontFamily: "Poppins_400Regular",
    fontSize: 12,
  },
  S12W500: {
    fontFamily: "Poppins_500Medium",
    fontSize: 12,
  },
  S14W400: {
    fontFamily: "Poppins_400Regular",
    fontSize: 14,
  },
  S14W500: {
    fontFamily: "Poppins_500Medium",
    fontSize: 14,
  },
  S14W600: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 14,
  },
  S16W400: {
    fontFamily: "Poppins_400Regular",
    fontSize: 16,
  },
  S16W500: {
    fontFamily: "Poppins_500Medium",
    fontSize: 16,
  },
  S18W500: {
    fontFamily: "Poppins_500Medium",
    fontSize: 18,
  },
  S24W400: {
    fontFamily: "Poppins_400Regular",
    fontSize: 24,
  },
  S21W600: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 21,
  },
  S24W500: {
    fontFamily: "Poppins_500Medium",
    fontSize: 24,
  },
  S24W600: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 24,
  },
  S32W600: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 32,
  },
  S48W600: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 48,
  },
};

export const Colors = {
  white: "#FEFEFE",
  text: "#11181C",
  background: "#eaf1fc",
  primary: "#4193F7",
  secondary: "#B1D1F7",
  danger: "#E23B3B",
  tint: "#0a7ea4",
  icon: "#687076",
  tabIconDefault: "#687076",
  tabIconSelected: "#0a7ea4",
  warning: "#FFC01A",
  success: "#00C853",
};
