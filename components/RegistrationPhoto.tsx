import React, { FC } from "react";
import FormLayout from "./FormLayout";
import RegistrationCard from "./RegistrationCard";

type CardPhoptosProps = {
  setImage: (image: string) => void;
  setList: (list: any) => void;
  setStep: (step: number) => void;
  step: number;
  image: string;
  isActive: boolean;
};
const CardPhoptos: FC<CardPhoptosProps> = ({
  setImage,
  setList,
  image,
  setStep,
  step,
  isActive,
}) => {
  return (
    <FormLayout
      leftButtonPress={() => setStep(step - 1)}
      rightButtonPress={() => setStep(step + 1)}
      isActive={isActive}
    >
      <RegistrationCard setImage={setImage} setList={setList} image={image} />
    </FormLayout>
  );
};

export default CardPhoptos;
