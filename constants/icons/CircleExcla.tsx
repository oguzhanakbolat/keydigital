import { IconsType } from "@/types/iconType";
import React from "react";
import Svg, { Path } from "react-native-svg";

const CircleExclaIcon = ({ size = 20, color = "#171717" }: IconsType) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M12 9V12.75M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12ZM12 15.75H12.0075V15.7575H12V15.75Z"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export default CircleExclaIcon;
