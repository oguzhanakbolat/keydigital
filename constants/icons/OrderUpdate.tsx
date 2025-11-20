import { IconsType } from "@/types/iconType";
import React from "react";
import Svg, { Path } from "react-native-svg";

const OrderUpdateIcon = ({ size = 20, color = "#171717" }: IconsType) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M21 7.5L12 2.25L3 7.5M21 7.5L12 12.75M21 7.5V16.5L12 21.75M3 7.5L12 12.75M3 7.5V16.5L12 21.75M12 12.75V21.75"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export default OrderUpdateIcon;
