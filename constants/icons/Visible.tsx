import { IconsType } from "@/types/iconType";
import React from "react";
import Svg, { Path } from "react-native-svg";

const VisibleIcon = ({ size = 20, color = "#171717" }: IconsType) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M2.03575 12.3224C1.96666 12.1151 1.9666 11.8907 2.03556 11.6834C3.42392 7.50972 7.36098 4.5 12.001 4.5C16.6389 4.5 20.5744 7.50692 21.9645 11.6776C22.0336 11.8849 22.0337 12.1093 21.9647 12.3166C20.5763 16.4903 16.6393 19.5 11.9993 19.5C7.36139 19.5 3.42583 16.4931 2.03575 12.3224Z"
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M15.0002 12C15.0002 13.6569 13.6571 15 12.0002 15C10.3433 15 9.0002 13.6569 9.0002 12C9.0002 10.3431 10.3433 9 12.0002 9C13.6571 9 15.0002 10.3431 15.0002 12Z"
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export default VisibleIcon;
