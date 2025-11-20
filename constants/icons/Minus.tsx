import { IconsType } from "@/types/iconType";
import React from "react";
import Svg, { Path } from "react-native-svg";

const MinusIcon = ({ size = 20, color = "#171717" }: IconsType) => (
  <Svg width={size} height={size} viewBox="0 0 20 20" fill="none">
    <Path
      d="M4 10C4 9.58579 4.33579 9.25 4.75 9.25L15.25 9.25C15.6642 9.25 16 9.58579 16 10C16 10.4142 15.6642 10.75 15.25 10.75L4.75 10.75C4.33579 10.75 4 10.4142 4 10Z"
      fill={color}
      fillRule="evenodd"
      clipRule="evenodd"
    />
  </Svg>
);
export default MinusIcon;
