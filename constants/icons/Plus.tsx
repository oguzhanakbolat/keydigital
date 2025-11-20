import { IconsType } from "@/types/iconType";
import React from "react";
import Svg, { Path } from "react-native-svg";

const PlusIcon = ({ size = 20, color = "#171717" }: IconsType) => (
  <Svg width={size} height={size} viewBox="0 0 20 20" fill="none">
    <Path
      d="M12 4.5V19.5M19.5 12L4.5 12"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export default PlusIcon;
