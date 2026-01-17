import CustomToast from "@/components/CustomToast";
import { usePoppins } from "@/constants/theme";
import { useUserStore } from "@/store";
import { Stack } from "expo-router";
import { useEffect } from "react";
import "react-native-reanimated";
import ToastManager from "toastify-react-native";

const toastConfig = {
  error: (props: { text1?: string; text2?: string; hide?: () => void }) => (
    <CustomToast {...props} type="error" />
  ),
  success: (props: { text1?: string; text2?: string; hide?: () => void }) => (
    <CustomToast {...props} type="success" />
  ),
  info: (props: { text1?: string; text2?: string; hide?: () => void }) => (
    <CustomToast {...props} type="info" />
  ),
  warn: (props: { text1?: string; text2?: string; hide?: () => void }) => (
    <CustomToast {...props} type="warn" />
  ),
};

export default function RootLayout() {
  const [fontsLoaded] = usePoppins();
  const { loginControl } = useUserStore();

  useEffect(() => {
    loginControl();
  }, []);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      ></Stack>
      <ToastManager config={toastConfig} />
    </>
  );
}
