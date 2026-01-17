import { useRouter } from "expo-router";
import React, { FC } from "react";
import FormLayout from "./FormLayout";
import OcrIdCardBack from "./OcrIdCardBack";
import OcrIdCardFront from "./OcrIdCardFront";

type CardPhoptosProps = {
  setIdCardFrontImage: (image: string) => void;
  setIdCardBackImage: (image: string) => void;
  cardFrontImage: string;
  cardBackImage: string;
  setList: (list: any) => void;
  setStep: (step: number) => void;
  step: number;
  isActive: boolean;
};
const CardPhoptos: FC<CardPhoptosProps> = ({
  setIdCardFrontImage,
  setIdCardBackImage,
  cardFrontImage,
  cardBackImage,
  setList,
  setStep,
  step,
  isActive,
}) => {
  const router = useRouter();

  return (
    <FormLayout
      leftButtonPress={() => router.back()}
      rightButtonPress={() => setStep(step + 1)}
      isActive={isActive}
    >
      <OcrIdCardFront
        setImage={setIdCardFrontImage}
        setList={setList}
        image={cardFrontImage}
      />
      <OcrIdCardBack setImage={setIdCardBackImage} image={cardBackImage} />
    </FormLayout>
  );
};

export default CardPhoptos;
