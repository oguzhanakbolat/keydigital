import React, { FC, useRef } from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import FormLayout from "./FormLayout";
import Input from "./input";

const { height } = Dimensions.get("window");

type PaymentInformationProps = {
  setStep: (step: number) => void;
  setPayment: (payment: number) => void;
  payment: number | null;
  step: number;
  isActive: boolean;
};

const PaymentInformation: FC<PaymentInformationProps> = ({
  setStep,
  setPayment,
  payment,
  step,
  isActive,
}) => {
  const ref = useRef<KeyboardAwareScrollView>(null);

  return (
    <FormLayout
      leftButtonPress={() => setStep(step - 1)}
      rightButtonPress={() => setStep(step + 1)}
      isActive={isActive}
    >
      <KeyboardAwareScrollView
        enableOnAndroid={true}
        contentContainerStyle={styles.scrollView}
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="on-drag"
        ref={ref}
      >
        <View>
          <Input
            label="Ödeme Tutarı"
            placeholder="Ödeme tutarını giriniz"
            value={payment?.toString() || ""}
            onChangeText={(e) => setPayment(Number(e))}
            keyboardType="numeric"
            error=""
            touched={false}
            required
          />
        </View>
      </KeyboardAwareScrollView>
    </FormLayout>
  );
};

export default PaymentInformation;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: height - 220,
  },
  scrollView: {
    paddingBottom: 16,
  },
});
