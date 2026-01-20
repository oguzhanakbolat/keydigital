import React, { FC, ReactNode } from "react";
import {
  Dimensions,
  Platform,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import SaveButtons from "./SaveButton";

const { height } = Dimensions.get("window");

type FormLayoutProps = {
  children: ReactNode;
  isActive: boolean;
  leftButtonPress: () => void;
  rightButtonPress: () => void;
  lastItem?: boolean;
};

const FormLayout: FC<FormLayoutProps> = ({
  children,
  leftButtonPress,
  rightButtonPress,
  isActive,
  lastItem = false,
}) => {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={[
        styles.container,
        {
          height: height - insets.bottom - (Platform.OS === "ios" ? 100 : 80),
        },
        {
          display: isActive ? "flex" : "none",
        },
      ]}
    >
      <ScrollView
        style={styles.scrollViewContainer}
        contentContainerStyle={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        {children}
        <View style={styles.scrollBottom} />
      </ScrollView>
      <SaveButtons
        leftButtonPress={leftButtonPress}
        rightButtonPress={rightButtonPress}
        lastItem={lastItem}
      />
    </View>
  );
};

export default FormLayout;

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  scrollViewContainer: {
    flex: 1,
  },
  scrollView: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  scrollBottom: {
    height: 10,
  },
});
