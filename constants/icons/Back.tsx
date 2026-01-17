import { IconsType } from "@/types/iconType";
import React from "react";
import Svg, { Path } from "react-native-svg";

const BackIcon = ({ size = 20, color = "#171717" }: IconsType) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M16 19.5L8.5 12L16 4.5"
      stroke={color}
      strokeWidth="3"
      strokeLinecap="round"
      transform="translate(-2, 0)"
    />
  </Svg>
);

export default BackIcon;
